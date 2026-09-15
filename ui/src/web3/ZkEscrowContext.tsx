import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import type { Logger } from 'pino';
import semver from 'semver';
import type { ConnectedAPI, InitialAPI } from '@midnight-ntwrk/dapp-connector-api';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { deployContract, findDeployedContract, submitCallTx, submitInsertVerifierKeyTx } from '@midnight-ntwrk/midnight-js-contracts';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import {
  encodeUserAddress,
  fromHex,
  type ContractAddress,
} from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import {
  Binding,
  Proof,
  SignatureEnabled,
  Transaction,
  unshieldedToken,
  type FinalizedTransaction,
  type TransactionId,
} from '@midnight-ntwrk/midnight-js-protocol/ledger';
import { createProofProvider, type MidnightProviders, type UnboundTransaction } from '@midnight-ntwrk/midnight-js-types';
import { toHex } from '@midnight-ntwrk/midnight-js-utils';
import { MidnightBech32m, UnshieldedAddress } from '@midnight-ntwrk/wallet-sdk-address-format';
import {
  Contract,
  ledger,
  type Witnesses,
} from '../../../contract/src/managed/zkescrow/contract/index.js';
import { witnesses, type ZkEscrowPrivateState } from '../../../contract/src/witnesses.js';
import {
  NETWORK_ID,
  PRIVATE_STATE_ID,
  bytesToHex,
  commitText,
  decryptPrivatePayload,
  encryptPrivatePayload,
  hexToBytes,
  randomSecret,
  readDeals,
  type DealView,
} from '@zkescrow/api';
import { inMemoryPrivateStateProvider } from '../lib/in-memory-private-state-provider.js';
import { resolveContractTarget } from '../lib/contract-target.js';
import { deferredCircuitIds, ZkEscrowBootstrapContract } from './bootstrap-contract.js';

type ZkContract = Contract<ZkEscrowPrivateState, Witnesses<ZkEscrowPrivateState>>;
type CircuitKey = Exclude<keyof ZkContract['impureCircuits'], number | symbol>;
type Providers = MidnightProviders<CircuitKey, typeof PRIVATE_STATE_ID, ZkEscrowPrivateState>;
export type PrivateMilestoneMetadata = {
  readonly label: string;
  readonly amount: string;
  readonly deliveryDeadline: string;
  readonly reviewDeadline: string;
};

export type PrivateMetadata = { title: string; description: string; milestones: PrivateMilestoneMetadata[] };

export type WalletSummary = {
  readonly unshieldedAddress: string;
  readonly tnightBalance: bigint;
  readonly dustBalance: bigint;
};

export type CreatedInvite = {
  readonly dealId: bigint;
  readonly sellerSecret: string;
  readonly arbitratorSecret: string;
  readonly sellerLink: string;
  readonly arbitratorLink: string;
};

export type TransactionReceipt = {
  readonly label: string;
  readonly txId: string;
  readonly blockHeight: number;
};

export type CreateDealInput = {
  readonly title: string;
  readonly description: string;
  readonly amount: bigint;
  readonly deadline: bigint;
  readonly milestones: readonly {
    readonly label: string;
    readonly amount: bigint;
    readonly deliveryDeadline: bigint;
    readonly reviewDeadline: bigint;
  }[];
};

