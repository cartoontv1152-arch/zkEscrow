import type { ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';

const addressPattern = /^[0-9a-f]{64}$/i;

export type ContractTarget = {
  readonly address: ContractAddress | null;
  readonly configurationError: string | null;
};

export const resolveContractTarget = (configured: string | undefined, invite: string | null, stored: string | null): ContractTarget => {
  const configuredAddress = configured?.trim() ?? '';
  if (configuredAddress && !addressPattern.test(configuredAddress)) {
    return { address: null, configurationError: 'VITE_ZKESCROW_CONTRACT_ADDRESS must be a 64-character hexadecimal Midnight contract address.' };
  }

  const candidate = configuredAddress || invite?.trim() || stored?.trim() || '';
  if (!candidate) return { address: null, configurationError: null };
  if (!addressPattern.test(candidate)) return { address: null, configurationError: 'The zkEscrow contract address is invalid.' };
  return { address: candidate.toLowerCase() as ContractAddress, configurationError: null };
};
