import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum DealStatus { DRAFT = 0,
                         ACCEPTED = 1,
                         FUNDED = 2,
                         IN_PROGRESS = 3,
                         DISPUTED = 4,
                         COMPLETED = 5,
                         CANCELLED = 6,
                         REFUNDED = 7,
                         SETTLED = 8
}

export enum MilestoneStatus { PENDING = 0, SUBMITTED = 1, PAID = 2, REFUNDED = 3
}

export type UserSecretKey = Uint8Array;

export type UserPublicKey = Uint8Array;

export type Deal = { buyerKey: UserPublicKey;
                     sellerKey: UserPublicKey;
                     arbitratorKey: UserPublicKey;
                     sellerInviteCommitment: Uint8Array;
                     arbitratorInviteCommitment: Uint8Array;
                     buyerPayout: { bytes: Uint8Array };
                     sellerPayout: { bytes: Uint8Array };
                     amount: bigint;
                     plannedAmount: bigint;
                     fundedAmount: bigint;
                     releasedAmount: bigint;
                     refundedAmount: bigint;
                     milestoneCount: bigint;
                     paidMilestoneCount: bigint;
                     settledMilestoneCount: bigint;
                     deadline: bigint;
                     metadataCommitment: Uint8Array;
                     status: DealStatus;
                     refundRequested: boolean
                   };

export type Milestone = { amount: bigint;
                          deliveryDeadline: bigint;
                          reviewDeadline: bigint;
                          labelCommitment: Uint8Array;
                          deliveryCommitment: Uint8Array;
                          status: MilestoneStatus
                        };

export type Dispute = { buyerEvidence: Uint8Array;
                        sellerEvidence: Uint8Array;
                        resolved: boolean;
                        sellerAward: bigint;
                        buyerAward: bigint
                      };

export type Witnesses<PS> = {
  getUserSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, UserSecretKey];
}