type ContextValue = {
  readonly wallet: WalletSummary | null;
  readonly contractAddress: ContractAddress | null;
  readonly contractTargetAddress: ContractAddress | null;
  readonly contractConfigurationError: string | null;
  readonly identitySecret: string;
  readonly deals: readonly DealView[];
  readonly metadata: Readonly<Record<string, PrivateMetadata>>;
  readonly busy: string | null;
  readonly error: string | null;
  readonly lastCreatedInvite: CreatedInvite | null;
  readonly lastTransaction: TransactionReceipt | null;
  readonly connectWallet: () => Promise<void>;
  readonly deploy: () => Promise<void>;
  readonly join: (address: string) => Promise<void>;
  readonly refresh: () => Promise<void>;
  readonly importIdentity: (secretHex: string) => Promise<void>;
  readonly createDeal: (input: CreateDealInput) => Promise<CreatedInvite>;
  readonly acceptDeal: (dealId: bigint, inviteSecret: string) => Promise<void>;
  readonly claimArbitrator: (dealId: bigint, inviteSecret: string) => Promise<void>;
  readonly fundDeal: (dealId: bigint, amount: bigint) => Promise<void>;
  readonly submitMilestone: (dealId: bigint, milestoneId: bigint, evidence: string) => Promise<void>;
  readonly approveMilestone: (dealId: bigint, milestoneId: bigint) => Promise<void>;
  readonly autoReleaseMilestone: (dealId: bigint, milestoneId: bigint) => Promise<void>;
  readonly requestRefund: (dealId: bigint) => Promise<void>;
  readonly approveRefund: (dealId: bigint) => Promise<void>;
  readonly claimLateRefund: (dealId: bigint, milestoneId: bigint) => Promise<void>;
  readonly cancelUnfunded: (dealId: bigint) => Promise<void>;
  readonly openDispute: (dealId: bigint, evidence: string) => Promise<void>;
  readonly submitDisputeEvidence: (dealId: bigint, evidence: string) => Promise<void>;
  readonly resolveDispute: (dealId: bigint, sellerAward: bigint, buyerAward: bigint) => Promise<void>;
  readonly proveReputation: (minimum: bigint) => Promise<void>;
  readonly clearError: () => void;
  readonly clearLastTransaction: () => void;
};

const ZkEscrowContext = createContext<ContextValue | undefined>(undefined);

const storageKey = (address: string) => `zkescrow:metadata:${address}`;
const contractStorageKey = 'zkescrow:preprod:contract';
const identityStorageKey = 'zkescrow:session:identity';

const isPrivateMetadata = (value: unknown): value is PrivateMetadata => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<PrivateMetadata>;
  return typeof candidate.title === 'string'
    && typeof candidate.description === 'string'
    && Array.isArray(candidate.milestones)
    && candidate.milestones.every((milestone) => {
      if (!milestone || typeof milestone !== 'object') return false;
      const item = milestone as Partial<PrivateMilestoneMetadata>;
      return typeof item.label === 'string'
        && typeof item.amount === 'string'
        && /^\d+$/.test(item.amount)
        && typeof item.deliveryDeadline === 'string'
        && /^\d+$/.test(item.deliveryDeadline)
        && typeof item.reviewDeadline === 'string'
        && /^\d+$/.test(item.reviewDeadline);
    });
};

const parseMetadataRecord = (value: unknown): Record<string, PrivateMetadata> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([key, item]) => /^\d+$/.test(key) && isPrivateMetadata(item))) as Record<string, PrivateMetadata>;
};

const getInviteParameters = (): URLSearchParams => {
  const raw = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash;
  return new URLSearchParams(raw);
};

const loadOrCreateIdentity = (): Uint8Array => {
  const existing = sessionStorage.getItem(identityStorageKey);
  if (existing) {
    try {
      return hexToBytes(existing);
    } catch {
      sessionStorage.removeItem(identityStorageKey);
    }
  }
  const created = randomSecret();
  sessionStorage.setItem(identityStorageKey, bytesToHex(created));
  return created;
};

const errorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'The Midnight operation failed. Check your wallet and try again.';
};

const encodeWalletPayout = (address: string) => {
  const parsed = MidnightBech32m.parse(address);
  if (parsed.type !== 'addr') throw new Error('The wallet returned an invalid unshielded payout address.');
  const decoded = parsed.decode(UnshieldedAddress, NETWORK_ID);
  return { bytes: encodeUserAddress(decoded.hexString) };
};

const findWallet = (): InitialAPI => {
  const wallets = window.midnight ? Object.values(window.midnight) : [];
  const compatible = wallets.find(
    (wallet) => wallet && typeof wallet === 'object' && semver.satisfies(wallet.apiVersion, '4.x'),
  );
  if (compatible) return compatible;
  throw new Error('A compatible Midnight wallet was not found. Unlock 1AM or Lace, allow this site, then reload.');
};

