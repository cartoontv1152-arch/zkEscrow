import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

export var DealStatus;
(function (DealStatus) {
  DealStatus[DealStatus['DRAFT'] = 0] = 'DRAFT';
  DealStatus[DealStatus['ACCEPTED'] = 1] = 'ACCEPTED';
  DealStatus[DealStatus['FUNDED'] = 2] = 'FUNDED';
  DealStatus[DealStatus['IN_PROGRESS'] = 3] = 'IN_PROGRESS';
  DealStatus[DealStatus['DISPUTED'] = 4] = 'DISPUTED';
  DealStatus[DealStatus['COMPLETED'] = 5] = 'COMPLETED';
  DealStatus[DealStatus['CANCELLED'] = 6] = 'CANCELLED';
  DealStatus[DealStatus['REFUNDED'] = 7] = 'REFUNDED';
  DealStatus[DealStatus['SETTLED'] = 8] = 'SETTLED';
})(DealStatus || (DealStatus = {}));

export var MilestoneStatus;
(function (MilestoneStatus) {
  MilestoneStatus[MilestoneStatus['PENDING'] = 0] = 'PENDING';
  MilestoneStatus[MilestoneStatus['SUBMITTED'] = 1] = 'SUBMITTED';
  MilestoneStatus[MilestoneStatus['PAID'] = 2] = 'PAID';
  MilestoneStatus[MilestoneStatus['REFUNDED'] = 3] = 'REFUNDED';
})(MilestoneStatus || (MilestoneStatus = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_2 = __compactRuntime.CompactTypeBoolean;

class _Dispute_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment()))));
  }
  fromValue(value_0) {
    return {
      buyerEvidence: _descriptor_0.fromValue(value_0),
      sellerEvidence: _descriptor_0.fromValue(value_0),
      resolved: _descriptor_2.fromValue(value_0),
      sellerAward: _descriptor_1.fromValue(value_0),
      buyerAward: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.buyerEvidence).concat(_descriptor_0.toValue(value_0.sellerEvidence).concat(_descriptor_2.toValue(value_0.resolved).concat(_descriptor_1.toValue(value_0.sellerAward).concat(_descriptor_1.toValue(value_0.buyerAward)))));
  }
}

const _descriptor_3 = new _Dispute_0();

class _UserAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_4 = new _UserAddress_0();

const _descriptor_5 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_6 = new __compactRuntime.CompactTypeEnum(8, 1);

class _Deal_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_2.alignment()))))))))))))))))));
  }
  fromValue(value_0) {
    return {
      buyerKey: _descriptor_0.fromValue(value_0),
      sellerKey: _descriptor_0.fromValue(value_0),
      arbitratorKey: _descriptor_0.fromValue(value_0),
      sellerInviteCommitment: _descriptor_0.fromValue(value_0),
      arbitratorInviteCommitment: _descriptor_0.fromValue(value_0),
      buyerPayout: _descriptor_4.fromValue(value_0),
      sellerPayout: _descriptor_4.fromValue(value_0),
      amount: _descriptor_1.fromValue(value_0),
      plannedAmount: _descriptor_1.fromValue(value_0),
      fundedAmount: _descriptor_1.fromValue(value_0),
      releasedAmount: _descriptor_1.fromValue(value_0),
      refundedAmount: _descriptor_1.fromValue(value_0),
      milestoneCount: _descriptor_5.fromValue(value_0),
      paidMilestoneCount: _descriptor_5.fromValue(value_0),
      settledMilestoneCount: _descriptor_5.fromValue(value_0),
      deadline: _descriptor_1.fromValue(value_0),
      metadataCommitment: _descriptor_0.fromValue(value_0),
      status: _descriptor_6.fromValue(value_0),
      refundRequested: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.buyerKey).concat(_descriptor_0.toValue(value_0.sellerKey).concat(_descriptor_0.toValue(value_0.arbitratorKey).concat(_descriptor_0.toValue(value_0.sellerInviteCommitment).concat(_descriptor_0.toValue(value_0.arbitratorInviteCommitment).concat(_descriptor_4.toValue(value_0.buyerPayout).concat(_descriptor_4.toValue(value_0.sellerPayout).concat(_descriptor_1.toValue(value_0.amount).concat(_descriptor_1.toValue(value_0.plannedAmount).concat(_descriptor_1.toValue(value_0.fundedAmount).concat(_descriptor_1.toValue(value_0.releasedAmount).concat(_descriptor_1.toValue(value_0.refundedAmount).concat(_descriptor_5.toValue(value_0.milestoneCount).concat(_descriptor_5.toValue(value_0.paidMilestoneCount).concat(_descriptor_5.toValue(value_0.settledMilestoneCount).concat(_descriptor_1.toValue(value_0.deadline).concat(_descriptor_0.toValue(value_0.metadataCommitment).concat(_descriptor_6.toValue(value_0.status).concat(_descriptor_2.toValue(value_0.refundRequested)))))))))))))))))));
  }
}

const _descriptor_7 = new _Deal_0();

const _descriptor_8 = new __compactRuntime.CompactTypeEnum(3, 1);

class _Milestone_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_8.alignment())))));
  }
  fromValue(value_0) {
    return {
      amount: _descriptor_1.fromValue(value_0),
      deliveryDeadline: _descriptor_1.fromValue(value_0),
      reviewDeadline: _descriptor_1.fromValue(value_0),
      labelCommitment: _descriptor_0.fromValue(value_0),
      deliveryCommitment: _descriptor_0.fromValue(value_0),
      status: _descriptor_8.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.amount).concat(_descriptor_1.toValue(value_0.deliveryDeadline).concat(_descriptor_1.toValue(value_0.reviewDeadline).concat(_descriptor_0.toValue(value_0.labelCommitment).concat(_descriptor_0.toValue(value_0.deliveryCommitment).concat(_descriptor_8.toValue(value_0.status))))));
  }
}

const _descriptor_9 = new _Milestone_0();

const _descriptor_10 = new __compactRuntime.CompactTypeBytes(22);

class _tuple_0 {
  alignment() {
    return _descriptor_10.alignment().concat(_descriptor_0.alignment());
  }
  fromValue(value_0) {
    return [
      _descriptor_10.fromValue(value_0),
      _descriptor_0.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_10.toValue(value_0[0]).concat(_descriptor_0.toValue(value_0[1]));
  }
}

const _descriptor_11 = new _tuple_0();

class _Either_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
}

const _descriptor_12 = new _Either_0();

const _descriptor_13 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

const _descriptor_14 = new __compactRuntime.CompactTypeBytes(20);

class _tuple_1 {
  alignment() {
    return _descriptor_14.alignment().concat(_descriptor_0.alignment());
  }
  fromValue(value_0) {
    return [
      _descriptor_14.fromValue(value_0),
      _descriptor_0.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_14.toValue(value_0[0]).concat(_descriptor_0.toValue(value_0[1]));
  }
}

const _descriptor_15 = new _tuple_1();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_16 = new _ContractAddress_0();

class _Either_1 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_16.alignment().concat(_descriptor_4.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_16.fromValue(value_0),
      right: _descriptor_4.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_16.toValue(value_0.left).concat(_descriptor_4.toValue(value_0.right)));
  }
}

const _descriptor_17 = new _Either_1();

