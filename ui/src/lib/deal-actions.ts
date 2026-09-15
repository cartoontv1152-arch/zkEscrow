import { DealStatus, MilestoneStatus } from '@zkescrow/contract';
import type { DealView } from '@zkescrow/api';

export type DealAction =
  | 'accept'
  | 'claim-arbitrator'
  | 'fund'
  | 'submit'
  | 'approve'
  | 'auto-release'
  | 'request-refund'
  | 'approve-refund'
  | 'late-refund'
  | 'cancel'
  | 'dispute'
  | 'evidence'
  | 'resolve';

export const availableActions = (view: DealView, now = BigInt(Math.floor(Date.now() / 1000))): Set<DealAction> => {
  const { deal, role, milestones } = view;
  const actions = new Set<DealAction>();
  const hasArbitrator = deal.arbitratorKey.some((byte) => byte !== 0);
  const active = deal.status === DealStatus.FUNDED || deal.status === DealStatus.IN_PROGRESS;
  const arbitratorClaimable = deal.status === DealStatus.DRAFT || deal.status === DealStatus.ACCEPTED || active || deal.status === DealStatus.DISPUTED;
  if (role === 'observer' && deal.status === DealStatus.DRAFT) actions.add('accept');
  if (role === 'observer' && arbitratorClaimable && deal.arbitratorKey.every((byte) => byte === 0)) actions.add('claim-arbitrator');
  if (role === 'buyer' && deal.status === DealStatus.ACCEPTED) actions.add('fund');
  if (role === 'buyer' && active) {
    actions.add('request-refund');
    if (hasArbitrator) actions.add('dispute');
  }
  if (role === 'buyer' && (deal.status === DealStatus.DRAFT || deal.status === DealStatus.ACCEPTED)) actions.add('cancel');
  if (role === 'seller' && active && hasArbitrator) actions.add('dispute');
  if (role === 'seller' && active && deal.refundRequested) actions.add('approve-refund');
  if ((role === 'buyer' || role === 'seller') && deal.status === DealStatus.DISPUTED) actions.add('evidence');
  if (role === 'arbitrator' && deal.status === DealStatus.DISPUTED) actions.add('resolve');
  if (role === 'seller' && active && milestones.some((m) => m.status === MilestoneStatus.PENDING && now <= m.deliveryDeadline)) actions.add('submit');
  if (role === 'buyer' && active && milestones.some((m) => m.status === MilestoneStatus.SUBMITTED)) actions.add('approve');
  if (role === 'seller' && active && milestones.some((m) => m.status === MilestoneStatus.SUBMITTED && now >= m.reviewDeadline)) actions.add('auto-release');
  if (role === 'buyer' && active && milestones.some((m) => m.status === MilestoneStatus.PENDING && now > m.deliveryDeadline)) actions.add('late-refund');
  return actions;
};
