import { ContractState } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import {
  Contract,
  type Witnesses,
} from '../../../contract/src/managed/zkescrow/contract/index.js';
import type { ZkEscrowPrivateState } from '../../../contract/src/witnesses.js';

export const bootstrapCircuitIds = [
  'createDeal',
  'addMilestone',
  'acceptDeal',
  'claimArbitrator',
  'fundDeal',
  'submitMilestone',
  'approveMilestone',
] as const;

export const deferredCircuitIds = [
  'autoReleaseMilestone',
  'requestRefund',
  'approveRefund',
  'claimLateRefund',
  'cancelUnfunded',
  'openDispute',
  'submitDisputeEvidence',
  'resolveDispute',
  'proveCompletedAtLeast',
] as const;

type ZkContract = Contract<ZkEscrowPrivateState, Witnesses<ZkEscrowPrivateState>>;

/**
 * Preprod currently rejects a single deployment containing all 16 verifier keys.
 * This constructor deploys the same ledger with the seven core operations; the
 * remaining verifier keys are installed with signed maintenance transactions.
 */
export class ZkEscrowBootstrapContract extends Contract<ZkEscrowPrivateState, Witnesses<ZkEscrowPrivateState>> {
  constructor(contractWitnesses: Witnesses<ZkEscrowPrivateState>) {
    super(contractWitnesses);
    const allProvableCircuits = this.provableCircuits;
    this.provableCircuits = Object.fromEntries(
      bootstrapCircuitIds.map((circuitId) => [circuitId, allProvableCircuits[circuitId]]),
    ) as ZkContract['provableCircuits'];
  }

  override initialState(...args: Parameters<ZkContract['initialState']>): ReturnType<ZkContract['initialState']> {
    const initial = super.initialState(...args);
    const fullState = initial.currentContractState;
    const bootstrapState = new ContractState();

    bootstrapState.data = fullState.data;
    bootstrapState.balance = fullState.balance;
    bootstrapState.maintenanceAuthority = fullState.maintenanceAuthority;
    for (const circuitId of bootstrapCircuitIds) {
      const operation = fullState.operation(circuitId);
      if (!operation) throw new Error(`Bootstrap circuit '${circuitId}' is missing from the compiled contract.`);
      bootstrapState.setOperation(circuitId, operation);
    }

    return { ...initial, currentContractState: bootstrapState };
  }
}