export const ZkEscrowProvider = ({ logger, children }: PropsWithChildren<{ logger: Logger }>) => {
  const [identity, setIdentity] = useState<Uint8Array>(loadOrCreateIdentity);
  const [wallet, setWallet] = useState<WalletSummary | null>(null);
  const [contractAddress, setContractAddress] = useState<ContractAddress | null>(null);
  const [deals, setDeals] = useState<readonly DealView[]>([]);
  const [metadata, setMetadata] = useState<Record<string, PrivateMetadata>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastCreatedInvite, setLastCreatedInvite] = useState<CreatedInvite | null>(null);
  const [lastTransaction, setLastTransaction] = useState<TransactionReceipt | null>(null);
  const [contractTarget] = useState(() => {
    const inviteAddress = getInviteParameters().get('contract');
    let storedAddress: string | null = null;
    try { storedAddress = localStorage.getItem(contractStorageKey); } catch { /* Storage is an optional fallback. */ }
    return resolveContractTarget(import.meta.env.VITE_ZKESCROW_CONTRACT_ADDRESS, inviteAddress, storedAddress);
  });
  const operatorMode = new URLSearchParams(window.location.search).get('admin') === '1';
  const providersRef = useRef<Providers | null>(null);
  const connectedApiRef = useRef<ConnectedAPI | null>(null);
  const addressRef = useRef<ContractAddress | null>(null);
  const pendingDeploymentRef = useRef<ContractAddress | null>(null);

  const privateStateProvider = useMemo(
    () => inMemoryPrivateStateProvider<typeof PRIVATE_STATE_ID, ZkEscrowPrivateState>(),
    [],
  );

  const browserContract = useMemo(
    () =>
      CompiledContract.make<ZkContract>('zkEscrow', Contract<ZkEscrowPrivateState, Witnesses<ZkEscrowPrivateState>>).pipe(
        CompiledContract.withWitnesses(witnesses),
        CompiledContract.withCompiledFileAssets(window.location.origin),
      ),
    [],
  );
  const bootstrapContract = useMemo(
    () =>
      CompiledContract.make<ZkContract>('zkEscrow', ZkEscrowBootstrapContract).pipe(
        CompiledContract.withWitnesses(witnesses),
        CompiledContract.withCompiledFileAssets(window.location.origin),
      ),
    [],
  );

  const run = useCallback(async <T,>(label: string, operation: () => Promise<T>): Promise<T> => {
    setBusy(label);
    setError(null);
    try {
      return await operation();
    } catch (cause) {
      const message = errorMessage(cause);
      logger.error({ cause }, message);
      setError(message);
      throw cause;
    } finally {
      setBusy(null);
    }
  }, [logger]);

  const initializeProviders = useCallback(async (initialApi?: InitialAPI): Promise<Providers> => {
    if (providersRef.current) return providersRef.current;
    const initial = initialApi ?? findWallet();
    // Keep connect() in the original click call stack so wallets can open their approval UI.
    const connected = await initial.connect(NETWORK_ID);
    const configuration = await connected.getConfiguration();
    if (configuration.networkId.toLowerCase() !== NETWORK_ID) {
      throw new Error(`${initial.name} is connected to ${configuration.networkId}. Switch the wallet to Preprod.`);
    }
    setNetworkId(configuration.networkId);

    const shielded = await connected.getShieldedAddresses();
    const { unshieldedAddress } = await connected.getUnshieldedAddress();
    const [balances, dust] = await Promise.all([connected.getUnshieldedBalances(), connected.getDustBalance()]);
    const zkConfigProvider = new FetchZkConfigProvider<CircuitKey>(window.location.origin, fetch.bind(window));
    let proofProvider: Providers['proofProvider'];
    try {
      const walletProver = await connected.getProvingProvider(zkConfigProvider);
      proofProvider = createProofProvider(walletProver as unknown as Parameters<typeof createProofProvider>[0]);
    } catch (cause) {
      if (!configuration.proverServerUri) {
        logger.warn({ cause }, `${initial.name} did not provide a prover`);
        throw new Error('The wallet has no in-browser prover or local proof server. Configure http://localhost:6300 and retry.');
      }
      proofProvider = httpClientProofProvider(configuration.proverServerUri, zkConfigProvider);
    }

    const providers: Providers = {
      privateStateProvider,
      zkConfigProvider,
      proofProvider,
      publicDataProvider: indexerPublicDataProvider(configuration.indexerUri, configuration.indexerWsUri),
      walletProvider: {
        getCoinPublicKey: () => shielded.shieldedCoinPublicKey,
        getEncryptionPublicKey: () => shielded.shieldedEncryptionPublicKey,
        balanceTx: async (tx: UnboundTransaction): Promise<FinalizedTransaction> => {
          const received = await connected.balanceUnsealedTransaction(toHex(tx.serialize()), {});
          return Transaction.deserialize<SignatureEnabled, Proof, Binding>('signature', 'proof', 'binding', fromHex(received.tx));
        },
      },
      midnightProvider: {
        submitTx: async (tx: FinalizedTransaction): Promise<TransactionId> => {
          await connected.submitTransaction(toHex(tx.serialize()));
          return tx.identifiers()[0];
        },
      },
    };

    connectedApiRef.current = connected;
    providersRef.current = providers;
    setWallet({
      unshieldedAddress,
      tnightBalance: balances[unshieldedToken().raw] ?? 0n,
      dustBalance: dust.balance,
    });
    return providers;
  }, [logger, privateStateProvider]);

  const connectWallet = useCallback(
    () => {
      const initial = findWallet();
      return run(`Connecting to ${initial.name}`, async () => {
        await initializeProviders(initial);
      });
    },
    [initializeProviders, run],
  );

  const refresh = useCallback(async () => {
    const providers = providersRef.current;
    const address = addressRef.current;
    if (!providers || !address) return;
    const contractState = await providers.publicDataProvider.queryContractState(address);
    if (!contractState) throw new Error('The contract was not found on Midnight Preprod.');
    const currentLedger = ledger(contractState.data);
    setDeals(readDeals(currentLedger, identity));
    const stored = localStorage.getItem(storageKey(address));
    let local: Record<string, PrivateMetadata> = {};
    if (stored) {
      try {
        const parsed: unknown = JSON.parse(stored);
        local = parseMetadataRecord(parsed);
      } catch {
        localStorage.removeItem(storageKey(address));
      }
    }
    const invite = getInviteParameters();
    const inviteDeal = invite.get('deal');
    const payload = invite.get('payload');
    const inviteSecret = invite.get('invite');
    if (invite.get('contract') === address && inviteDeal && payload && inviteSecret && !local[inviteDeal]) {
      const dealId = BigInt(inviteDeal);
      if (currentLedger.deals.member(dealId)) {
        const recovered = await decryptPrivatePayload<PrivateMetadata>(payload, hexToBytes(inviteSecret));
        if (!isPrivateMetadata(recovered)) throw new Error('The invite contains invalid private agreement metadata.');
        const expected = bytesToHex(currentLedger.deals.lookup(dealId).metadataCommitment);
        const actual = bytesToHex(await commitText(JSON.stringify({
          title: recovered.title.trim(),
          description: recovered.description.trim(),
          milestones: recovered.milestones,
        })));
        if (expected !== actual) throw new Error('Invite metadata does not match the on-chain agreement commitment.');
        local[inviteDeal] = recovered;
        localStorage.setItem(storageKey(address), JSON.stringify(local));
      }
    }
    setMetadata(local);
    if (connectedApiRef.current) {
      const [balances, dust] = await Promise.all([
        connectedApiRef.current.getUnshieldedBalances(),
        connectedApiRef.current.getDustBalance(),
      ]);
      setWallet((current) => current ? {
        ...current,
        tnightBalance: balances[unshieldedToken().raw] ?? 0n,
        dustBalance: dust.balance,
      } : current);
    }
  }, [identity]);

  const activateContract = useCallback(async (address: ContractAddress) => {
    addressRef.current = address;
    setContractAddress(address);
    localStorage.setItem(contractStorageKey, address);
    privateStateProvider.setContractAddress(address);
    await privateStateProvider.set(PRIVATE_STATE_ID, { userSecret: identity });
    await refresh();
  }, [identity, privateStateProvider, refresh]);

  const deploy = useCallback(
    () => run('Deploying contract to Preprod', async () => {
      const providers = await initializeProviders();
      let address = pendingDeploymentRef.current;

      if (!address) {
        const deployed = await deployContract(providers, {
          compiledContract: bootstrapContract,
          privateStateId: PRIVATE_STATE_ID,
          initialPrivateState: { userSecret: identity },
        });
        address = deployed.deployTxData.public.contractAddress;
        pendingDeploymentRef.current = address;
        setLastTransaction({ label: 'Core contract deployment', txId: String(deployed.deployTxData.public.txId), blockHeight: deployed.deployTxData.public.blockHeight });
      }

      try {
        for (const [index, circuitId] of deferredCircuitIds.entries()) {
          setBusy(`Installing contract circuit ${index + 1} of ${deferredCircuitIds.length}`);
          const state = await providers.publicDataProvider.queryContractState(address);
          if (!state) throw new Error('The new registry is not visible in the Preprod indexer yet. Retry in a moment.');
          if (state.operation(circuitId)) continue;
          const verifierKey = await providers.zkConfigProvider.getVerifierKey(circuitId);
          const finalized = await submitInsertVerifierKeyTx(providers, browserContract, address, circuitId, verifierKey);
          setLastTransaction({ label: `Installed ${circuitId}`, txId: String(finalized.txId), blockHeight: finalized.blockHeight });
        }
      } catch (cause) {
        const message = cause instanceof Error ? cause.message : String(cause);
        throw new Error(`Registry ${address} was deployed, but setup paused: ${message} Keep this page open and click Deploy to Preprod again to resume.`);
      }

      pendingDeploymentRef.current = null;
      await activateContract(address);
    }),
    [activateContract, bootstrapContract, browserContract, identity, initializeProviders, run],
  );

  const join = useCallback(
    (rawAddress: string) => run('Joining Preprod contract', async () => {
      const address = rawAddress.trim() as ContractAddress;
      if (!/^[0-9a-f]{64}$/i.test(address)) throw new Error('Enter a 64-character Midnight contract address.');
      const providers = await initializeProviders();
      await findDeployedContract(providers, {
        contractAddress: address,
        compiledContract: browserContract,
        privateStateId: PRIVATE_STATE_ID,
        initialPrivateState: { userSecret: identity },
      });
      await activateContract(address);
    }),
    [activateContract, browserContract, identity, initializeProviders, run],
  );

  const importIdentity = useCallback(async (secretHex: string) => {
    const next = hexToBytes(secretHex);
    sessionStorage.setItem(identityStorageKey, bytesToHex(next));
    setIdentity(next);
    if (addressRef.current) {
      privateStateProvider.setContractAddress(addressRef.current);
      await privateStateProvider.set(PRIVATE_STATE_ID, { userSecret: next });
      const providers = providersRef.current;
      if (providers) {
        const state = await providers.publicDataProvider.queryContractState(addressRef.current);
        if (state) setDeals(readDeals(ledger(state.data), next));
      }
    }
  }, [privateStateProvider]);

  const submit = useCallback(async (label: string, circuitId: CircuitKey, args: readonly unknown[]) => {
    await run(label, async () => {
      const providers = providersRef.current;
      const address = addressRef.current;
      if (!providers || !address) throw new Error('Connect to the zkEscrow contract first.');
      privateStateProvider.setContractAddress(address);
      await privateStateProvider.set(PRIVATE_STATE_ID, { userSecret: identity });
      const finalized = await submitCallTx(providers, {
        compiledContract: browserContract,
        contractAddress: address,
        circuitId,
        args,
        privateStateId: PRIVATE_STATE_ID,
      } as never);
      setLastTransaction({ label, txId: String(finalized.public.txId), blockHeight: finalized.public.blockHeight });
      await refresh();
    });
  }, [browserContract, identity, privateStateProvider, refresh, run]);

  const payoutAddress = useCallback(() => {
    if (!wallet) throw new Error('Connect a Midnight wallet before creating or accepting an escrow.');
    return encodeWalletPayout(wallet.unshieldedAddress);
  }, [wallet]);

  const createDeal = useCallback(async (input: CreateDealInput): Promise<CreatedInvite> => {
    let result!: CreatedInvite;
    await run('Creating private escrow', async () => {
      const providers = providersRef.current;
      const address = addressRef.current;
      if (!providers || !address) throw new Error('Connect to the zkEscrow contract first.');
      const planned = input.milestones.reduce((sum, item) => sum + item.amount, 0n);
      if (planned !== input.amount) throw new Error('Milestone amounts must equal the escrow total.');
      if (input.milestones.length < 1 || input.milestones.length > 12) throw new Error('Use between 1 and 12 milestones.');
      if (input.title.trim().length > 120 || input.description.trim().length > 4_000 || input.milestones.some((item) => item.label.trim().length > 120)) {
        throw new Error('Keep the title and milestone labels under 120 characters and the agreement under 4,000 characters.');
      }

      const sellerSecret = randomSecret();
      const arbitratorSecret = randomSecret();
      const privateMetadata: PrivateMetadata = {
        title: input.title.trim(),
        description: input.description.trim(),
        milestones: input.milestones.map((item) => ({
          label: item.label.trim(),
          amount: item.amount.toString(),
          deliveryDeadline: item.deliveryDeadline.toString(),
          reviewDeadline: item.reviewDeadline.toString(),
        })),
      };
      const metadataCommitment = await commitText(JSON.stringify({
        title: input.title.trim(),
        description: input.description.trim(),
        milestones: input.milestones.map((item) => ({
          label: item.label.trim(),
          amount: item.amount.toString(),
          deliveryDeadline: item.deliveryDeadline.toString(),
          reviewDeadline: item.reviewDeadline.toString(),
        })),
      }));
      const [sellerPayload, arbitratorPayload] = await Promise.all([
        encryptPrivatePayload(privateMetadata, sellerSecret),
        encryptPrivatePayload(privateMetadata, arbitratorSecret),
      ]);
      privateStateProvider.setContractAddress(address);
      await privateStateProvider.set(PRIVATE_STATE_ID, { userSecret: identity });

      const createdTx = await submitCallTx(providers, {
        compiledContract: browserContract,
        contractAddress: address,
        circuitId: 'createDeal',
        args: [input.amount, input.deadline, metadataCommitment, sellerSecret, arbitratorSecret, payoutAddress()],
        privateStateId: PRIVATE_STATE_ID,
      } as never);
      setLastTransaction({ label: 'Creating private escrow', txId: String(createdTx.public.txId), blockHeight: createdTx.public.blockHeight });

      const stateAfterCreate = await providers.publicDataProvider.queryContractState(address);
      if (!stateAfterCreate) throw new Error('Created escrow could not be read from the indexer.');
      const dealId = ledger(stateAfterCreate.data).dealCount;

      const base = `${window.location.origin}${window.location.pathname}`;
      result = {
        dealId,
        sellerSecret: bytesToHex(sellerSecret),
        arbitratorSecret: bytesToHex(arbitratorSecret),
        sellerLink: `${base}#contract=${address}&deal=${dealId}&role=seller&invite=${bytesToHex(sellerSecret)}&payload=${sellerPayload}`,
        arbitratorLink: `${base}#contract=${address}&deal=${dealId}&role=arbitrator&invite=${bytesToHex(arbitratorSecret)}&payload=${arbitratorPayload}`,
      };
      setLastCreatedInvite(result);

      for (const milestone of input.milestones) {
        const milestoneTx = await submitCallTx(providers, {
          compiledContract: browserContract,
          contractAddress: address,
          circuitId: 'addMilestone',
           args: [dealId, milestone.amount, milestone.deliveryDeadline, milestone.reviewDeadline, await commitText(milestone.label)],
          privateStateId: PRIVATE_STATE_ID,
        } as never);
        setLastTransaction({ label: 'Adding escrow milestone', txId: String(milestoneTx.public.txId), blockHeight: milestoneTx.public.blockHeight });
      }

      const existing = localStorage.getItem(storageKey(address));
      let local: Record<string, PrivateMetadata> = {};
      if (existing) {
        try {
          const parsed: unknown = JSON.parse(existing);
          local = parseMetadataRecord(parsed);
        } catch {
          localStorage.removeItem(storageKey(address));
        }
      }
      local[dealId.toString()] = privateMetadata;
      localStorage.setItem(storageKey(address), JSON.stringify(local));

      await refresh();
    });
    return result;
  }, [browserContract, identity, payoutAddress, privateStateProvider, refresh, run]);

  const acceptDeal = useCallback((dealId: bigint, invite: string) => submit('Accepting escrow', 'acceptDeal', [dealId, hexToBytes(invite), payoutAddress()]), [payoutAddress, submit]);
  const claimArbitrator = useCallback((dealId: bigint, invite: string) => submit('Claiming arbitration role', 'claimArbitrator', [dealId, hexToBytes(invite)]), [submit]);
  const fundDeal = useCallback((dealId: bigint, amount: bigint) => submit('Locking tNIGHT in escrow', 'fundDeal', [dealId, amount]), [submit]);
  const submitMilestone = useCallback(async (dealId: bigint, milestoneId: bigint, evidence: string) => submit('Submitting milestone proof', 'submitMilestone', [dealId, milestoneId, await commitText(evidence)]), [submit]);
  const approveMilestone = useCallback((dealId: bigint, milestoneId: bigint) => submit('Approving milestone and releasing payment', 'approveMilestone', [dealId, milestoneId]), [submit]);
  const autoReleaseMilestone = useCallback((dealId: bigint, milestoneId: bigint) => submit('Releasing expired review milestone', 'autoReleaseMilestone', [dealId, milestoneId]), [submit]);
  const requestRefund = useCallback((dealId: bigint) => submit('Requesting refund', 'requestRefund', [dealId]), [submit]);
  const approveRefund = useCallback((dealId: bigint) => submit('Approving refund', 'approveRefund', [dealId]), [submit]);
  const claimLateRefund = useCallback((dealId: bigint, milestoneId: bigint) => submit('Claiming late-delivery refund', 'claimLateRefund', [dealId, milestoneId]), [submit]);
  const cancelUnfunded = useCallback((dealId: bigint) => submit('Cancelling escrow', 'cancelUnfunded', [dealId]), [submit]);
  const openDispute = useCallback(async (dealId: bigint, evidence: string) => submit('Opening private dispute', 'openDispute', [dealId, await commitText(evidence)]), [submit]);
  const submitDisputeEvidence = useCallback(async (dealId: bigint, evidence: string) => submit('Committing dispute evidence', 'submitDisputeEvidence', [dealId, await commitText(evidence)]), [submit]);
  const resolveDispute = useCallback((dealId: bigint, sellerAward: bigint, buyerAward: bigint) => submit('Settling dispute on-chain', 'resolveDispute', [dealId, sellerAward, buyerAward]), [submit]);
  const proveReputation = useCallback((minimum: bigint) => submit('Generating reputation proof', 'proveCompletedAtLeast', [minimum]), [submit]);

  useEffect(() => {
    if (!contractAddress) return;
    const timer = window.setInterval(() => void refresh().catch((cause) => logger.warn({ cause }, 'Background refresh failed')), 15_000);
    return () => window.clearInterval(timer);
  }, [contractAddress, logger, refresh]);

  useEffect(() => {
    if (!operatorMode && contractTarget.address && wallet && !contractAddress) void join(contractTarget.address).catch(() => undefined);
  }, [contractAddress, contractTarget.address, join, operatorMode, wallet]);

  const value: ContextValue = {
    wallet,
    contractAddress,
    contractTargetAddress: contractTarget.address,
    contractConfigurationError: contractTarget.configurationError,
    identitySecret: bytesToHex(identity),
    deals,
    metadata,
    busy,
    error,
    lastCreatedInvite,
    lastTransaction,
    connectWallet,
    deploy,
    join,
    refresh,
    importIdentity,
    createDeal,
    acceptDeal,
    claimArbitrator,
    fundDeal,
    submitMilestone,
    approveMilestone,
    autoReleaseMilestone,
    requestRefund,
    approveRefund,
    claimLateRefund,
    cancelUnfunded,
    openDispute,
    submitDisputeEvidence,
    resolveDispute,
    proveReputation,
    clearError: () => setError(null),
    clearLastTransaction: () => setLastTransaction(null),
  };

  return <ZkEscrowContext.Provider value={value}>{children}</ZkEscrowContext.Provider>;
};

export const useZkEscrow = (): ContextValue => {
  const value = useContext(ZkEscrowContext);
  if (!value) throw new Error('useZkEscrow must be used inside ZkEscrowProvider.');
  return value;
};
