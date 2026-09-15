import { createConstructorContext } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { describe, expect, it } from 'vitest';
import { witnesses } from '../../../contract/src/witnesses.js';
import { bootstrapCircuitIds, deferredCircuitIds, ZkEscrowBootstrapContract } from './bootstrap-contract.js';

describe('ZkEscrowBootstrapContract', () => {
  it('deploys only the core verifier keys and defers every other operation', () => {
    const privateState = { userSecret: new Uint8Array(32).fill(1) };
    const contract = new ZkEscrowBootstrapContract(witnesses);
    const initial = contract.initialState(createConstructorContext(privateState, '0'.repeat(64)));

    expect(initial.currentContractState.operations().sort()).toEqual([...bootstrapCircuitIds].sort());
    expect(Object.keys(contract.provableCircuits).sort()).toEqual([...bootstrapCircuitIds].sort());
    expect(new Set([...bootstrapCircuitIds, ...deferredCircuitIds]).size).toBe(16);
  });
});
