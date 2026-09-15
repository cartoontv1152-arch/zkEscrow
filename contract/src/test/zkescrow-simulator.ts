import {
  createCircuitContext,
  createConstructorContext,
  encodeUserAddress,
  sampleContractAddress,
  sampleUserAddress,
  type CircuitContext,
} from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import {
  Contract,
  ledger,
  type Ledger,
  type Witnesses,
} from '../managed/zkescrow/contract/index.js';
import { witnesses, type ZkEscrowPrivateState } from '../witnesses.js';

const contractAddress = sampleContractAddress();

export const secret = (byte: number): Uint8Array => new Uint8Array(32).fill(byte);
export const payout = () => ({ bytes: encodeUserAddress(sampleUserAddress()) });

export class ZkEscrowSimulator {
  readonly contract: Contract<ZkEscrowPrivateState, Witnesses<ZkEscrowPrivateState>>;
  context: CircuitContext<ZkEscrowPrivateState>;

  constructor(userSecret = secret(1), time = 1_000) {
    this.contract = new Contract(witnesses);
    const initial = this.contract.initialState(
      createConstructorContext({ userSecret }, '0'.repeat(64)),
    );
    this.context = createCircuitContext(
      contractAddress,
      initial.currentZswapLocalState,
      initial.currentContractState,
      initial.currentPrivateState,
      undefined,
      undefined,
      time,
    );
  }

  as(userSecret: Uint8Array): this {
    this.context = {
      ...this.context,
      currentPrivateState: { userSecret },
    };
    return this;
  }

  at(time: number): this {
    this.context = createCircuitContext(
      contractAddress,
      this.context.currentZswapLocalState,
      this.context.currentQueryContext.state,
      this.context.currentPrivateState,
      this.context.gasLimit,
      this.context.costModel,
      time,
    );
    return this;
  }

  ledger(): Ledger {
    return ledger(this.context.currentQueryContext.state);
  }

  call<K extends keyof Contract<ZkEscrowPrivateState>['impureCircuits']>(
    circuit: K,
    ...args: Parameters<Contract<ZkEscrowPrivateState>['impureCircuits'][K]> extends [unknown, ...infer A] ? A : never
  ): ReturnType<Contract<ZkEscrowPrivateState>['impureCircuits'][K]>['result'] {
    const result = (this.contract.impureCircuits[circuit] as (...input: unknown[]) => { context: CircuitContext<ZkEscrowPrivateState>; result: unknown })(
      this.context,
      ...args,
    );
    this.context = result.context;
    return result.result as ReturnType<Contract<ZkEscrowPrivateState>['impureCircuits'][K]>['result'];
  }
}
