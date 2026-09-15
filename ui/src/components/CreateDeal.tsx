import { CalendarBlank, Minus, Plus, ShieldCheck } from '@phosphor-icons/react';
import { useMemo, useState, type FormEvent } from 'react';
import { parseTnight, unixSeconds } from '@zkescrow/api';
import type { CreateDealInput } from '../web3/ZkEscrowContext.js';

type FormMilestone = { id: string; label: string; amount: string; deliveryDeadline: string; reviewDeadline: string };

const dateInput = (days: number) => {
  const date = new Date(Date.now() + days * 86_400_000);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
};

export function CreateDeal({ onCreate, busy }: { onCreate: (input: CreateDealInput) => Promise<void>; busy: boolean }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState(dateInput(14));
  const [milestones, setMilestones] = useState<FormMilestone[]>([
    { id: crypto.randomUUID(), label: '', amount: '', deliveryDeadline: dateInput(7), reviewDeadline: dateInput(10) },
  ]);
  const [formError, setFormError] = useState<string | null>(null);

  const planned = useMemo(() => milestones.reduce((sum, item) => {
    try { return sum + parseTnight(item.amount); } catch { return sum; }
  }, 0n), [milestones]);

  const updateMilestone = (id: string, patch: Partial<FormMilestone>) => setMilestones((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);
    try {
      const payload: CreateDealInput = {
        title,
        description,
        amount: parseTnight(amount),
        deadline: unixSeconds(deadline),
        milestones: milestones.map((item) => ({ label: item.label, amount: parseTnight(item.amount), deliveryDeadline: unixSeconds(item.deliveryDeadline), reviewDeadline: unixSeconds(item.reviewDeadline) })),
      };
      if (!title.trim() || !description.trim() || milestones.some((item) => !item.label.trim())) throw new Error('Complete the private agreement and every milestone label.');
      if (payload.deadline <= BigInt(Math.floor(Date.now() / 1000))) throw new Error('The final deadline must be in the future.');
      if (payload.milestones.some((item) => item.deliveryDeadline >= item.reviewDeadline || item.reviewDeadline > payload.deadline)) throw new Error('Each milestone needs a delivery deadline before its review deadline, and both must fit before the final deadline.');
      await onCreate(payload);
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : 'Check the form and try again.');
    }
  };

  return (
    <section className="create-view">
      <header className="view-heading">
        <h1>Create an escrow</h1>
        <p>Private text is hashed locally. Amounts and settlement state are public on ledger v8.</p>
      </header>
      <form className="create-form" onSubmit={submit}>
        <div className="form-section">
          <div className="form-section-title"><span>Agreement</span><ShieldCheck size={20} /></div>
          <div className="field-grid">
            <label className="field field-wide"><span>Private title</span><input maxLength={120} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Website development" /></label>
            <label className="field"><span>Total tNIGHT</span><input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="250" /></label>
            <label className="field"><span>Final deadline</span><div className="input-icon"><CalendarBlank size={18} /><input type="datetime-local" min={dateInput(1)} value={deadline} onChange={(e) => setDeadline(e.target.value)} /></div></label>
            <label className="field field-wide"><span>Private agreement details</span><textarea maxLength={4000} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the deliverables, acceptance criteria, and any private commercial terms." rows={5} /></label>
          </div>
        </div>

        <div className="form-section milestones-editor">
          <div className="form-section-title">
            <div><span>Milestones</span><small>{milestones.length} of 12</small></div>
            <button className="button button-quiet compact" type="button" onClick={() => setMilestones((items) => [...items, { id: crypto.randomUUID(), label: '', amount: '', deliveryDeadline: dateInput(7), reviewDeadline: deadline || dateInput(14) }])} disabled={milestones.length >= 12}><Plus size={17} /> Add milestone</button>
          </div>
          <div className="milestone-form-list">
            {milestones.map((item, index) => (
              <div className="milestone-form-row" key={item.id}>
                <span className="milestone-index">{String(index + 1).padStart(2, '0')}</span>
                <label className="field"><span>Private label</span><input maxLength={120} value={item.label} onChange={(e) => updateMilestone(item.id, { label: e.target.value })} placeholder="Design approved" /></label>
                <label className="field"><span>tNIGHT</span><input inputMode="decimal" value={item.amount} onChange={(e) => updateMilestone(item.id, { amount: e.target.value })} placeholder="100" /></label>
                <label className="field"><span>Delivery deadline</span><input type="datetime-local" min={dateInput(1)} max={deadline} value={item.deliveryDeadline} onChange={(e) => updateMilestone(item.id, { deliveryDeadline: e.target.value })} /></label>
                <label className="field"><span>Review cutoff</span><input type="datetime-local" min={item.deliveryDeadline} max={deadline} value={item.reviewDeadline} onChange={(e) => updateMilestone(item.id, { reviewDeadline: e.target.value })} /></label>
                <button className="icon-button remove-button" type="button" onClick={() => setMilestones((items) => items.filter((entry) => entry.id !== item.id))} disabled={milestones.length === 1} aria-label={`Remove milestone ${index + 1}`}><Minus size={18} /></button>
              </div>
            ))}
          </div>
          <div className="allocation-summary"><span>Allocated</span><strong>{Number(planned) / 1_000_000 || 0} tNIGHT</strong><span>Must equal the total</span></div>
        </div>

        {formError && <p className="form-error" role="alert">{formError}</p>}
        <div className="form-submit"><p>You will confirm one creation and one transaction per milestone in your wallet.</p><button className="button button-primary" type="submit" disabled={busy}>{busy ? 'Creating on Preprod' : 'Create private escrow'}</button></div>
      </form>
    </section>
  );
}
