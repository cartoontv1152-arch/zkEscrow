import { ArrowRight, Briefcase, ClockCountdown, Scales, ShieldCheck } from '@phosphor-icons/react';
import { DealStatus } from '@zkescrow/contract';
import { dealStatusLabel, formatTnight, type DealView } from '@zkescrow/api';
import type { PrivateMetadata } from '../web3/ZkEscrowContext.js';

export function Dashboard({ deals, metadata, onOpen, onCreate }: {
  deals: readonly DealView[];
    metadata: Readonly<Record<string, PrivateMetadata>>;
  onOpen: (deal: DealView) => void;
  onCreate: () => void;
}) {
  const mine = deals.filter((item) => item.role !== 'observer');
  const active = mine.filter((item) => [DealStatus.ACCEPTED, DealStatus.FUNDED, DealStatus.IN_PROGRESS].includes(item.deal.status)).length;
  const awaiting = mine.filter((item) => item.deal.status === DealStatus.IN_PROGRESS && item.milestones.some((m) => m.status === 1)).length;
  const completed = mine.filter((item) => item.deal.status === DealStatus.COMPLETED).length;
  const disputed = mine.filter((item) => item.deal.status === DealStatus.DISPUTED).length;

  return (
    <section className="dashboard-view">
      <header className="view-heading dashboard-heading">
        <div><h1>Your escrows</h1><p>Every status below is read from the connected Preprod contract.</p></div>
        <button className="button button-primary" type="button" onClick={onCreate}>Create escrow</button>
      </header>
      <div className="stats-grid" aria-label="Escrow summary">
        <div><Briefcase size={21} /><span>Active</span><strong>{active}</strong></div>
        <div><ClockCountdown size={21} /><span>Waiting approval</span><strong>{awaiting}</strong></div>
        <div><ShieldCheck size={21} /><span>Completed</span><strong>{completed}</strong></div>
        <div><Scales size={21} /><span>Disputes</span><strong>{disputed}</strong></div>
      </div>

      {mine.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><ShieldCheck size={30} /></div>
          <h2>No escrow history yet</h2>
          <p>Create a deal or open an invitation link. The indexer will surface it here after finalization.</p>
          <button className="button button-secondary" type="button" onClick={onCreate}>Create your first escrow</button>
        </div>
      ) : (
        <div className="deal-list">
          <div className="deal-list-header"><span>Agreement</span><span>Role</span><span>Progress</span><span>Value</span><span /></div>
          {mine.map((item) => {
            const local = metadata[item.id.toString()];
            const progress = item.deal.milestoneCount === 0n ? 0 : Number(item.deal.paidMilestoneCount * 100n / item.deal.milestoneCount);
            return (
              <button className="deal-row" type="button" key={item.id.toString()} onClick={() => onOpen(item)}>
                <span><strong>{local?.title ?? `Private escrow #${item.id}`}</strong><small>{dealStatusLabel(item.deal.status)}</small></span>
                <span className="role-label">{item.role}</span>
                <span><span className="progress-copy">{item.deal.paidMilestoneCount.toString()} of {item.deal.milestoneCount.toString()} paid</span><span className="thin-progress"><i style={{ width: `${progress}%` }} /></span></span>
                <strong>{formatTnight(item.deal.amount)}</strong>
                <ArrowRight size={19} />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