export type ImpureCircuits<PS> = {
  createDeal(context: __compactRuntime.CircuitContext<PS>,
             amount_0: bigint,
             deadline_0: bigint,
             metadataCommitment_0: Uint8Array,
             sellerInviteSecret_0: Uint8Array,
             arbitratorInviteSecret_0: Uint8Array,
             buyerPayout_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, bigint>;
  addMilestone(context: __compactRuntime.CircuitContext<PS>,
               dealId_0: bigint,
               amount_0: bigint,
               deliveryDeadline_0: bigint,
               reviewDeadline_0: bigint,
               labelCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  acceptDeal(context: __compactRuntime.CircuitContext<PS>,
             dealId_0: bigint,
             inviteSecret_0: Uint8Array,
             payout_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
  claimArbitrator(context: __compactRuntime.CircuitContext<PS>,
                  dealId_0: bigint,
                  inviteSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  fundDeal(context: __compactRuntime.CircuitContext<PS>,
           dealId_0: bigint,
           amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  submitMilestone(context: __compactRuntime.CircuitContext<PS>,
                  dealId_0: bigint,
                  milestoneId_0: bigint,
                  deliveryCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  approveMilestone(context: __compactRuntime.CircuitContext<PS>,
                   dealId_0: bigint,
                   milestoneId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  autoReleaseMilestone(context: __compactRuntime.CircuitContext<PS>,
                       dealId_0: bigint,
                       milestoneId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  requestRefund(context: __compactRuntime.CircuitContext<PS>, dealId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  approveRefund(context: __compactRuntime.CircuitContext<PS>, dealId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  claimLateRefund(context: __compactRuntime.CircuitContext<PS>,
                  dealId_0: bigint,
                  milestoneId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  cancelUnfunded(context: __compactRuntime.CircuitContext<PS>, dealId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  openDispute(context: __compactRuntime.CircuitContext<PS>,
              dealId_0: bigint,
              evidenceCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  submitDisputeEvidence(context: __compactRuntime.CircuitContext<PS>,
                        dealId_0: bigint,
                        evidenceCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  resolveDispute(context: __compactRuntime.CircuitContext<PS>,
                 dealId_0: bigint,
                 sellerAward_0: bigint,
                 buyerAward_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  proveCompletedAtLeast(context: __compactRuntime.CircuitContext<PS>,
                        minimum_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
}

export type ProvableCircuits<PS> = {
  createDeal(context: __compactRuntime.CircuitContext<PS>,
             amount_0: bigint,
             deadline_0: bigint,
             metadataCommitment_0: Uint8Array,
             sellerInviteSecret_0: Uint8Array,
             arbitratorInviteSecret_0: Uint8Array,
             buyerPayout_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, bigint>;
  addMilestone(context: __compactRuntime.CircuitContext<PS>,
               dealId_0: bigint,
               amount_0: bigint,
               deliveryDeadline_0: bigint,
               reviewDeadline_0: bigint,
               labelCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  acceptDeal(context: __compactRuntime.CircuitContext<PS>,
             dealId_0: bigint,
             inviteSecret_0: Uint8Array,
             payout_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
  claimArbitrator(context: __compactRuntime.CircuitContext<PS>,
                  dealId_0: bigint,
                  inviteSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  fundDeal(context: __compactRuntime.CircuitContext<PS>,
           dealId_0: bigint,
           amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  submitMilestone(context: __compactRuntime.CircuitContext<PS>,
                  dealId_0: bigint,
                  milestoneId_0: bigint,
                  deliveryCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  approveMilestone(context: __compactRuntime.CircuitContext<PS>,
                   dealId_0: bigint,
                   milestoneId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  autoReleaseMilestone(context: __compactRuntime.CircuitContext<PS>,
                       dealId_0: bigint,
                       milestoneId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  requestRefund(context: __compactRuntime.CircuitContext<PS>, dealId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  approveRefund(context: __compactRuntime.CircuitContext<PS>, dealId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  claimLateRefund(context: __compactRuntime.CircuitContext<PS>,
                  dealId_0: bigint,
                  milestoneId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  cancelUnfunded(context: __compactRuntime.CircuitContext<PS>, dealId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  openDispute(context: __compactRuntime.CircuitContext<PS>,
              dealId_0: bigint,
              evidenceCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  submitDisputeEvidence(context: __compactRuntime.CircuitContext<PS>,
                        dealId_0: bigint,
                        evidenceCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  resolveDispute(context: __compactRuntime.CircuitContext<PS>,
                 dealId_0: bigint,
                 sellerAward_0: bigint,
                 buyerAward_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  proveCompletedAtLeast(context: __compactRuntime.CircuitContext<PS>,
                        minimum_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
}

export type PureCircuits = {
  deriveUserPublicKey(secret_0: UserSecretKey): UserPublicKey;
  inviteCommitment(secret_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  deriveUserPublicKey(context: __compactRuntime.CircuitContext<PS>,
                      secret_0: UserSecretKey): __compactRuntime.CircuitResults<PS, UserPublicKey>;
  inviteCommitment(context: __compactRuntime.CircuitContext<PS>,
                   secret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  createDeal(context: __compactRuntime.CircuitContext<PS>,
             amount_0: bigint,
             deadline_0: bigint,
             metadataCommitment_0: Uint8Array,
             sellerInviteSecret_0: Uint8Array,
             arbitratorInviteSecret_0: Uint8Array,
             buyerPayout_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, bigint>;
  addMilestone(context: __compactRuntime.CircuitContext<PS>,
               dealId_0: bigint,
               amount_0: bigint,
               deliveryDeadline_0: bigint,
               reviewDeadline_0: bigint,
               labelCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  acceptDeal(context: __compactRuntime.CircuitContext<PS>,
             dealId_0: bigint,
             inviteSecret_0: Uint8Array,
             payout_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
  claimArbitrator(context: __compactRuntime.CircuitContext<PS>,
                  dealId_0: bigint,
                  inviteSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  fundDeal(context: __compactRuntime.CircuitContext<PS>,
           dealId_0: bigint,
           amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  submitMilestone(context: __compactRuntime.CircuitContext<PS>,
                  dealId_0: bigint,
                  milestoneId_0: bigint,
                  deliveryCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  approveMilestone(context: __compactRuntime.CircuitContext<PS>,
                   dealId_0: bigint,
                   milestoneId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  autoReleaseMilestone(context: __compactRuntime.CircuitContext<PS>,
                       dealId_0: bigint,
                       milestoneId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  requestRefund(context: __compactRuntime.CircuitContext<PS>, dealId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  approveRefund(context: __compactRuntime.CircuitContext<PS>, dealId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  claimLateRefund(context: __compactRuntime.CircuitContext<PS>,
                  dealId_0: bigint,
                  milestoneId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  cancelUnfunded(context: __compactRuntime.CircuitContext<PS>, dealId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  openDispute(context: __compactRuntime.CircuitContext<PS>,
              dealId_0: bigint,
              evidenceCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  submitDisputeEvidence(context: __compactRuntime.CircuitContext<PS>,
                        dealId_0: bigint,
                        evidenceCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  resolveDispute(context: __compactRuntime.CircuitContext<PS>,
                 dealId_0: bigint,
                 sellerAward_0: bigint,
                 buyerAward_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  proveCompletedAtLeast(context: __compactRuntime.CircuitContext<PS>,
                        minimum_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
}

export type Ledger = {
  readonly dealCount: bigint;
  readonly completedDealCount: bigint;
  deals: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): Deal;
    [Symbol.iterator](): Iterator<[bigint, Deal]>
  };
  milestones: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): {
      isEmpty(): boolean;
      size(): bigint;
      member(key_1: bigint): boolean;
      lookup(key_1: bigint): Milestone;
      [Symbol.iterator](): Iterator<[bigint, Milestone]>
    }
  };
  disputes: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): Dispute;
    [Symbol.iterator](): Iterator<[bigint, Dispute]>
  };
  completedBySeller: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: UserPublicKey): boolean;
    lookup(key_0: UserPublicKey): bigint;
    [Symbol.iterator](): Iterator<[UserPublicKey, bigint]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
