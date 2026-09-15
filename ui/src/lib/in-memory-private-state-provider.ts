import type { ContractAddress, SigningKey } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import type { PrivateStateId, PrivateStateProvider } from '@midnight-ntwrk/midnight-js-types';

export const inMemoryPrivateStateProvider = <PSI extends PrivateStateId, PS>(): PrivateStateProvider<PSI, PS> => {
  const states = new Map<ContractAddress, Map<PSI, PS>>();
  const signingKeys = new Map<ContractAddress, SigningKey>();
  let currentAddress: ContractAddress | undefined;

  const address = (): ContractAddress => {
    if (!currentAddress) throw new Error('Contract address is not set.');
    return currentAddress;
  };

  const scoped = (): Map<PSI, PS> => {
    const key = address();
    let state = states.get(key);
    if (!state) {
      state = new Map();
      states.set(key, state);
    }
    return state;
  };

  return {
    setContractAddress(value) {
      currentAddress = value;
    },
    async set(key, value) {
      scoped().set(key, value);
    },
    async get(key) {
      return scoped().get(key) ?? null;
    },
    async remove(key) {
      scoped().delete(key);
    },
    async clear() {
      states.delete(address());
    },
    async setSigningKey(contractAddress, signingKey) {
      signingKeys.set(contractAddress, signingKey);
    },
    async getSigningKey(contractAddress) {
      return signingKeys.get(contractAddress) ?? null;
    },
    async removeSigningKey(contractAddress) {
      signingKeys.delete(contractAddress);
    },
    async clearSigningKeys() {
      signingKeys.clear();
    },
    async exportPrivateStates() {
      throw new Error('Export private state with the identity recovery key in the Privacy Center.');
    },
    async importPrivateStates() {
      throw new Error('Import private state with the identity recovery key in the Privacy Center.');
    },
    async exportSigningKeys() {
      throw new Error('Signing-key export is not available in the browser demo.');
    },
    async importSigningKeys() {
      throw new Error('Signing-key import is not available in the browser demo.');
    },
  } as PrivateStateProvider<PSI, PS>;
};

