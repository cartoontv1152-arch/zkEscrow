import { ArrowLeft, Check, ClockCountdown, Copy, FileLock, LockKeyOpen, Scales, ShieldCheck, Warning } from '@phosphor-icons/react';
import { DealStatus, MilestoneStatus } from '@zkescrow/contract';
import { dealStatusLabel, formatTnight, milestoneStatusLabel, parseTnight, type DealView } from '@zkescrow/api';
import { useMemo, useState } from 'react';
import { availableActions } from '../lib/deal-actions.js';
import { Modal } from './Modal.js';
import { useZkEscrow, type PrivateMetadata } from '../web3/ZkEscrowContext.js';

type DialogState =
  | { kind: 'none' }
  | { kind: 'invite'; role: 'seller' | 'arbitrator' }
  | { kind: 'evidence'; purpose: 'milestone' | 'dispute' | 'more-evidence'; milestoneId?: bigint }
  | { kind: 'resolve' }
  | { kind: 'confirm'; action: 'fund' | 'refund' | 'approve-refund' | 'cancel' | 'late-refund' | 'auto-release' | 'approve'; milestoneId?: bigint };

export function DealDetail({ view, local, onBack }: {
  view: DealView;
  local?: PrivateMetadata;
  onBack: () => void;
}) {
  const api = useZkEscrow();
  const [dialog, setDialog] = useState<DialogState>({ kind: 'none' });
  const params = useMemo(() => new URLSearchParams(window.location.hash.replace(/^#/, '')), []);
  const [invite, setInvite] = useState(params.get('invite') ?? '');
  const [evidence, setEvidence] = useState('');
  const remaining = view.deal.fundedAmount - view.deal.releasedAmount - view.deal.refundedAmount;
  const [sellerAward, setSellerAward] = useState('');
  const [buyerAward, setBuyerAward] = useState('');
  const [resolveError, setResolveError] = useState<string | null>(null);
  const actions = availableActions(view);
  const now = BigInt(Math.floor(Date.now() / 1000));
  const active = view.deal.status === DealStatus.FUNDED || view.deal.status === DealStatus.IN_PROGRESS;
  const sellerAccepted = [DealStatus.ACCEPTED, DealStatus.FUNDED, DealStatus.IN_PROGRESS, DealStatus.DISPUTED, DealStatus.COMPLETED, DealStatus.REFUNDED, DealStatus.SETTLED].includes(view.deal.status);
  const call = (operation: Promise<void>) => void operation.then(() => setDialog({ kind: 'none' })).catch(() => undefined);
  const settle = () => {
    try {
      const parseAward = (value: string) => value.trim() === '0' ? 0n : parseTnight(value);
      const seller = parseAward(sellerAward);
      const buyer = parseAward(buyerAward);
      if (seller + buyer !== remaining) throw new Error(`Awards must total ${formatTnight(remaining)}.`);
      setResolveError(null);
      call(api.resolveDispute(view.id, seller, buyer));
    } catch (cause) {
      setResolveError(cause instanceof Error ? cause.message : 'Enter valid award amounts.');
    }
  };

  const confirm = () => {
    if (dialog.kind !== 'confirm') return;
    if (dialog.action === 'fund') call(api.fundDeal(view.id, view.deal.amount));
    if (dialog.action === 'refund') call(api.requestRefund(view.id));
    if (dialog.action === 'approve-refund') call(api.approveRefund(view.id));
    if (dialog.action === 'cancel') call(api.cancelUnfunded(view.id));
    if (dialog.action === 'late-refund' && dialog.milestoneId) call(api.claimLateRefund(view.id, dialog.milestoneId));
    if (dialog.action === 'auto-release' && dialog.milestoneId) call(api.autoReleaseMilestone(view.id, dialog.milestoneId));
    if (dialog.action === 'approve' && dialog.milestoneId) call(api.approveMilestone(view.id, dialog.milestoneId));
  };

  return (
    <section className="deal-detail">
      <button className="back-button" type="button" onClick={onBack}><ArrowLeft size={18} /> Back to escrows</button>
      <header className="deal-title-row">
        <div>
          <span className="deal-id">ESCROW #{view.id.toString()}</span>
          <h1>{local?.title ?? 'Private agreement'}</h1>
          <p>{local?.description ?? 'Readable terms are shared only with invited participants. The on-chain commitment is available below.'}</p>
        </div>
        <div className={`status-block status-${view.deal.status}`}><span>{dealStatusLabel(view.deal.status)}</span><strong>{formatTnight(view.deal.amount)}</strong><small>Your role: {view.role}</small></div>
      </header>

      <div className="deal-layout">
        <div className="deal-main">
          <section className="detail-section">
            <header><h2>Milestones</h2><span>{view.deal.paidMilestoneCount.toString()} of {view.deal.milestoneCount.toString()} released · {formatTnight(view.deal.refundedAmount)} refunded</span></header>
            <div className="milestone-list">
              {view.milestones.map((milestone, index) => (
                <article className="milestone-item" key={milestone.id.toString()}>
                  <div className="milestone-state-icon">{milestone.status === MilestoneStatus.PAID ? <Check size={18} weight="bold" /> : <span>{String(index + 1).padStart(2, '0')}</span>}</div>
                   <div className="milestone-copy"><h3>{local?.milestones[index]?.label ?? `Committed milestone ${milestone.id}`}</h3><p>{milestoneStatusLabel(milestone.status)}. Deliver by {new Date(Number(milestone.deliveryDeadline) * 1000).toLocaleString()}; review cutoff {new Date(Number(milestone.reviewDeadline) * 1000).toLocaleString()}.</p></div>
                  <strong>{formatTnight(milestone.amount)}</strong>
                  <div className="milestone-actions">
                    {view.role === 'seller' && active && milestone.status === MilestoneStatus.PENDING && now <= milestone.deliveryDeadline && <button className="button button-secondary compact" type="button" onClick={() => setDialog({ kind: 'evidence', purpose: 'milestone', milestoneId: milestone.id })}>Submit</button>}
                    {view.role === 'buyer' && active && milestone.status === MilestoneStatus.SUBMITTED && <button className="button button-primary compact" type="button" onClick={() => setDialog({ kind: 'confirm', action: 'approve', milestoneId: milestone.id })}>Approve</button>}
                    {view.role === 'seller' && active && milestone.status === MilestoneStatus.SUBMITTED && now >= milestone.reviewDeadline && <button className="button button-secondary compact" type="button" onClick={() => setDialog({ kind: 'confirm', action: 'auto-release', milestoneId: milestone.id })}>Auto release</button>}
                    {view.role === 'buyer' && active && milestone.status === MilestoneStatus.PENDING && now > milestone.deliveryDeadline && <button className="button button-danger compact" type="button" onClick={() => setDialog({ kind: 'confirm', action: 'late-refund', milestoneId: milestone.id })}>Late refund</button>}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="detail-section activity-section">
            <header><h2>Verifiable state</h2><span>Derived from the ledger</span></header>
            <div className="state-timeline">
              <div className="state-complete"><ShieldCheck size={18} /><span><strong>Agreement created</strong><small>Terms committed on-chain</small></span></div>
              <div className={sellerAccepted ? 'state-complete' : ''}><Check size={18} /><span><strong>Seller accepted</strong><small>Role proof registered</small></span></div>
              <div className={view.deal.fundedAmount > 0n ? 'state-complete' : ''}><LockKeyOpen size={18} /><span><strong>Escrow funded</strong><small>{formatTnight(view.deal.fundedAmount)} locked</small></span></div>
              <div className={view.deal.releasedAmount > 0n ? 'state-complete' : ''}><ClockCountdown size={18} /><span><strong>Settlement in progress</strong><small>{formatTnight(view.deal.releasedAmount)} released</small></span></div>
            </div>
          </section>
        </div>

        <aside className="deal-aside">
          <section className="aside-panel">
            <h2>Available actions</h2>
            {actions.size === 0 && <p>No transaction is available for your role in the current state.</p>}
            {actions.has('accept') && (params.get('role') === 'seller' || !params.get('role')) && <button className="button button-primary full" type="button" onClick={() => setDialog({ kind: 'invite', role: 'seller' })}>Accept seller invitation</button>}
            {actions.has('claim-arbitrator') && params.get('role') === 'arbitrator' && <button className="button button-primary full" type="button" onClick={() => setDialog({ kind: 'invite', role: 'arbitrator' })}>Claim arbitrator role</button>}
            {actions.has('fund') && <button className="button button-primary full" type="button" onClick={() => setDialog({ kind: 'confirm', action: 'fund' })}>Fund escrow</button>}
            {actions.has('request-refund') && <button className="button button-secondary full" type="button" onClick={() => setDialog({ kind: 'confirm', action: 'refund' })}>Request refund</button>}
            {actions.has('approve-refund') && <button className="button button-secondary full" type="button" onClick={() => setDialog({ kind: 'confirm', action: 'approve-refund' })}>Approve full refund</button>}
            {actions.has('dispute') && <button className="button button-danger full" type="button" onClick={() => setDialog({ kind: 'evidence', purpose: 'dispute' })}><Scales size={17} /> Open dispute</button>}
            {actions.has('evidence') && <button className="button button-secondary full" type="button" onClick={() => setDialog({ kind: 'evidence', purpose: 'more-evidence' })}>Update evidence commitment</button>}
            {actions.has('resolve') && <button className="button button-primary full" type="button" onClick={() => setDialog({ kind: 'resolve' })}>Resolve dispute</button>}
            {actions.has('cancel') && <button className="button button-quiet full" type="button" onClick={() => setDialog({ kind: 'confirm', action: 'cancel' })}>Cancel unfunded escrow</button>}
          </section>
          <section className="aside-panel commitment-panel">
            <FileLock size={23} />
            <h2>Private terms commitment</h2>
            <code>{Array.from(view.deal.metadataCommitment).map((b) => b.toString(16).padStart(2, '0')).join('')}</code>
            <button className="text-link" type="button" onClick={() => void navigator.clipboard.writeText(Array.from(view.deal.metadataCommitment).map((b) => b.toString(16).padStart(2, '0')).join(''))}><Copy size={16} /> Copy commitment</button>
          </section>
        </aside>
      </div>

      {dialog.kind === 'invite' && <Modal title={dialog.role === 'seller' ? 'Accept this escrow' : 'Claim arbitration role'} description="Your invite secret is checked inside the zero-knowledge circuit." onClose={() => setDialog({ kind: 'none' })} footer={<button className="button button-primary" type="button" disabled={invite.length !== 64 || !!api.busy} onClick={() => call(dialog.role === 'seller' ? api.acceptDeal(view.id, invite) : api.claimArbitrator(view.id, invite))}>Confirm in wallet</button>}><label className="field"><span>64-character invite secret</span><input value={invite} onChange={(e) => setInvite(e.target.value)} spellCheck={false} autoComplete="off" /></label></Modal>}

      {dialog.kind === 'evidence' && <Modal title={dialog.purpose === 'milestone' ? 'Commit delivery proof' : 'Commit private evidence'} description="Only a SHA-256 commitment goes on-chain. Keep the source material for authorized review." onClose={() => setDialog({ kind: 'none' })} footer={<button className="button button-primary" type="button" disabled={!evidence.trim() || !!api.busy} onClick={() => {
        if (dialog.purpose === 'milestone' && dialog.milestoneId) call(api.submitMilestone(view.id, dialog.milestoneId, evidence));
        if (dialog.purpose === 'dispute') call(api.openDispute(view.id, evidence));
        if (dialog.purpose === 'more-evidence') call(api.submitDisputeEvidence(view.id, evidence));
      }}>Commit on-chain</button>}><label className="field"><span>Private evidence reference</span><textarea rows={6} value={evidence} onChange={(e) => setEvidence(e.target.value)} placeholder="Describe the delivery or paste a content hash from your encrypted file." /></label><div className="privacy-note"><FileLock size={18} /><p>This text never leaves your browser through zkEscrow. Store the underlying file separately.</p></div></Modal>}

      {dialog.kind === 'resolve' && <Modal title="Settle the dispute" description={`Allocate the remaining ${formatTnight(remaining)}. Both transfers execute atomically.`} onClose={() => setDialog({ kind: 'none' })} footer={<button className="button button-primary" type="button" disabled={sellerAward === '' || buyerAward === '' || !!api.busy} onClick={settle}>Settle on-chain</button>}><div className="field-grid"><label className="field"><span>Seller award in tNIGHT</span><input inputMode="decimal" value={sellerAward} onChange={(e) => { setSellerAward(e.target.value); setResolveError(null); }} /></label><label className="field"><span>Buyer refund in tNIGHT</span><input inputMode="decimal" value={buyerAward} onChange={(e) => { setBuyerAward(e.target.value); setResolveError(null); }} /></label></div>{resolveError && <p className="form-error" role="alert">{resolveError}</p>}<div className="warning-note"><Warning size={18} /><p>This action is final. Awards must equal the remaining balance.</p></div></Modal>}

      {dialog.kind === 'confirm' && <Modal title={{ fund: 'Fund this escrow', refund: 'Request a full refund', 'approve-refund': 'Return the remaining funds', cancel: 'Cancel this escrow', 'late-refund': 'Claim a late-delivery refund', 'auto-release': 'Release after review cutoff', approve: 'Approve and pay milestone' }[dialog.action]} description="Your wallet will show the complete Preprod transaction before submission." onClose={() => setDialog({ kind: 'none' })} footer={<><button className="button button-quiet" type="button" onClick={() => setDialog({ kind: 'none' })}>Go back</button><button className="button button-primary" type="button" onClick={confirm} disabled={!!api.busy}>Confirm in wallet</button></>}><div className="confirm-summary"><span>Escrow</span><strong>#{view.id.toString()}</strong><span>Remaining custody</span><strong>{formatTnight(remaining)}</strong><span>Network</span><strong>Midnight Preprod</strong></div></Modal>}
    </section>
  );
}