const _descriptor_18 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.getUserSecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named getUserSecret');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      deriveUserPublicKey(context, ...args_1) {
        return { result: pureCircuits.deriveUserPublicKey(...args_1), context };
      },
      inviteCommitment(context, ...args_1) {
        return { result: pureCircuits.inviteCommitment(...args_1), context };
      },
      createDeal: (...args_1) => {
        if (args_1.length !== 7) {
          throw new __compactRuntime.CompactError(`createDeal: expected 7 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const amount_0 = args_1[1];
        const deadline_0 = args_1[2];
        const metadataCommitment_0 = args_1[3];
        const sellerInviteSecret_0 = args_1[4];
        const arbitratorInviteSecret_0 = args_1[5];
        const buyerPayout_0 = args_1[6];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('createDeal',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 150 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createDeal',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 150 char 1',
                                     'Uint<0..18446744073709551616>',
                                     amount_0)
        }
        if (!(typeof(deadline_0) === 'bigint' && deadline_0 >= 0n && deadline_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createDeal',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkescrow.compact line 150 char 1',
                                     'Uint<0..18446744073709551616>',
                                     deadline_0)
        }
        if (!(metadataCommitment_0.buffer instanceof ArrayBuffer && metadataCommitment_0.BYTES_PER_ELEMENT === 1 && metadataCommitment_0.length === 32)) {
          __compactRuntime.typeError('createDeal',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'zkescrow.compact line 150 char 1',
                                     'Bytes<32>',
                                     metadataCommitment_0)
        }
        if (!(sellerInviteSecret_0.buffer instanceof ArrayBuffer && sellerInviteSecret_0.BYTES_PER_ELEMENT === 1 && sellerInviteSecret_0.length === 32)) {
          __compactRuntime.typeError('createDeal',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'zkescrow.compact line 150 char 1',
                                     'Bytes<32>',
                                     sellerInviteSecret_0)
        }
        if (!(arbitratorInviteSecret_0.buffer instanceof ArrayBuffer && arbitratorInviteSecret_0.BYTES_PER_ELEMENT === 1 && arbitratorInviteSecret_0.length === 32)) {
          __compactRuntime.typeError('createDeal',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'zkescrow.compact line 150 char 1',
                                     'Bytes<32>',
                                     arbitratorInviteSecret_0)
        }
        if (!(typeof(buyerPayout_0) === 'object' && buyerPayout_0.bytes.buffer instanceof ArrayBuffer && buyerPayout_0.bytes.BYTES_PER_ELEMENT === 1 && buyerPayout_0.bytes.length === 32)) {
          __compactRuntime.typeError('createDeal',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'zkescrow.compact line 150 char 1',
                                     'struct UserAddress<bytes: Bytes<32>>',
                                     buyerPayout_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(amount_0).concat(_descriptor_1.toValue(deadline_0).concat(_descriptor_0.toValue(metadataCommitment_0).concat(_descriptor_0.toValue(sellerInviteSecret_0).concat(_descriptor_0.toValue(arbitratorInviteSecret_0).concat(_descriptor_4.toValue(buyerPayout_0)))))),
            alignment: _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment())))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createDeal_0(context,
                                            partialProofData,
                                            amount_0,
                                            deadline_0,
                                            metadataCommitment_0,
                                            sellerInviteSecret_0,
                                            arbitratorInviteSecret_0,
                                            buyerPayout_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      addMilestone: (...args_1) => {
        if (args_1.length !== 6) {
          throw new __compactRuntime.CompactError(`addMilestone: expected 6 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dealId_0 = args_1[1];
        const amount_0 = args_1[2];
        const deliveryDeadline_0 = args_1[3];
        const reviewDeadline_0 = args_1[4];
        const labelCommitment_0 = args_1[5];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('addMilestone',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 190 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(dealId_0) === 'bigint' && dealId_0 >= 0n && dealId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('addMilestone',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 190 char 1',
                                     'Uint<0..18446744073709551616>',
                                     dealId_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('addMilestone',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkescrow.compact line 190 char 1',
                                     'Uint<0..18446744073709551616>',
                                     amount_0)
        }
        if (!(typeof(deliveryDeadline_0) === 'bigint' && deliveryDeadline_0 >= 0n && deliveryDeadline_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('addMilestone',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'zkescrow.compact line 190 char 1',
                                     'Uint<0..18446744073709551616>',
                                     deliveryDeadline_0)
        }
        if (!(typeof(reviewDeadline_0) === 'bigint' && reviewDeadline_0 >= 0n && reviewDeadline_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('addMilestone',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'zkescrow.compact line 190 char 1',
                                     'Uint<0..18446744073709551616>',
                                     reviewDeadline_0)
        }
        if (!(labelCommitment_0.buffer instanceof ArrayBuffer && labelCommitment_0.BYTES_PER_ELEMENT === 1 && labelCommitment_0.length === 32)) {
          __compactRuntime.typeError('addMilestone',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'zkescrow.compact line 190 char 1',
                                     'Bytes<32>',
                                     labelCommitment_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(dealId_0).concat(_descriptor_1.toValue(amount_0).concat(_descriptor_1.toValue(deliveryDeadline_0).concat(_descriptor_1.toValue(reviewDeadline_0).concat(_descriptor_0.toValue(labelCommitment_0))))),
            alignment: _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment()))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._addMilestone_0(context,
                                              partialProofData,
                                              dealId_0,
                                              amount_0,
                                              deliveryDeadline_0,
                                              reviewDeadline_0,
                                              labelCommitment_0);
        partialProofData.output = { value: _descriptor_5.toValue(result_0), alignment: _descriptor_5.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      acceptDeal: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`acceptDeal: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dealId_0 = args_1[1];
        const inviteSecret_0 = args_1[2];
        const payout_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('acceptDeal',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 236 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(dealId_0) === 'bigint' && dealId_0 >= 0n && dealId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('acceptDeal',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 236 char 1',
                                     'Uint<0..18446744073709551616>',
                                     dealId_0)
        }
        if (!(inviteSecret_0.buffer instanceof ArrayBuffer && inviteSecret_0.BYTES_PER_ELEMENT === 1 && inviteSecret_0.length === 32)) {
          __compactRuntime.typeError('acceptDeal',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkescrow.compact line 236 char 1',
                                     'Bytes<32>',
                                     inviteSecret_0)
        }
        if (!(typeof(payout_0) === 'object' && payout_0.bytes.buffer instanceof ArrayBuffer && payout_0.bytes.BYTES_PER_ELEMENT === 1 && payout_0.bytes.length === 32)) {
          __compactRuntime.typeError('acceptDeal',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'zkescrow.compact line 236 char 1',
                                     'struct UserAddress<bytes: Bytes<32>>',
                                     payout_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(dealId_0).concat(_descriptor_0.toValue(inviteSecret_0).concat(_descriptor_4.toValue(payout_0))),
            alignment: _descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._acceptDeal_0(context,
                                            partialProofData,
                                            dealId_0,
                                            inviteSecret_0,
                                            payout_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      claimArbitrator: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`claimArbitrator: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dealId_0 = args_1[1];
        const inviteSecret_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('claimArbitrator',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 264 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(dealId_0) === 'bigint' && dealId_0 >= 0n && dealId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('claimArbitrator',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 264 char 1',
                                     'Uint<0..18446744073709551616>',
                                     dealId_0)
        }
        if (!(inviteSecret_0.buffer instanceof ArrayBuffer && inviteSecret_0.BYTES_PER_ELEMENT === 1 && inviteSecret_0.length === 32)) {
          __compactRuntime.typeError('claimArbitrator',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkescrow.compact line 264 char 1',
                                     'Bytes<32>',
                                     inviteSecret_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(dealId_0).concat(_descriptor_0.toValue(inviteSecret_0)),
            alignment: _descriptor_1.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._claimArbitrator_0(context,
                                                 partialProofData,
                                                 dealId_0,
                                                 inviteSecret_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      fundDeal: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`fundDeal: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dealId_0 = args_1[1];
        const amount_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('fundDeal',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 290 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(dealId_0) === 'bigint' && dealId_0 >= 0n && dealId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('fundDeal',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 290 char 1',
                                     'Uint<0..18446744073709551616>',
                                     dealId_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('fundDeal',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkescrow.compact line 290 char 1',
                                     'Uint<0..18446744073709551616>',
                                     amount_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(dealId_0).concat(_descriptor_1.toValue(amount_0)),
            alignment: _descriptor_1.alignment().concat(_descriptor_1.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._fundDeal_0(context,
                                          partialProofData,
                                          dealId_0,
                                          amount_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      submitMilestone: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`submitMilestone: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dealId_0 = args_1[1];
        const milestoneId_0 = args_1[2];
        const deliveryCommitment_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('submitMilestone',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 316 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(dealId_0) === 'bigint' && dealId_0 >= 0n && dealId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('submitMilestone',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 316 char 1',
                                     'Uint<0..18446744073709551616>',
                                     dealId_0)
        }
        if (!(typeof(milestoneId_0) === 'bigint' && milestoneId_0 >= 0n && milestoneId_0 <= 65535n)) {
          __compactRuntime.typeError('submitMilestone',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkescrow.compact line 316 char 1',
                                     'Uint<0..65536>',
                                     milestoneId_0)
        }
        if (!(deliveryCommitment_0.buffer instanceof ArrayBuffer && deliveryCommitment_0.BYTES_PER_ELEMENT === 1 && deliveryCommitment_0.length === 32)) {
          __compactRuntime.typeError('submitMilestone',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'zkescrow.compact line 316 char 1',
                                     'Bytes<32>',
                                     deliveryCommitment_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(dealId_0).concat(_descriptor_5.toValue(milestoneId_0).concat(_descriptor_0.toValue(deliveryCommitment_0))),
            alignment: _descriptor_1.alignment().concat(_descriptor_5.alignment().concat(_descriptor_0.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._submitMilestone_0(context,
                                                 partialProofData,
                                                 dealId_0,
                                                 milestoneId_0,
                                                 deliveryCommitment_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      approveMilestone: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`approveMilestone: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dealId_0 = args_1[1];
        const milestoneId_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('approveMilestone',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 399 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(dealId_0) === 'bigint' && dealId_0 >= 0n && dealId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('approveMilestone',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 399 char 1',
                                     'Uint<0..18446744073709551616>',
                                     dealId_0)
        }
        if (!(typeof(milestoneId_0) === 'bigint' && milestoneId_0 >= 0n && milestoneId_0 <= 65535n)) {
          __compactRuntime.typeError('approveMilestone',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkescrow.compact line 399 char 1',
                                     'Uint<0..65536>',
                                     milestoneId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(dealId_0).concat(_descriptor_5.toValue(milestoneId_0)),
            alignment: _descriptor_1.alignment().concat(_descriptor_5.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._approveMilestone_0(context,
                                                  partialProofData,
                                                  dealId_0,
                                                  milestoneId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      autoReleaseMilestone: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`autoReleaseMilestone: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dealId_0 = args_1[1];
        const milestoneId_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('autoReleaseMilestone',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 411 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(dealId_0) === 'bigint' && dealId_0 >= 0n && dealId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('autoReleaseMilestone',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 411 char 1',
                                     'Uint<0..18446744073709551616>',
                                     dealId_0)
        }
        if (!(typeof(milestoneId_0) === 'bigint' && milestoneId_0 >= 0n && milestoneId_0 <= 65535n)) {
          __compactRuntime.typeError('autoReleaseMilestone',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkescrow.compact line 411 char 1',
                                     'Uint<0..65536>',
                                     milestoneId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(dealId_0).concat(_descriptor_5.toValue(milestoneId_0)),
            alignment: _descriptor_1.alignment().concat(_descriptor_5.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._autoReleaseMilestone_0(context,
                                                      partialProofData,
                                                      dealId_0,
                                                      milestoneId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      requestRefund: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`requestRefund: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dealId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('requestRefund',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 424 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(dealId_0) === 'bigint' && dealId_0 >= 0n && dealId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('requestRefund',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 424 char 1',
                                     'Uint<0..18446744073709551616>',
                                     dealId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(dealId_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._requestRefund_0(context,
                                               partialProofData,
                                               dealId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      approveRefund: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`approveRefund: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dealId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('approveRefund',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 446 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(dealId_0) === 'bigint' && dealId_0 >= 0n && dealId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('approveRefund',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 446 char 1',
                                     'Uint<0..18446744073709551616>',
                                     dealId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(dealId_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._approveRefund_0(context,
                                               partialProofData,
                                               dealId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      claimLateRefund: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`claimLateRefund: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dealId_0 = args_1[1];
        const milestoneId_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('claimLateRefund',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 470 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(dealId_0) === 'bigint' && dealId_0 >= 0n && dealId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('claimLateRefund',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 470 char 1',
                                     'Uint<0..18446744073709551616>',
                                     dealId_0)
        }
        if (!(typeof(milestoneId_0) === 'bigint' && milestoneId_0 >= 0n && milestoneId_0 <= 65535n)) {
          __compactRuntime.typeError('claimLateRefund',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkescrow.compact line 470 char 1',
                                     'Uint<0..65536>',
                                     milestoneId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(dealId_0).concat(_descriptor_5.toValue(milestoneId_0)),
            alignment: _descriptor_1.alignment().concat(_descriptor_5.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._claimLateRefund_0(context,
                                                 partialProofData,
                                                 dealId_0,
                                                 milestoneId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      cancelUnfunded: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`cancelUnfunded: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dealId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('cancelUnfunded',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 510 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(dealId_0) === 'bigint' && dealId_0 >= 0n && dealId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('cancelUnfunded',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 510 char 1',
                                     'Uint<0..18446744073709551616>',
                                     dealId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(dealId_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._cancelUnfunded_0(context,
                                                partialProofData,
                                                dealId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      openDispute: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`openDispute: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dealId_0 = args_1[1];
        const evidenceCommitment_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('openDispute',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 532 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(dealId_0) === 'bigint' && dealId_0 >= 0n && dealId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('openDispute',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 532 char 1',
                                     'Uint<0..18446744073709551616>',
                                     dealId_0)
        }
        if (!(evidenceCommitment_0.buffer instanceof ArrayBuffer && evidenceCommitment_0.BYTES_PER_ELEMENT === 1 && evidenceCommitment_0.length === 32)) {
          __compactRuntime.typeError('openDispute',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkescrow.compact line 532 char 1',
                                     'Bytes<32>',
                                     evidenceCommitment_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(dealId_0).concat(_descriptor_0.toValue(evidenceCommitment_0)),
            alignment: _descriptor_1.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._openDispute_0(context,
                                             partialProofData,
                                             dealId_0,
                                             evidenceCommitment_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      submitDisputeEvidence: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`submitDisputeEvidence: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dealId_0 = args_1[1];
        const evidenceCommitment_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('submitDisputeEvidence',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 565 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(dealId_0) === 'bigint' && dealId_0 >= 0n && dealId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('submitDisputeEvidence',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 565 char 1',
                                     'Uint<0..18446744073709551616>',
                                     dealId_0)
        }
        if (!(evidenceCommitment_0.buffer instanceof ArrayBuffer && evidenceCommitment_0.BYTES_PER_ELEMENT === 1 && evidenceCommitment_0.length === 32)) {
          __compactRuntime.typeError('submitDisputeEvidence',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkescrow.compact line 565 char 1',
                                     'Bytes<32>',
                                     evidenceCommitment_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(dealId_0).concat(_descriptor_0.toValue(evidenceCommitment_0)),
            alignment: _descriptor_1.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._submitDisputeEvidence_0(context,
                                                       partialProofData,
                                                       dealId_0,
                                                       evidenceCommitment_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      resolveDispute: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`resolveDispute: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dealId_0 = args_1[1];
        const sellerAward_0 = args_1[2];
        const buyerAward_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('resolveDispute',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 582 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(dealId_0) === 'bigint' && dealId_0 >= 0n && dealId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('resolveDispute',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 582 char 1',
                                     'Uint<0..18446744073709551616>',
                                     dealId_0)
        }
        if (!(typeof(sellerAward_0) === 'bigint' && sellerAward_0 >= 0n && sellerAward_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('resolveDispute',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkescrow.compact line 582 char 1',
                                     'Uint<0..18446744073709551616>',
                                     sellerAward_0)
        }
        if (!(typeof(buyerAward_0) === 'bigint' && buyerAward_0 >= 0n && buyerAward_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('resolveDispute',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'zkescrow.compact line 582 char 1',
                                     'Uint<0..18446744073709551616>',
                                     buyerAward_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(dealId_0).concat(_descriptor_1.toValue(sellerAward_0).concat(_descriptor_1.toValue(buyerAward_0))),
            alignment: _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._resolveDispute_0(context,
                                                partialProofData,
                                                dealId_0,
                                                sellerAward_0,
                                                buyerAward_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      proveCompletedAtLeast: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`proveCompletedAtLeast: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const minimum_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('proveCompletedAtLeast',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkescrow.compact line 625 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(minimum_0) === 'bigint' && minimum_0 >= 0n && minimum_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('proveCompletedAtLeast',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkescrow.compact line 625 char 1',
                                     'Uint<0..18446744073709551616>',
                                     minimum_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(minimum_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._proveCompletedAtLeast_0(context,
                                                       partialProofData,
                                                       minimum_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      createDeal: this.circuits.createDeal,
      addMilestone: this.circuits.addMilestone,
      acceptDeal: this.circuits.acceptDeal,
      claimArbitrator: this.circuits.claimArbitrator,
      fundDeal: this.circuits.fundDeal,
      submitMilestone: this.circuits.submitMilestone,
      approveMilestone: this.circuits.approveMilestone,
      autoReleaseMilestone: this.circuits.autoReleaseMilestone,
      requestRefund: this.circuits.requestRefund,
      approveRefund: this.circuits.approveRefund,
      claimLateRefund: this.circuits.claimLateRefund,
      cancelUnfunded: this.circuits.cancelUnfunded,
      openDispute: this.circuits.openDispute,
      submitDisputeEvidence: this.circuits.submitDisputeEvidence,
      resolveDispute: this.circuits.resolveDispute,
      proveCompletedAtLeast: this.circuits.proveCompletedAtLeast
    };
    this.provableCircuits = {
      createDeal: this.circuits.createDeal,
      addMilestone: this.circuits.addMilestone,
      acceptDeal: this.circuits.acceptDeal,
      claimArbitrator: this.circuits.claimArbitrator,
      fundDeal: this.circuits.fundDeal,
      submitMilestone: this.circuits.submitMilestone,
      approveMilestone: this.circuits.approveMilestone,
      autoReleaseMilestone: this.circuits.autoReleaseMilestone,
      requestRefund: this.circuits.requestRefund,
      approveRefund: this.circuits.approveRefund,
      claimLateRefund: this.circuits.claimLateRefund,
      cancelUnfunded: this.circuits.cancelUnfunded,
      openDispute: this.circuits.openDispute,
      submitDisputeEvidence: this.circuits.submitDisputeEvidence,
      resolveDispute: this.circuits.resolveDispute,
      proveCompletedAtLeast: this.circuits.proveCompletedAtLeast
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('createDeal', new __compactRuntime.ContractOperation());
    state_0.setOperation('addMilestone', new __compactRuntime.ContractOperation());
    state_0.setOperation('acceptDeal', new __compactRuntime.ContractOperation());
    state_0.setOperation('claimArbitrator', new __compactRuntime.ContractOperation());
    state_0.setOperation('fundDeal', new __compactRuntime.ContractOperation());
    state_0.setOperation('submitMilestone', new __compactRuntime.ContractOperation());
    state_0.setOperation('approveMilestone', new __compactRuntime.ContractOperation());
    state_0.setOperation('autoReleaseMilestone', new __compactRuntime.ContractOperation());
    state_0.setOperation('requestRefund', new __compactRuntime.ContractOperation());
    state_0.setOperation('approveRefund', new __compactRuntime.ContractOperation());
    state_0.setOperation('claimLateRefund', new __compactRuntime.ContractOperation());
    state_0.setOperation('cancelUnfunded', new __compactRuntime.ContractOperation());
    state_0.setOperation('openDispute', new __compactRuntime.ContractOperation());
    state_0.setOperation('submitDisputeEvidence', new __compactRuntime.ContractOperation());
    state_0.setOperation('resolveDispute', new __compactRuntime.ContractOperation());
    state_0.setOperation('proveCompletedAtLeast', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(0n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(1n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(2n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(3n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(4n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(5n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _left_0(value_0) {
    return { is_left: true, left: value_0, right: new Uint8Array(32) };
  }
  _right_0(value_0) {
    return { is_left: false, left: { bytes: new Uint8Array(32) }, right: value_0 };
  }
  _blockTimeLt_0(context, partialProofData, time_0) {
    return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 2 } },
                                                                      { idx: { cached: true,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_18.toValue(2n),
                                                                                                 alignment: _descriptor_18.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(time_0),
                                                                                                                             alignment: _descriptor_1.alignment() }).encode() } },
                                                                      'lt',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value);
  }
  _blockTimeGte_0(context, partialProofData, time_0) {
    return !this._blockTimeLt_0(context, partialProofData, time_0);
  }
  _blockTimeGt_0(context, partialProofData, time_0) {
    return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(time_0),
                                                                                                                             alignment: _descriptor_1.alignment() }).encode() } },
                                                                      { dup: { n: 3 } },
                                                                      { idx: { cached: true,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_18.toValue(2n),
                                                                                                 alignment: _descriptor_18.alignment() } }] } },
                                                                      'lt',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value);
  }
  _blockTimeLte_0(context, partialProofData, time_0) {
    return !this._blockTimeGt_0(context, partialProofData, time_0);
  }
  _sendUnshielded_0(context, partialProofData, color_0, amount_0, recipient_0) {
    const tmp_0 = this._left_0(color_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(7n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(tmp_0),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(amount_0),
                                                                                              alignment: _descriptor_13.alignment() }).encode() } },
                                       { swap: { n: 0 } },
                                       'neg',
                                       { branch: { skip: 4 } },
                                       { dup: { n: 2 } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: true,
                                                pushPath: false,
                                                path: [ { tag: 'stack' }] } },
                                       'add',
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    const tmp_1 = this._left_0(color_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(8n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
                                                                                              { value: _descriptor_12.toValue(tmp_1),
                                                                                                alignment: _descriptor_12.alignment() },
                                                                                              { value: _descriptor_17.toValue(recipient_0),
                                                                                                alignment: _descriptor_17.alignment() }
                                                                                            )).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(amount_0),
                                                                                              alignment: _descriptor_13.alignment() }).encode() } },
                                       { swap: { n: 0 } },
                                       'neg',
                                       { branch: { skip: 4 } },
                                       { dup: { n: 2 } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: true,
                                                pushPath: false,
                                                path: [ { tag: 'stack' }] } },
                                       'add',
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    if (recipient_0.is_left
        &&
        this._equal_0(recipient_0.left.bytes,
                      _descriptor_16.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 2 } },
                                                                                  { idx: { cached: true,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_18.toValue(0n),
                                                                                                             alignment: _descriptor_18.alignment() } }] } },
                                                                                  { popeq: { cached: true,
                                                                                             result: undefined } }]).value).bytes))
    {
      const tmp_2 = this._left_0(color_0);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_18.toValue(6n),
                                                                    alignment: _descriptor_18.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(tmp_2),
                                                                                                alignment: _descriptor_12.alignment() }).encode() } },
                                         { dup: { n: 1 } },
                                         { dup: { n: 1 } },
                                         'member',
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(amount_0),
                                                                                                alignment: _descriptor_13.alignment() }).encode() } },
                                         { swap: { n: 0 } },
                                         'neg',
                                         { branch: { skip: 4 } },
                                         { dup: { n: 2 } },
                                         { dup: { n: 2 } },
                                         { idx: { cached: true,
                                                  pushPath: false,
                                                  path: [ { tag: 'stack' }] } },
                                         'add',
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
    }
    return [];
  }
  _receiveUnshielded_0(context, partialProofData, color_0, amount_0) {
    const tmp_0 = this._left_0(color_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(6n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(tmp_0),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(amount_0),
                                                                                              alignment: _descriptor_13.alignment() }).encode() } },
                                       { swap: { n: 0 } },
                                       'neg',
                                       { branch: { skip: 4 } },
                                       { dup: { n: 2 } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: true,
                                                pushPath: false,
                                                path: [ { tag: 'stack' }] } },
                                       'add',
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    return [];
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_15, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_11, value_0);
    return result_0;
  }
  _getUserSecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.getUserSecret(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('getUserSecret',
                                 'return value',
                                 'zkescrow.compact line 73 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _deriveUserPublicKey_0(secret_0) {
    return this._persistentHash_0([new Uint8Array([122, 107, 101, 115, 99, 114, 111, 119, 58, 117, 115, 101, 114, 58, 107, 101, 121, 58, 118, 49]),
                                   secret_0]);
  }
  _inviteCommitment_0(secret_0) {
    return this._persistentHash_1([new Uint8Array([122, 107, 101, 115, 99, 114, 111, 119, 58, 105, 110, 118, 105, 116, 101, 58, 107, 101, 121, 58, 118, 49]),
                                   secret_0]);
  }
  _currentUserKey_0(context, partialProofData) {
    return this._deriveUserPublicKey_0(this._getUserSecret_0(context,
                                                             partialProofData));
  }
  _requireDeal_0(context, partialProofData, dealId_0) {
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(2n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(dealId_0),
                                                                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Escrow does not exist');
    return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_18.toValue(2n),
                                                                                                 alignment: _descriptor_18.alignment() } }] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_1.toValue(dealId_0),
                                                                                                 alignment: _descriptor_1.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
  }
  _requireBuyer_0(context, partialProofData, deal_0) {
    __compactRuntime.assert(this._equal_1(deal_0.buyerKey,
                                          this._currentUserKey_0(context,
                                                                 partialProofData)),
                            'Only the buyer can perform this action');
    return [];
  }
  _requireSeller_0(context, partialProofData, deal_0) {
    __compactRuntime.assert(this._equal_2(deal_0.sellerKey,
                                          this._currentUserKey_0(context,
                                                                 partialProofData)),
                            'Only the seller can perform this action');
    return [];
  }
  _requireArbitrator_0(context, partialProofData, deal_0) {
    __compactRuntime.assert(this._equal_3(deal_0.arbitratorKey,
                                          this._currentUserKey_0(context,
                                                                 partialProofData)),
                            'Only the arbitrator can perform this action');
    return [];
  }
  _updatedDeal_0(deal_0,
                 sellerKey_0,
                 arbitratorKey_0,
                 sellerPayout_0,
                 plannedAmount_0,
                 fundedAmount_0,
                 releasedAmount_0,
                 refundedAmount_0,
                 milestoneCount_0,
                 paidMilestoneCount_0,
                 settledMilestoneCount_0,
                 status_0,
                 refundRequested_0)
  {
    return { buyerKey: deal_0.buyerKey,
             sellerKey: sellerKey_0,
             arbitratorKey: arbitratorKey_0,
             sellerInviteCommitment: deal_0.sellerInviteCommitment,
             arbitratorInviteCommitment: deal_0.arbitratorInviteCommitment,
             buyerPayout: deal_0.buyerPayout,
             sellerPayout: sellerPayout_0,
             amount: deal_0.amount,
             plannedAmount: plannedAmount_0,
             fundedAmount: fundedAmount_0,
             releasedAmount: releasedAmount_0,
             refundedAmount: refundedAmount_0,
             milestoneCount: milestoneCount_0,
             paidMilestoneCount: paidMilestoneCount_0,
             settledMilestoneCount: settledMilestoneCount_0,
             deadline: deal_0.deadline,
             metadataCommitment: deal_0.metadataCommitment,
             status: status_0,
             refundRequested: refundRequested_0 };
  }
  _createDeal_0(context,
                partialProofData,
                amount_0,
                deadline_0,
                metadataCommitment_0,
                sellerInviteSecret_0,
                arbitratorInviteSecret_0,
                buyerPayout_0)
  {
    __compactRuntime.assert(amount_0 > 0n,
                            'Escrow amount must be greater than zero');
    const publicDeadline_0 = deadline_0;
    __compactRuntime.assert(this._blockTimeLt_0(context,
                                                partialProofData,
                                                publicDeadline_0),
                            'Deadline must be in the future');
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_5.toValue(tmp_0),
                                                                alignment: _descriptor_5.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    const id_0 = _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                           partialProofData,
                                                                           [
                                                                            { dup: { n: 0 } },
                                                                            { idx: { cached: false,
                                                                                     pushPath: false,
                                                                                     path: [
                                                                                            { tag: 'value',
                                                                                              value: { value: _descriptor_18.toValue(0n),
                                                                                                       alignment: _descriptor_18.alignment() } }] } },
                                                                            { popeq: { cached: true,
                                                                                       result: undefined } }]).value);
    const deal_0 = { buyerKey: this._currentUserKey_0(context, partialProofData),
                     sellerKey: new Uint8Array(32),
                     arbitratorKey: new Uint8Array(32),
                     sellerInviteCommitment:
                       this._inviteCommitment_0(sellerInviteSecret_0),
                     arbitratorInviteCommitment:
                       this._inviteCommitment_0(arbitratorInviteSecret_0),
                     buyerPayout: buyerPayout_0,
                     sellerPayout: { bytes: new Uint8Array(32) },
                     amount: amount_0,
                     plannedAmount: 0n,
                     fundedAmount: 0n,
                     releasedAmount: 0n,
                     refundedAmount: 0n,
                     milestoneCount: 0n,
                     paidMilestoneCount: 0n,
                     settledMilestoneCount: 0n,
                     deadline: publicDeadline_0,
                     metadataCommitment: metadataCommitment_0,
                     status: 0,
                     refundRequested: false };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(deal_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(3n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return id_0;
  }
  _addMilestone_0(context,
                  partialProofData,
                  dealId_0,
                  amount_0,
                  deliveryDeadline_0,
                  reviewDeadline_0,
                  labelCommitment_0)
  {
    const id_0 = dealId_0;
    const deal_0 = this._requireDeal_0(context, partialProofData, id_0);
    this._requireBuyer_0(context, partialProofData, deal_0);
    __compactRuntime.assert(deal_0.status === 0,
                            'Milestones are locked after acceptance');
    __compactRuntime.assert(amount_0 > 0n,
                            'Milestone amount must be greater than zero');
    __compactRuntime.assert(this._blockTimeLt_0(context,
                                                partialProofData,
                                                deliveryDeadline_0),
                            'Delivery deadline must be in the future');
    __compactRuntime.assert(deliveryDeadline_0 < reviewDeadline_0,
                            'Review deadline must follow delivery deadline');
    __compactRuntime.assert(reviewDeadline_0 <= deal_0.deadline,
                            'Milestone review deadline exceeds deal deadline');
    let t_0;
    __compactRuntime.assert((t_0 = deal_0.milestoneCount, t_0 < 12n),
                            'A deal supports at most 12 milestones');
    let t_2, t_3, t_1;
    __compactRuntime.assert((t_2 = amount_0,
                             t_2
                             <=
                             (t_3 = deal_0.amount,
                              (t_1 = deal_0.plannedAmount,
                               (__compactRuntime.assert(t_3 >= t_1,
                                                        'result of subtraction would be negative'),
                                t_3 - t_1)))),
                            'Milestone total exceeds escrow amount');
    const milestoneId_0 = ((t1) => {
                            if (t1 > 65535n) {
                              throw new __compactRuntime.CompactError('zkescrow.compact line 208 char 25: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                            }
                            return t1;
                          })(deal_0.milestoneCount + 1n);
    const milestone_0 = { amount: amount_0,
                          deliveryDeadline: deliveryDeadline_0,
                          reviewDeadline: reviewDeadline_0,
                          labelCommitment: labelCommitment_0,
                          deliveryCommitment: new Uint8Array(32),
                          status: 0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(3n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(id_0),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(milestoneId_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(milestone_0),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_0 = this._updatedDeal_0(deal_0,
                                      deal_0.sellerKey,
                                      deal_0.arbitratorKey,
                                      deal_0.sellerPayout,
                                      ((t1) => {
                                        if (t1 > 18446744073709551615n) {
                                          throw new __compactRuntime.CompactError('zkescrow.compact line 223 char 9: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                        }
                                        return t1;
                                      })(deal_0.plannedAmount + amount_0),
                                      deal_0.fundedAmount,
                                      deal_0.releasedAmount,
                                      deal_0.refundedAmount,
                                      milestoneId_0,
                                      deal_0.paidMilestoneCount,
                                      deal_0.settledMilestoneCount,
                                      deal_0.status,
                                      deal_0.refundRequested);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return milestoneId_0;
  }
  _acceptDeal_0(context, partialProofData, dealId_0, inviteSecret_0, payout_0) {
    const id_0 = dealId_0;
    const deal_0 = this._requireDeal_0(context, partialProofData, id_0);
    __compactRuntime.assert(deal_0.status === 0,
                            'Escrow is not awaiting seller acceptance');
    __compactRuntime.assert(this._blockTimeLt_0(context,
                                                partialProofData,
                                                deal_0.deadline),
                            'Escrow deadline has passed');
    let t_0;
    __compactRuntime.assert((t_0 = deal_0.milestoneCount, t_0 > 0n),
                            'Escrow needs at least one milestone');
    __compactRuntime.assert(this._equal_4(deal_0.plannedAmount, deal_0.amount),
                            'Milestones must equal the escrow amount');
    __compactRuntime.assert(this._equal_5(this._inviteCommitment_0(inviteSecret_0),
                                          deal_0.sellerInviteCommitment),
                            'Invalid seller invitation');
    __compactRuntime.assert(!this._equal_6(this._currentUserKey_0(context,
                                                                  partialProofData),
                                           deal_0.buyerKey),
                            'The buyer cannot accept as seller');
    __compactRuntime.assert(!this._equal_7(this._currentUserKey_0(context,
                                                                  partialProofData),
                                           deal_0.arbitratorKey),
                            'The arbitrator cannot accept as seller');
    const tmp_0 = this._updatedDeal_0(deal_0,
                                      this._currentUserKey_0(context,
                                                             partialProofData),
                                      deal_0.arbitratorKey,
                                      payout_0,
                                      deal_0.plannedAmount,
                                      deal_0.fundedAmount,
                                      deal_0.releasedAmount,
                                      deal_0.refundedAmount,
                                      deal_0.milestoneCount,
                                      deal_0.paidMilestoneCount,
                                      deal_0.settledMilestoneCount,
                                      1,
                                      false);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _claimArbitrator_0(context, partialProofData, dealId_0, inviteSecret_0) {
    const id_0 = dealId_0;
    const deal_0 = this._requireDeal_0(context, partialProofData, id_0);
    __compactRuntime.assert(deal_0.status !== 5 && deal_0.status !== 6
                            &&
                            deal_0.status !== 7
                            &&
                            deal_0.status !== 8,
                            'Escrow is already closed');
    __compactRuntime.assert(this._equal_8(this._inviteCommitment_0(inviteSecret_0),
                                          deal_0.arbitratorInviteCommitment),
                            'Invalid arbitrator invitation');
    __compactRuntime.assert(this._equal_9(deal_0.arbitratorKey,
                                          new Uint8Array(32)),
                            'Arbitrator already claimed');
    __compactRuntime.assert(!this._equal_10(this._currentUserKey_0(context,
                                                                   partialProofData),
                                            deal_0.buyerKey)
                            &&
                            !this._equal_11(this._currentUserKey_0(context,
                                                                   partialProofData),
                                            deal_0.sellerKey),
                            'A deal participant cannot be the arbitrator');
    const tmp_0 = this._updatedDeal_0(deal_0,
                                      deal_0.sellerKey,
                                      this._currentUserKey_0(context,
                                                             partialProofData),
                                      deal_0.sellerPayout,
                                      deal_0.plannedAmount,
                                      deal_0.fundedAmount,
                                      deal_0.releasedAmount,
                                      deal_0.refundedAmount,
                                      deal_0.milestoneCount,
                                      deal_0.paidMilestoneCount,
                                      deal_0.settledMilestoneCount,
                                      deal_0.status,
                                      deal_0.refundRequested);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _fundDeal_0(context, partialProofData, dealId_0, amount_0) {
    const id_0 = dealId_0;
    const deal_0 = this._requireDeal_0(context, partialProofData, id_0);
    this._requireBuyer_0(context, partialProofData, deal_0);
    __compactRuntime.assert(deal_0.status === 1,
                            'Seller must accept before funding');
    __compactRuntime.assert(this._blockTimeLt_0(context,
                                                partialProofData,
                                                deal_0.deadline),
                            'Escrow deadline has passed');
    __compactRuntime.assert(this._equal_12(amount_0, deal_0.amount),
                            'Funding must match the escrow amount');
    this._receiveUnshielded_0(context,
                              partialProofData,
                              new Uint8Array(32),
                              amount_0);
    const tmp_0 = this._updatedDeal_0(deal_0,
                                      deal_0.sellerKey,
                                      deal_0.arbitratorKey,
                                      deal_0.sellerPayout,
                                      deal_0.plannedAmount,
                                      amount_0,
                                      deal_0.releasedAmount,
                                      deal_0.refundedAmount,
                                      deal_0.milestoneCount,
                                      deal_0.paidMilestoneCount,
                                      deal_0.settledMilestoneCount,
                                      2,
                                      false);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _submitMilestone_0(context,
                     partialProofData,
                     dealId_0,
                     milestoneId_0,
                     deliveryCommitment_0)
  {
    const id_0 = dealId_0;
    const mid_0 = milestoneId_0;
    const deal_0 = this._requireDeal_0(context, partialProofData, id_0);
    this._requireSeller_0(context, partialProofData, deal_0);
    __compactRuntime.assert(deal_0.status === 2 || deal_0.status === 3,
                            'Escrow is not active');
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(3n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_1.toValue(id_0),
                                                                                                                  alignment: _descriptor_1.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(mid_0),
                                                                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Milestone does not exist');
    const milestone_0 = _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_18.toValue(3n),
                                                                                                              alignment: _descriptor_18.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_1.toValue(id_0),
                                                                                                              alignment: _descriptor_1.alignment() } }] } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_5.toValue(mid_0),
                                                                                                              alignment: _descriptor_5.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value);
    __compactRuntime.assert(milestone_0.status === 0,
                            'Milestone was already submitted');
    __compactRuntime.assert(this._blockTimeLte_0(context,
                                                 partialProofData,
                                                 milestone_0.deliveryDeadline),
                            'Delivery deadline has passed');
    const tmp_0 = { amount: milestone_0.amount,
                    deliveryDeadline: milestone_0.deliveryDeadline,
                    reviewDeadline: milestone_0.reviewDeadline,
                    labelCommitment: milestone_0.labelCommitment,
                    deliveryCommitment: deliveryCommitment_0,
                    status: 1 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(3n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(id_0),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(mid_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(tmp_0),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_1 = this._updatedDeal_0(deal_0,
                                      deal_0.sellerKey,
                                      deal_0.arbitratorKey,
                                      deal_0.sellerPayout,
                                      deal_0.plannedAmount,
                                      deal_0.fundedAmount,
                                      deal_0.releasedAmount,
                                      deal_0.refundedAmount,
                                      deal_0.milestoneCount,
                                      deal_0.paidMilestoneCount,
                                      deal_0.settledMilestoneCount,
                                      3,
                                      false);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_1),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _payMilestone_0(context,
                  partialProofData,
                  dealId_0,
                  milestoneId_0,
                  deal_0,
                  milestone_0)
  {
    this._sendUnshielded_0(context,
                           partialProofData,
                           new Uint8Array(32),
                           milestone_0.amount,
                           this._right_0(deal_0.sellerPayout));
    const tmp_0 = { amount: milestone_0.amount,
                    deliveryDeadline: milestone_0.deliveryDeadline,
                    reviewDeadline: milestone_0.reviewDeadline,
                    labelCommitment: milestone_0.labelCommitment,
                    deliveryCommitment: milestone_0.deliveryCommitment,
                    status: 2 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(3n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(dealId_0),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(milestoneId_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(tmp_0),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const nextPaidCount_0 = ((t1) => {
                              if (t1 > 65535n) {
                                throw new __compactRuntime.CompactError('zkescrow.compact line 368 char 27: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                              }
                              return t1;
                            })(deal_0.paidMilestoneCount + 1n);
    const nextSettledCount_0 = ((t1) => {
                                 if (t1 > 65535n) {
                                   throw new __compactRuntime.CompactError('zkescrow.compact line 369 char 30: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                 }
                                 return t1;
                               })(deal_0.settledMilestoneCount + 1n);
    const allSettled_0 = this._equal_13(nextSettledCount_0,
                                        deal_0.milestoneCount);
    const fullyCompleted_0 = this._equal_14(nextPaidCount_0,
                                            deal_0.milestoneCount);
    if (fullyCompleted_0) {
      const tmp_1 = 1n;
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_18.toValue(1n),
                                                                    alignment: _descriptor_18.alignment() } }] } },
                                         { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                                { value: _descriptor_5.toValue(tmp_1),
                                                                  alignment: _descriptor_5.alignment() }
                                                                  .value
                                                              )) } },
                                         { ins: { cached: true, n: 1 } }]);
      let tmp_2;
      if (tmp_2 = deal_0.sellerKey,
          _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_18.toValue(5n),
                                                                                                alignment: _descriptor_18.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_2),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value))
      {
        let t_0, tmp_3;
        __compactRuntime.assert((t_0 = (tmp_3 = deal_0.sellerKey,
                                        _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                  partialProofData,
                                                                                                  [
                                                                                                   { dup: { n: 0 } },
                                                                                                   { idx: { cached: false,
                                                                                                            pushPath: false,
                                                                                                            path: [
                                                                                                                   { tag: 'value',
                                                                                                                     value: { value: _descriptor_18.toValue(5n),
                                                                                                                              alignment: _descriptor_18.alignment() } }] } },
                                                                                                   { idx: { cached: false,
                                                                                                            pushPath: false,
                                                                                                            path: [
                                                                                                                   { tag: 'value',
                                                                                                                     value: { value: _descriptor_0.toValue(tmp_3),
                                                                                                                              alignment: _descriptor_0.alignment() } }] } },
                                                                                                   { popeq: { cached: false,
                                                                                                              result: undefined } }]).value)),
                                 t_0 < 18446744073709551615n),
                                'Seller reputation counter overflow');
        const tmp_4 = deal_0.sellerKey;
        let tmp_5;
        const tmp_6 = ((t1) => {
                        if (t1 > 18446744073709551615n) {
                          throw new __compactRuntime.CompactError('zkescrow.compact line 376 char 54: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                        }
                        return t1;
                      })((tmp_5 = deal_0.sellerKey,
                          _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                    partialProofData,
                                                                                    [
                                                                                     { dup: { n: 0 } },
                                                                                     { idx: { cached: false,
                                                                                              pushPath: false,
                                                                                              path: [
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_18.toValue(5n),
                                                                                                                alignment: _descriptor_18.alignment() } }] } },
                                                                                     { idx: { cached: false,
                                                                                              pushPath: false,
                                                                                              path: [
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_0.toValue(tmp_5),
                                                                                                                alignment: _descriptor_0.alignment() } }] } },
                                                                                     { popeq: { cached: false,
                                                                                                result: undefined } }]).value))
                         +
                         1n);
        __compactRuntime.queryLedgerState(context,
                                          partialProofData,
                                          [
                                           { idx: { cached: false,
                                                    pushPath: true,
                                                    path: [
                                                           { tag: 'value',
                                                             value: { value: _descriptor_18.toValue(5n),
                                                                      alignment: _descriptor_18.alignment() } }] } },
                                           { push: { storage: false,
                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_4),
                                                                                                  alignment: _descriptor_0.alignment() }).encode() } },
                                           { push: { storage: true,
                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_6),
                                                                                                  alignment: _descriptor_1.alignment() }).encode() } },
                                           { ins: { cached: false, n: 1 } },
                                           { ins: { cached: true, n: 1 } }]);
      } else {
        const tmp_7 = deal_0.sellerKey;
        const tmp_8 = 1n;
        __compactRuntime.queryLedgerState(context,
                                          partialProofData,
                                          [
                                           { idx: { cached: false,
                                                    pushPath: true,
                                                    path: [
                                                           { tag: 'value',
                                                             value: { value: _descriptor_18.toValue(5n),
                                                                      alignment: _descriptor_18.alignment() } }] } },
                                           { push: { storage: false,
                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_7),
                                                                                                  alignment: _descriptor_0.alignment() }).encode() } },
                                           { push: { storage: true,
                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_8),
                                                                                                  alignment: _descriptor_1.alignment() }).encode() } },
                                           { ins: { cached: false, n: 1 } },
                                           { ins: { cached: true, n: 1 } }]);
      }
    }
    const tmp_9 = this._updatedDeal_0(deal_0,
                                      deal_0.sellerKey,
                                      deal_0.arbitratorKey,
                                      deal_0.sellerPayout,
                                      deal_0.plannedAmount,
                                      deal_0.fundedAmount,
                                      ((t1) => {
                                        if (t1 > 18446744073709551615n) {
                                          throw new __compactRuntime.CompactError('zkescrow.compact line 389 char 9: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                        }
                                        return t1;
                                      })(deal_0.releasedAmount
                                         +
                                         milestone_0.amount),
                                      deal_0.refundedAmount,
                                      deal_0.milestoneCount,
                                      nextPaidCount_0,
                                      nextSettledCount_0,
                                      allSettled_0 ?
                                      fullyCompleted_0 ? 5 : 8 :
                                      3,
                                      false);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(dealId_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_9),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _approveMilestone_0(context, partialProofData, dealId_0, milestoneId_0) {
    const id_0 = dealId_0;
    const mid_0 = milestoneId_0;
    const deal_0 = this._requireDeal_0(context, partialProofData, id_0);
    this._requireBuyer_0(context, partialProofData, deal_0);
    __compactRuntime.assert(deal_0.status === 3,
                            'Escrow is not awaiting approval');
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(3n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_1.toValue(id_0),
                                                                                                                  alignment: _descriptor_1.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(mid_0),
                                                                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Milestone does not exist');
    const milestone_0 = _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_18.toValue(3n),
                                                                                                              alignment: _descriptor_18.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_1.toValue(id_0),
                                                                                                              alignment: _descriptor_1.alignment() } }] } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_5.toValue(mid_0),
                                                                                                              alignment: _descriptor_5.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value);
    __compactRuntime.assert(milestone_0.status === 1,
                            'Milestone is not awaiting approval');
    this._payMilestone_0(context,
                         partialProofData,
                         id_0,
                         mid_0,
                         deal_0,
                         milestone_0);
    return [];
  }
  _autoReleaseMilestone_0(context, partialProofData, dealId_0, milestoneId_0) {
    const id_0 = dealId_0;
    const mid_0 = milestoneId_0;
    const deal_0 = this._requireDeal_0(context, partialProofData, id_0);
    this._requireSeller_0(context, partialProofData, deal_0);
    __compactRuntime.assert(deal_0.status === 3,
                            'Escrow is not awaiting approval');
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(3n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_1.toValue(id_0),
                                                                                                                  alignment: _descriptor_1.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(mid_0),
                                                                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Milestone does not exist');
    const milestone_0 = _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_18.toValue(3n),
                                                                                                              alignment: _descriptor_18.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_1.toValue(id_0),
                                                                                                              alignment: _descriptor_1.alignment() } }] } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_5.toValue(mid_0),
                                                                                                              alignment: _descriptor_5.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value);
    __compactRuntime.assert(milestone_0.status === 1,
                            'Milestone is not awaiting approval');
    __compactRuntime.assert(this._blockTimeGte_0(context,
                                                 partialProofData,
                                                 milestone_0.reviewDeadline),
                            'Review window is still open');
    this._payMilestone_0(context,
                         partialProofData,
                         id_0,
                         mid_0,
                         deal_0,
                         milestone_0);
    return [];
  }
  _requestRefund_0(context, partialProofData, dealId_0) {
    const id_0 = dealId_0;
    const deal_0 = this._requireDeal_0(context, partialProofData, id_0);
    this._requireBuyer_0(context, partialProofData, deal_0);
    __compactRuntime.assert(deal_0.status === 2 || deal_0.status === 3,
                            'Escrow cannot be refunded now');
    const tmp_0 = this._updatedDeal_0(deal_0,
                                      deal_0.sellerKey,
                                      deal_0.arbitratorKey,
                                      deal_0.sellerPayout,
                                      deal_0.plannedAmount,
                                      deal_0.fundedAmount,
                                      deal_0.releasedAmount,
                                      deal_0.refundedAmount,
                                      deal_0.milestoneCount,
                                      deal_0.paidMilestoneCount,
                                      deal_0.settledMilestoneCount,
                                      deal_0.status,
                                      true);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _approveRefund_0(context, partialProofData, dealId_0) {
    const id_0 = dealId_0;
    const deal_0 = this._requireDeal_0(context, partialProofData, id_0);
    this._requireSeller_0(context, partialProofData, deal_0);
    __compactRuntime.assert(deal_0.refundRequested,
                            'Buyer has not requested a refund');
    let t_2, t_3, t_0, t_1;
    const remaining_0 = (t_2 = (t_0 = deal_0.fundedAmount,
                                (t_1 = deal_0.releasedAmount,
                                 (__compactRuntime.assert(t_0 >= t_1,
                                                          'result of subtraction would be negative'),
                                  t_0 - t_1))),
                         (t_3 = deal_0.refundedAmount,
                          (__compactRuntime.assert(t_2 >= t_3,
                                                   'result of subtraction would be negative'),
                           t_2 - t_3)));
    this._sendUnshielded_0(context,
                           partialProofData,
                           new Uint8Array(32),
                           remaining_0,
                           this._right_0(deal_0.buyerPayout));
    const tmp_0 = this._updatedDeal_0(deal_0,
                                      deal_0.sellerKey,
                                      deal_0.arbitratorKey,
                                      deal_0.sellerPayout,
                                      deal_0.plannedAmount,
                                      deal_0.fundedAmount,
                                      deal_0.releasedAmount,
                                      ((t1) => {
                                        if (t1 > 18446744073709551615n) {
                                          throw new __compactRuntime.CompactError('zkescrow.compact line 461 char 9: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                        }
                                        return t1;
                                      })(deal_0.refundedAmount + remaining_0),
                                      deal_0.milestoneCount,
                                      deal_0.paidMilestoneCount,
                                      deal_0.settledMilestoneCount,
                                      7,
                                      false);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _claimLateRefund_0(context, partialProofData, dealId_0, milestoneId_0) {
    const id_0 = dealId_0;
    const mid_0 = milestoneId_0;
    const deal_0 = this._requireDeal_0(context, partialProofData, id_0);
    this._requireBuyer_0(context, partialProofData, deal_0);
    __compactRuntime.assert(deal_0.status === 2 || deal_0.status === 3,
                            'Escrow cannot be refunded now');
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(3n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_1.toValue(id_0),
                                                                                                                  alignment: _descriptor_1.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(mid_0),
                                                                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Milestone does not exist');
    const milestone_0 = _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_18.toValue(3n),
                                                                                                              alignment: _descriptor_18.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_1.toValue(id_0),
                                                                                                              alignment: _descriptor_1.alignment() } }] } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_5.toValue(mid_0),
                                                                                                              alignment: _descriptor_5.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value);
    __compactRuntime.assert(milestone_0.status === 0,
                            'Seller already submitted this milestone');
    __compactRuntime.assert(this._blockTimeGt_0(context,
                                                partialProofData,
                                                milestone_0.deliveryDeadline),
                            'Delivery deadline has not passed');
    this._sendUnshielded_0(context,
                           partialProofData,
                           new Uint8Array(32),
                           milestone_0.amount,
                           this._right_0(deal_0.buyerPayout));
    const tmp_0 = { amount: milestone_0.amount,
                    deliveryDeadline: milestone_0.deliveryDeadline,
                    reviewDeadline: milestone_0.reviewDeadline,
                    labelCommitment: milestone_0.labelCommitment,
                    deliveryCommitment: milestone_0.deliveryCommitment,
                    status: 3 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(3n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_1.toValue(id_0),
                                                                  alignment: _descriptor_1.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(mid_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(tmp_0),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const nextRefunded_0 = ((t1) => {
                             if (t1 > 18446744073709551615n) {
                               throw new __compactRuntime.CompactError('zkescrow.compact line 489 char 26: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                             }
                             return t1;
                           })(deal_0.refundedAmount + milestone_0.amount);
    const nextSettled_0 = ((t1) => {
                            if (t1 > 65535n) {
                              throw new __compactRuntime.CompactError('zkescrow.compact line 490 char 25: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                            }
                            return t1;
                          })(deal_0.settledMilestoneCount + 1n);
    const allSettled_0 = this._equal_15(nextSettled_0, deal_0.milestoneCount);
    const fullyRefunded_0 = this._equal_16(nextRefunded_0, deal_0.fundedAmount);
    const tmp_1 = this._updatedDeal_0(deal_0,
                                      deal_0.sellerKey,
                                      deal_0.arbitratorKey,
                                      deal_0.sellerPayout,
                                      deal_0.plannedAmount,
                                      deal_0.fundedAmount,
                                      deal_0.releasedAmount,
                                      nextRefunded_0,
                                      deal_0.milestoneCount,
                                      deal_0.paidMilestoneCount,
                                      nextSettled_0,
                                      allSettled_0 ? fullyRefunded_0 ? 7 : 8 : 3,
                                      false);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_1),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _cancelUnfunded_0(context, partialProofData, dealId_0) {
    const id_0 = dealId_0;
    const deal_0 = this._requireDeal_0(context, partialProofData, id_0);
    this._requireBuyer_0(context, partialProofData, deal_0);
    __compactRuntime.assert(deal_0.status === 0 || deal_0.status === 1,
                            'Funded escrow cannot be cancelled directly');
    const tmp_0 = this._updatedDeal_0(deal_0,
                                      deal_0.sellerKey,
                                      deal_0.arbitratorKey,
                                      deal_0.sellerPayout,
                                      deal_0.plannedAmount,
                                      deal_0.fundedAmount,
                                      deal_0.releasedAmount,
                                      deal_0.refundedAmount,
                                      deal_0.milestoneCount,
                                      deal_0.paidMilestoneCount,
                                      deal_0.settledMilestoneCount,
                                      6,
                                      false);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _openDispute_0(context, partialProofData, dealId_0, evidenceCommitment_0) {
    const id_0 = dealId_0;
    const deal_0 = this._requireDeal_0(context, partialProofData, id_0);
    const user_0 = this._currentUserKey_0(context, partialProofData);
    __compactRuntime.assert(this._equal_17(user_0, deal_0.buyerKey)
                            ||
                            this._equal_18(user_0, deal_0.sellerKey),
                            'Only a deal participant can open a dispute');
    __compactRuntime.assert(deal_0.status === 2 || deal_0.status === 3,
                            'Escrow cannot be disputed now');
    __compactRuntime.assert(!this._equal_19(deal_0.arbitratorKey,
                                            new Uint8Array(32)),
                            'An arbitrator must claim the invitation before a dispute can open');
    const evidence_0 = evidenceCommitment_0;
    const tmp_0 = { buyerEvidence:
                      this._equal_20(user_0, deal_0.buyerKey) ?
                      evidence_0 :
                      new Uint8Array(32),
                    sellerEvidence:
                      this._equal_21(user_0, deal_0.sellerKey) ?
                      evidence_0 :
                      new Uint8Array(32),
                    resolved: false,
                    sellerAward: 0n,
                    buyerAward: 0n };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(4n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = this._updatedDeal_0(deal_0,
                                      deal_0.sellerKey,
                                      deal_0.arbitratorKey,
                                      deal_0.sellerPayout,
                                      deal_0.plannedAmount,
                                      deal_0.fundedAmount,
                                      deal_0.releasedAmount,
                                      deal_0.refundedAmount,
                                      deal_0.milestoneCount,
                                      deal_0.paidMilestoneCount,
                                      deal_0.settledMilestoneCount,
                                      4,
                                      false);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_1),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _submitDisputeEvidence_0(context,
                           partialProofData,
                           dealId_0,
                           evidenceCommitment_0)
  {
    const id_0 = dealId_0;
    const deal_0 = this._requireDeal_0(context, partialProofData, id_0);
    const user_0 = this._currentUserKey_0(context, partialProofData);
    __compactRuntime.assert(deal_0.status === 4, 'Escrow is not disputed');
    __compactRuntime.assert(this._equal_22(user_0, deal_0.buyerKey)
                            ||
                            this._equal_23(user_0, deal_0.sellerKey),
                            'Only a deal participant can submit evidence');
    const dispute_0 = _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_18.toValue(4n),
                                                                                                            alignment: _descriptor_18.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_1.toValue(id_0),
                                                                                                            alignment: _descriptor_1.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    const evidence_0 = evidenceCommitment_0;
    const tmp_0 = { buyerEvidence:
                      this._equal_24(user_0, deal_0.buyerKey) ?
                      evidence_0 :
                      dispute_0.buyerEvidence,
                    sellerEvidence:
                      this._equal_25(user_0, deal_0.sellerKey) ?
                      evidence_0 :
                      dispute_0.sellerEvidence,
                    resolved: false,
                    sellerAward: 0n,
                    buyerAward: 0n };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(4n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _resolveDispute_0(context,
                    partialProofData,
                    dealId_0,
                    sellerAward_0,
                    buyerAward_0)
  {
    const id_0 = dealId_0;
    const deal_0 = this._requireDeal_0(context, partialProofData, id_0);
    this._requireArbitrator_0(context, partialProofData, deal_0);
    __compactRuntime.assert(deal_0.status === 4, 'Escrow is not disputed');
    let t_2, t_3, t_0, t_1;
    const remaining_0 = (t_2 = (t_0 = deal_0.fundedAmount,
                                (t_1 = deal_0.releasedAmount,
                                 (__compactRuntime.assert(t_0 >= t_1,
                                                          'result of subtraction would be negative'),
                                  t_0 - t_1))),
                         (t_3 = deal_0.refundedAmount,
                          (__compactRuntime.assert(t_2 >= t_3,
                                                   'result of subtraction would be negative'),
                           t_2 - t_3)));
    const publicSellerAward_0 = sellerAward_0;
    const publicBuyerAward_0 = buyerAward_0;
    __compactRuntime.assert(publicSellerAward_0 <= remaining_0
                            &&
                            publicBuyerAward_0 <= remaining_0,
                            'Award exceeds the remaining escrow balance');
    __compactRuntime.assert(this._equal_26(publicSellerAward_0,
                                           (__compactRuntime.assert(remaining_0
                                                                    >=
                                                                    publicBuyerAward_0,
                                                                    'result of subtraction would be negative'),
                                            remaining_0 - publicBuyerAward_0)),
                            'Awards must equal the remaining escrow balance');
    if (publicSellerAward_0 > 0n) {
      this._sendUnshielded_0(context,
                             partialProofData,
                             new Uint8Array(32),
                             publicSellerAward_0,
                             this._right_0(deal_0.sellerPayout));
    }
    if (publicBuyerAward_0 > 0n) {
      this._sendUnshielded_0(context,
                             partialProofData,
                             new Uint8Array(32),
                             publicBuyerAward_0,
                             this._right_0(deal_0.buyerPayout));
    }
    const dispute_0 = _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_18.toValue(4n),
                                                                                                            alignment: _descriptor_18.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_1.toValue(id_0),
                                                                                                            alignment: _descriptor_1.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    const tmp_0 = { buyerEvidence: dispute_0.buyerEvidence,
                    sellerEvidence: dispute_0.sellerEvidence,
                    resolved: true,
                    sellerAward: publicSellerAward_0,
                    buyerAward: publicBuyerAward_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(4n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = this._updatedDeal_0(deal_0,
                                      deal_0.sellerKey,
                                      deal_0.arbitratorKey,
                                      deal_0.sellerPayout,
                                      deal_0.plannedAmount,
                                      deal_0.fundedAmount,
                                      ((t1) => {
                                        if (t1 > 18446744073709551615n) {
                                          throw new __compactRuntime.CompactError('zkescrow.compact line 615 char 9: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                        }
                                        return t1;
                                      })(deal_0.releasedAmount
                                         +
                                         publicSellerAward_0),
                                      ((t1) => {
                                        if (t1 > 18446744073709551615n) {
                                          throw new __compactRuntime.CompactError('zkescrow.compact line 616 char 9: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                        }
                                        return t1;
                                      })(deal_0.refundedAmount
                                         +
                                         publicBuyerAward_0),
                                      deal_0.milestoneCount,
                                      deal_0.paidMilestoneCount,
                                      deal_0.settledMilestoneCount,
                                      8,
                                      false);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(id_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_1),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _proveCompletedAtLeast_0(context, partialProofData, minimum_0) {
    __compactRuntime.assert(minimum_0 > 0n,
                            'Minimum reputation must be greater than zero');
    const sellerKey_0 = this._currentUserKey_0(context, partialProofData);
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(5n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(sellerKey_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'No completed escrow history');
    let t_0;
    __compactRuntime.assert((t_0 = _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                             partialProofData,
                                                                                             [
                                                                                              { dup: { n: 0 } },
                                                                                              { idx: { cached: false,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_18.toValue(5n),
                                                                                                                         alignment: _descriptor_18.alignment() } }] } },
                                                                                              { idx: { cached: false,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_0.toValue(sellerKey_0),
                                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                                              { popeq: { cached: false,
                                                                                                         result: undefined } }]).value),
                             t_0 >= minimum_0),
                            'Reputation threshold is not met');
    return true;
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_9(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_10(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_11(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_12(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_13(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_14(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_15(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_16(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_17(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_18(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_19(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_20(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_21(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_22(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_23(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_24(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_25(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_26(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get dealCount() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_18.toValue(0n),
                                                                                                   alignment: _descriptor_18.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    get completedDealCount() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_18.toValue(1n),
                                                                                                   alignment: _descriptor_18.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    deals: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(2n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(2n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'zkescrow.compact line 68 char 1',
                                     'Uint<0..18446744073709551616>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(2n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_0),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'zkescrow.compact line 68 char 1',
                                     'Uint<0..18446744073709551616>',
                                     key_0)
        }
        return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(2n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(key_0),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_1.fromValue(key.value),      _descriptor_7.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    milestones: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(3n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(3n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'zkescrow.compact line 69 char 1',
                                     'Uint<0..18446744073709551616>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(3n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_0),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'zkescrow.compact line 69 char 1',
                                     'Uint<0..18446744073709551616>',
                                     key_0)
        }
        if (state.asArray()[3].asMap().get({ value: _descriptor_1.toValue(key_0),
                                             alignment: _descriptor_1.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_18.toValue(3n),
                                                                                                         alignment: _descriptor_18.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_1.toValue(key_0),
                                                                                                         alignment: _descriptor_1.alignment() } }] } },
                                                                              'size',
                                                                              { push: { storage: false,
                                                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                     alignment: _descriptor_1.alignment() }).encode() } },
                                                                              'eq',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_18.toValue(3n),
                                                                                                         alignment: _descriptor_18.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_1.toValue(key_0),
                                                                                                         alignment: _descriptor_1.alignment() } }] } },
                                                                              'size',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0n && key_1 <= 65535n)) {
              __compactRuntime.typeError('member',
                                         'argument 1',
                                         'zkescrow.compact line 69 char 41',
                                         'Uint<0..65536>',
                                         key_1)
            }
            return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_18.toValue(3n),
                                                                                                         alignment: _descriptor_18.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_1.toValue(key_0),
                                                                                                         alignment: _descriptor_1.alignment() } }] } },
                                                                              { push: { storage: false,
                                                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(key_1),
                                                                                                                                     alignment: _descriptor_5.alignment() }).encode() } },
                                                                              'member',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          lookup(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0n && key_1 <= 65535n)) {
              __compactRuntime.typeError('lookup',
                                         'argument 1',
                                         'zkescrow.compact line 69 char 41',
                                         'Uint<0..65536>',
                                         key_1)
            }
            return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_18.toValue(3n),
                                                                                                         alignment: _descriptor_18.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_1.toValue(key_0),
                                                                                                         alignment: _descriptor_1.alignment() } }] } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_5.toValue(key_1),
                                                                                                         alignment: _descriptor_5.alignment() } }] } },
                                                                              { popeq: { cached: false,
                                                                                         result: undefined } }]).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[3].asMap().get({ value: _descriptor_1.toValue(key_0),
                                                            alignment: _descriptor_1.alignment() });
            return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_5.fromValue(key.value),      _descriptor_9.fromValue(value.value)    ];  })[Symbol.iterator]();
          }
        }
      }
    },
    disputes: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(4n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(4n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'zkescrow.compact line 70 char 1',
                                     'Uint<0..18446744073709551616>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(4n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_0),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'zkescrow.compact line 70 char 1',
                                     'Uint<0..18446744073709551616>',
                                     key_0)
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(4n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(key_0),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[4];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_1.fromValue(key.value),      _descriptor_3.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    completedBySeller: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(5n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(5n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'zkescrow.compact line 71 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(5n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'zkescrow.compact line 71 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(5n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[5];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_1.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ getUserSecret: (...args) => undefined });
export const pureCircuits = {
  deriveUserPublicKey: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`deriveUserPublicKey: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const secret_0 = args_0[0];
    if (!(secret_0.buffer instanceof ArrayBuffer && secret_0.BYTES_PER_ELEMENT === 1 && secret_0.length === 32)) {
      __compactRuntime.typeError('deriveUserPublicKey',
                                 'argument 1',
                                 'zkescrow.compact line 77 char 1',
                                 'Bytes<32>',
                                 secret_0)
    }
    return _dummyContract._deriveUserPublicKey_0(secret_0);
  },
  inviteCommitment: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`inviteCommitment: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const secret_0 = args_0[0];
    if (!(secret_0.buffer instanceof ArrayBuffer && secret_0.BYTES_PER_ELEMENT === 1 && secret_0.length === 32)) {
      __compactRuntime.typeError('inviteCommitment',
                                 'argument 1',
                                 'zkescrow.compact line 84 char 1',
                                 'Bytes<32>',
                                 secret_0)
    }
    return _dummyContract._inviteCommitment_0(secret_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
