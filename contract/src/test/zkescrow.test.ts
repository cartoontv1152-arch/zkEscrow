import { describe, expect, it } from 'vitest';
import { DealStatus, MilestoneStatus, pureCircuits } from '../managed/zkescrow/contract/index.js';
import { payout, secret, ZkEscrowSimulator } from './zkescrow-simulator.js';

const buyer = secret(1);
const seller = secret(2);
const arbitrator = secret(3);
const outsider = secret(4);
const sellerInvite = secret(11);
const arbitratorInvite = secret(12);
const commitment = secret(20);

const createReadyDeal = (sim: ZkEscrowSimulator, amount = 100n, deadline = 10_000n): bigint => {
  sim.as(buyer);
  const dealId = sim.call('createDeal', amount, deadline, commitment, sellerInvite, arbitratorInvite, payout());
  sim.call('addMilestone', dealId, amount / 2n, 4_000n, 5_000n, secret(21));
  sim.call('addMilestone', dealId, amount - amount / 2n, 8_000n, deadline, secret(22));
  return dealId;
};

const acceptAndFund = (sim: ZkEscrowSimulator, dealId: bigint, amount = 100n): void => {
  sim.as(seller).call('acceptDeal', dealId, sellerInvite, payout());
  sim.as(buyer).call('fundDeal', dealId, amount);
};

