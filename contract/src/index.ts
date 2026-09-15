import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { Contract as ContractClass, type Witnesses as ContractWitnesses } from './managed/zkescrow/contract/index.js';
import { witnesses, type ZkEscrowPrivateState } from './witnesses.js';

export * from './managed/zkescrow/contract/index.js';
export * from './witnesses.js';
export { ContractClass as Contract };
export type { ContractWitnesses as Witnesses };
export type {
  Deal,
  Dispute,
  Ledger,
  Milestone,
  UserPublicKey,
  UserSecretKey,
} from './managed/zkescrow/contract/index.js';

export const CompiledZkEscrowContract = CompiledContract.make<
  ContractClass<ZkEscrowPrivateState, ContractWitnesses<ZkEscrowPrivateState>>
>('zkEscrow', ContractClass<ZkEscrowPrivateState, ContractWitnesses<ZkEscrowPrivateState>>).pipe(
  CompiledContract.withWitnesses(witnesses),
  CompiledContract.withCompiledFileAssets('./managed/zkescrow'),
);
