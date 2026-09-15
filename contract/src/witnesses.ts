import type { WitnessContext } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import type { Ledger, UserSecretKey, Witnesses } from './managed/zkescrow/contract/index.js';

export type ZkEscrowPrivateState = {
  readonly userSecret: UserSecretKey;
};

export const createPrivateState = (userSecret: Uint8Array): ZkEscrowPrivateState => ({ userSecret });

export const witnesses: Witnesses<ZkEscrowPrivateState> = {
  getUserSecret: ({ privateState }: WitnessContext<Ledger, ZkEscrowPrivateState>) => [
    privateState,
    privateState.userSecret,
  ],
};

