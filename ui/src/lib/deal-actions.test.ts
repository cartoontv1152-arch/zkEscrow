import { describe, expect, it } from 'vitest';
import { DealStatus, MilestoneStatus } from '@zkescrow/contract';
import { availableActions } from './deal-actions.js';

const bytes = new Uint8Array(32);
const arbitratorBytes = Uint8Array.from([1, ...new Array(31).fill(0)]);
const base = {
  id: 1n,
  role: 'buyer' as const,
  deal: {
    buyerKey: bytes,
    sellerKey: bytes,
    arbitratorKey: arbitratorBytes,
    sellerInviteCommitment: bytes,
    arbitratorInviteCommitment: bytes,
    buyerPayout: { bytes },
    sellerPayout: { bytes },
    amount: 10n,
    plannedAmount: 10n,
    fundedAmount: 10n,
    releasedAmount: 0n,
    refundedAmount: 0n,
    milestoneCount: 1n,
    paidMilestoneCount: 0n,
    settledMilestoneCount: 0n,
    deadline: 500n,
    metadataCommitment: bytes,
    status: DealStatus.IN_PROGRESS,
    refundRequested: false,
  },
  milestones: [{ id: 1n, amount: 10n, deliveryDeadline: 150n, reviewDeadline: 200n, labelCommitment: '', deliveryCommitment: '', status: MilestoneStatus.SUBMITTED }],
};

describe('availableActions', () => {
  it('lets a buyer approve submitted work and dispute an active deal', () => {
    const actions = availableActions(base, 100n);
    expect(actions.has('approve')).toBe(true);
    expect(actions.has('dispute')).toBe(true);
  });

  it('lets a seller auto-release only after the review deadline', () => {
    const seller = { ...base, role: 'seller' as const };
    expect(availableActions(seller, 100n).has('auto-release')).toBe(false);
    expect(availableActions(seller, 201n).has('auto-release')).toBe(true);
  });

  it('does not offer disputes before an arbitrator claims the role', () => {
    const withoutArbitrator = { ...base, deal: { ...base.deal, arbitratorKey: bytes } };
    expect(availableActions(withoutArbitrator, 100n).has('dispute')).toBe(false);
    expect(availableActions(base, 100n).has('dispute')).toBe(true);
  });
});