describe('zkEscrow Compact protocol', () => {
  it('creates a fully funded milestone escrow through private invitations', () => {
    const sim = new ZkEscrowSimulator(buyer);
    const dealId = createReadyDeal(sim);

    expect(dealId).toBe(1n);
    expect(sim.ledger().deals.lookup(dealId).plannedAmount).toBe(100n);
    expect(() => sim.as(outsider).call('acceptDeal', dealId, secret(99), payout())).toThrow(/Invalid seller invitation/);

    acceptAndFund(sim, dealId);
    const deal = sim.ledger().deals.lookup(dealId);
    expect(deal.status).toBe(DealStatus.FUNDED);
    expect(deal.fundedAmount).toBe(100n);
    expect(deal.sellerKey).toEqual(pureCircuits.deriveUserPublicKey(seller));
  });

  it('does not allow a participant to impersonate another role or fund after expiry', () => {
    const sim = new ZkEscrowSimulator(buyer, 1_000);
    const dealId = createReadyDeal(sim);
    expect(() => sim.as(buyer).call('acceptDeal', dealId, sellerInvite, payout())).toThrow(/buyer cannot accept/);
    expect(() => sim.at(10_001).as(seller).call('acceptDeal', dealId, sellerInvite, payout())).toThrow(/deadline has passed/);

    const expiredFunding = new ZkEscrowSimulator(buyer, 1_000);
    const expiredId = createReadyDeal(expiredFunding);
    expiredFunding.as(seller).call('acceptDeal', expiredId, sellerInvite, payout());
    expect(() => expiredFunding.at(10_001).as(buyer).call('fundDeal', expiredId, 100n)).toThrow(/deadline has passed/);
  });

  it('enforces role authorization and releases each approved milestone', () => {
    const sim = new ZkEscrowSimulator(buyer);
    const dealId = createReadyDeal(sim);
    acceptAndFund(sim, dealId);

    expect(() => sim.as(outsider).call('submitMilestone', dealId, 1n, secret(30))).toThrow(/Only the seller/);
    sim.as(seller).call('submitMilestone', dealId, 1n, secret(30));
    expect(sim.ledger().milestones.lookup(dealId).lookup(1n).status).toBe(MilestoneStatus.SUBMITTED);

    expect(() => sim.as(seller).call('approveMilestone', dealId, 1n)).toThrow(/Only the buyer/);
    sim.as(buyer).call('approveMilestone', dealId, 1n);
    expect(sim.ledger().deals.lookup(dealId).releasedAmount).toBe(50n);

    sim.as(seller).call('submitMilestone', dealId, 2n, secret(31));
    sim.as(buyer).call('approveMilestone', dealId, 2n);
    expect(sim.ledger().deals.lookup(dealId).status).toBe(DealStatus.COMPLETED);
    expect(sim.ledger().completedDealCount).toBe(1n);
    expect(sim.as(seller).call('proveCompletedAtLeast', 1n)).toBe(true);
    expect(() => sim.call('proveCompletedAtLeast', 2n)).toThrow(/threshold is not met/);
  });

  it('auto-releases submitted work only after its deadline', () => {
    const sim = new ZkEscrowSimulator(buyer);
    const dealId = createReadyDeal(sim);
    acceptAndFund(sim, dealId);
    sim.as(seller).call('submitMilestone', dealId, 1n, secret(30));

    expect(() => sim.call('autoReleaseMilestone', dealId, 1n)).toThrow(/Review window is still open/);
    sim.at(5_000).call('autoReleaseMilestone', dealId, 1n);
    expect(sim.ledger().milestones.lookup(dealId).lookup(1n).status).toBe(MilestoneStatus.PAID);
  });

  it('supports mutual refunds and buyer late-delivery recovery', () => {
    const mutual = new ZkEscrowSimulator(buyer);
    const mutualId = createReadyDeal(mutual);
    acceptAndFund(mutual, mutualId);
    mutual.as(buyer).call('requestRefund', mutualId);
    mutual.as(seller).call('approveRefund', mutualId);
    expect(mutual.ledger().deals.lookup(mutualId).status).toBe(DealStatus.REFUNDED);

    const late = new ZkEscrowSimulator(buyer);
    const lateId = createReadyDeal(late);
    acceptAndFund(late, lateId);
    expect(() => late.as(buyer).at(3_999).call('claimLateRefund', lateId, 1n)).toThrow(/deadline has not passed/);
    late.at(4_001).call('claimLateRefund', lateId, 1n);
    expect(late.ledger().deals.lookup(lateId).status).toBe(DealStatus.IN_PROGRESS);
    expect(late.ledger().deals.lookup(lateId).refundedAmount).toBe(50n);
    expect(late.ledger().milestones.lookup(lateId).lookup(1n).status).toBe(MilestoneStatus.REFUNDED);
    late.as(seller).call('submitMilestone', lateId, 2n, secret(32));
    late.as(buyer).call('approveMilestone', lateId, 2n);
    expect(late.ledger().deals.lookup(lateId).status).toBe(DealStatus.SETTLED);
    expect(late.ledger().deals.lookup(lateId).releasedAmount).toBe(50n);
  });

  it('lets the invited arbitrator atomically settle a dispute, including zero-value awards', () => {
    const sim = new ZkEscrowSimulator(buyer);
    const dealId = createReadyDeal(sim);
    sim.as(arbitrator).call('claimArbitrator', dealId, arbitratorInvite);
    acceptAndFund(sim, dealId);
    sim.as(buyer).call('openDispute', dealId, secret(40));
    sim.as(seller).call('submitDisputeEvidence', dealId, secret(41));

    expect(() => sim.as(outsider).call('resolveDispute', dealId, 60n, 40n)).toThrow(/Only the arbitrator/);
    expect(() => sim.as(arbitrator).call('resolveDispute', dealId, 101n, 0n)).toThrow(/Award exceeds/);
    sim.call('resolveDispute', dealId, 100n, 0n);

    const dispute = sim.ledger().disputes.lookup(dealId);
    expect(dispute.resolved).toBe(true);
    expect(dispute.sellerAward).toBe(100n);
    expect(dispute.buyerAward).toBe(0n);
    expect(sim.ledger().deals.lookup(dealId).status).toBe(DealStatus.SETTLED);
  });

  it('cancels only unfunded escrows and rejects malformed milestone totals', () => {
    const sim = new ZkEscrowSimulator(buyer);
    const dealId = sim.call('createDeal', 100n, 10_000n, commitment, sellerInvite, arbitratorInvite, payout());
    sim.call('addMilestone', dealId, 90n, 4_000n, 5_000n, secret(21));
    expect(() => sim.call('addMilestone', dealId, 20n, 7_000n, 8_000n, secret(22))).toThrow(/total exceeds/);
    sim.call('cancelUnfunded', dealId);
    expect(sim.ledger().deals.lookup(dealId).status).toBe(DealStatus.CANCELLED);
    expect(() => sim.call('cancelUnfunded', dealId)).toThrow(/cannot be cancelled/);
  });

  it('requires an independent arbitrator before disputes can open', () => {
    const sim = new ZkEscrowSimulator(buyer);
    const dealId = createReadyDeal(sim);
    acceptAndFund(sim, dealId);
    expect(() => sim.as(buyer).call('openDispute', dealId, secret(40))).toThrow(/arbitrator must claim/);
    expect(() => sim.as(buyer).call('claimArbitrator', dealId, arbitratorInvite)).toThrow(/participant cannot be the arbitrator/);
  });

  it('does not permit immediate seller auto-release before the review cutoff', () => {
    const sim = new ZkEscrowSimulator(buyer);
    const dealId = createReadyDeal(sim);
    acceptAndFund(sim, dealId);
    sim.as(seller).call('submitMilestone', dealId, 1n, secret(30));
    expect(() => sim.at(4_001).call('autoReleaseMilestone', dealId, 1n)).toThrow(/Review window is still open/);
    sim.at(5_000).call('autoReleaseMilestone', dealId, 1n);
    expect(sim.ledger().deals.lookup(dealId).releasedAmount).toBe(50n);
  });

  it('marks a mixed payment and late refund as settled, not fully refunded', () => {
    const sim = new ZkEscrowSimulator(buyer);
    const dealId = createReadyDeal(sim);
    acceptAndFund(sim, dealId);
    sim.as(seller).call('submitMilestone', dealId, 2n, secret(33));
    sim.as(buyer).call('approveMilestone', dealId, 2n);
    sim.at(4_001).call('claimLateRefund', dealId, 1n);
    expect(sim.ledger().deals.lookup(dealId).status).toBe(DealStatus.SETTLED);
    expect(sim.ledger().deals.lookup(dealId).releasedAmount).toBe(50n);
    expect(sim.ledger().deals.lookup(dealId).refundedAmount).toBe(50n);
  });
});
