import {
  ArrowsClockwise,
  Briefcase,
  CheckCircle,
  House,
  LockKey,
  Moon,
  Plus,
  ShieldCheck,
  SignOut,
  Sun,
  WarningCircle,
  X,
} from '@phosphor-icons/react';
import { useEffect, useMemo, useState } from 'react';
import type { DealView } from '@zkescrow/api';
import { formatTnight } from '@zkescrow/api';
import { useZkEscrow } from './web3/ZkEscrowContext.js';
import { Landing } from './components/Landing.js';
import { ContractGate } from './components/ContractGate.js';
import { Dashboard } from './components/Dashboard.js';
import { CreateDeal } from './components/CreateDeal.js';
import { DealDetail } from './components/DealDetail.js';
import { PrivacyCenter } from './components/PrivacyCenter.js';
import { Modal } from './components/Modal.js';
import { CopyField } from './components/CopyField.js';

type View = 'dashboard' | 'create' | 'privacy';

const initialDark = () => {
  try {
    const saved = localStorage.getItem('zkescrow:theme');
    if (saved === 'dark' || saved === 'light') return saved === 'dark';
  } catch { /* Storage can be unavailable in strict privacy modes. */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export default function App() {
  const api = useZkEscrow();
  const [view, setView] = useState<View>('dashboard');
  const [selected, setSelected] = useState<DealView | null>(null);
  const [dark, setDark] = useState(initialDark);
  const [dismissedInvite, setDismissedInvite] = useState<bigint | null>(null);
  const inviteParams = useMemo(() => new URLSearchParams(window.location.hash.replace(/^#/, '')), []);
  const detectedAddress = inviteParams.get('contract') ?? undefined;

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try { localStorage.setItem('zkescrow:theme', dark ? 'dark' : 'light'); } catch { /* Best-effort preference only. */ }
  }, [dark]);

  useEffect(() => {
    const deal = inviteParams.get('deal');
    if (deal && api.deals.length) {
      const found = api.deals.find((item) => item.id === BigInt(deal));
      if (found) setSelected(found);
    }
  }, [api.deals, inviteParams]);

  useEffect(() => {
    if (!selected) return;
    const updated = api.deals.find((item) => item.id === selected.id);
    if (updated) setSelected(updated);
  }, [api.deals, selected]);

  if (!api.wallet) {
    return <><Landing connect={() => void api.connectWallet().catch(() => undefined)} busy={!!api.busy} /><SystemFeedback busy={api.busy} error={api.error} clearError={api.clearError} lastTransaction={api.lastTransaction} clearLastTransaction={api.clearLastTransaction} /></>;
  }

  if (!api.contractAddress) {
    return <><ContractGate deploy={() => void api.deploy().catch(() => undefined)} join={(address) => void api.join(address).catch(() => undefined)} busy={!!api.busy} detectedAddress={detectedAddress} /><SystemFeedback busy={api.busy} error={api.error} clearError={api.clearError} lastTransaction={api.lastTransaction} clearLastTransaction={api.clearLastTransaction} /></>;
  }

  const createdInvite = api.lastCreatedInvite && api.lastCreatedInvite.dealId !== dismissedInvite ? api.lastCreatedInvite : null;
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="zkEscrow home"><span className="brand-mark"><LockKey size={18} weight="fill" /></span>zkEscrow</a>
        <nav aria-label="Application navigation">
          <button className={view === 'dashboard' && !selected ? 'active' : ''} type="button" onClick={() => { setView('dashboard'); setSelected(null); }}><House size={20} /> Overview</button>
          <button className={view === 'create' ? 'active' : ''} type="button" onClick={() => { setView('create'); setSelected(null); }}><Plus size={20} /> Create escrow</button>
          <button className={view === 'privacy' ? 'active' : ''} type="button" onClick={() => { setView('privacy'); setSelected(null); }}><ShieldCheck size={20} /> Privacy center</button>
        </nav>
        <div className="sidebar-footer">
          <div className="network-status"><i /><div><strong>Preprod connected</strong><span>{api.contractAddress.slice(0, 8)}...{api.contractAddress.slice(-6)}</span></div></div>
          <button className="sidebar-action" type="button" onClick={() => setDark((value) => !value)}>{dark ? <Sun size={19} /> : <Moon size={19} />}{dark ? 'Light mode' : 'Dark mode'}</button>
        </div>
      </aside>

      <main className="app-content">
        <header className="app-topbar">
          <div className="breadcrumb"><span>zkEscrow</span><strong>{selected ? `Escrow #${selected.id}` : view === 'dashboard' ? 'Overview' : view === 'create' ? 'Create' : 'Privacy'}</strong></div>
          <div className="wallet-summary"><span>{formatTnight(api.wallet.tnightBalance)}</span><span>{api.wallet.dustBalance.toLocaleString()} tDUST</span><code>{api.wallet.unshieldedAddress.slice(0, 10)}...{api.wallet.unshieldedAddress.slice(-6)}</code><button className="icon-button" type="button" onClick={() => void api.refresh().catch(() => undefined)} aria-label="Refresh on-chain state"><ArrowsClockwise size={18} /></button></div>
        </header>

        <div className="content-inner">
          {selected ? <DealDetail view={selected} local={api.metadata[selected.id.toString()]} onBack={() => setSelected(null)} /> : null}
          {!selected && view === 'dashboard' ? <Dashboard deals={api.deals} metadata={api.metadata} onOpen={setSelected} onCreate={() => setView('create')} /> : null}
          {!selected && view === 'create' ? <CreateDeal busy={!!api.busy} onCreate={async (input) => { await api.createDeal(input); setView('dashboard'); }} /> : null}
          {!selected && view === 'privacy' ? <PrivacyCenter identitySecret={api.identitySecret} importIdentity={api.importIdentity} contractAddress={api.contractAddress} proveReputation={api.proveReputation} /> : null}
        </div>
      </main>

      {createdInvite && <Modal title="Escrow created on Preprod" description={`Escrow #${createdInvite.dealId} is committed. Share each invite only with its intended role.`} onClose={() => setDismissedInvite(createdInvite.dealId)} footer={<button className="button button-primary" type="button" onClick={() => setDismissedInvite(createdInvite.dealId)}><CheckCircle size={18} /> Done</button>}>
        <div className="invite-receipt">
          <section><div><Briefcase size={20} /><h3>Seller invitation</h3></div><CopyField label="Private invite link" value={createdInvite.sellerLink} /><CopyField label="Recovery secret" value={createdInvite.sellerSecret} secret /></section>
          <section><div><ShieldCheck size={20} /><h3>Arbitrator invitation</h3></div><CopyField label="Private invite link" value={createdInvite.arbitratorLink} /><CopyField label="Recovery secret" value={createdInvite.arbitratorSecret} secret /></section>
          <p><WarningCircle size={18} /> These secrets are not recoverable from the public ledger.</p>
        </div>
      </Modal>}
      <SystemFeedback busy={api.busy} error={api.error} clearError={api.clearError} lastTransaction={api.lastTransaction} clearLastTransaction={api.clearLastTransaction} />
    </div>
  );
}

function SystemFeedback({ busy, error, clearError, lastTransaction, clearLastTransaction }: { busy: string | null; error: string | null; clearError: () => void; lastTransaction: { label: string; txId: string; blockHeight: number } | null; clearLastTransaction: () => void }) {
  return (
    <>
      {busy && <div className="transaction-overlay" role="status" aria-live="polite"><div className="proof-loader"><i /><i /><i /></div><div><strong>{busy}</strong><span>Keep your wallet open. Zero-knowledge proof generation can take a moment.</span></div></div>}
      {error && <div className="error-toast" role="alert"><WarningCircle size={21} weight="fill" /><span>{error}</span><button className="icon-button" type="button" onClick={clearError} aria-label="Dismiss error"><X size={18} /></button></div>}
      {lastTransaction && <div className="success-toast" role="status"><CheckCircle size={21} weight="fill" /><span><strong>{lastTransaction.label} finalized</strong><small>Block {lastTransaction.blockHeight} · tx {lastTransaction.txId}</small></span><button className="icon-button" type="button" onClick={() => void navigator.clipboard.writeText(lastTransaction.txId).catch(() => undefined)} aria-label="Copy transaction ID">⧉</button><button className="icon-button" type="button" onClick={clearLastTransaction} aria-label="Dismiss transaction receipt"><X size={18} /></button></div>}
    </>
  );
}
