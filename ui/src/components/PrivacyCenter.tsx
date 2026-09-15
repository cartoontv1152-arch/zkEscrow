import { Check, EyeSlash, Fingerprint, Key, LockKey, ShieldCheck } from '@phosphor-icons/react';
import { useState } from 'react';
import { CopyField } from './CopyField.js';

export function PrivacyCenter({ identitySecret, importIdentity, contractAddress, proveReputation }: {
  identitySecret: string;
  importIdentity: (secret: string) => Promise<void>;
  contractAddress: string;
  proveReputation: (minimum: bigint) => Promise<void>;
}) {
  const [importValue, setImportValue] = useState('');
  const [minimum, setMinimum] = useState('1');
  return (
    <section className="privacy-view">
      <header className="view-heading"><h1>Privacy center</h1><p>Understand what is public, what stays local, and how your private role identity is recovered.</p></header>
      <div className="privacy-grid">
        <article className="privacy-hero-panel">
          <Fingerprint size={38} />
          <h2>Your role identity is pseudonymous</h2>
          <p>zkEscrow derives a stable public key from this local secret. Reusing the same secret links your roles on this registry; wallet addresses are used only for tNIGHT payouts.</p>
          <CopyField label="Identity recovery secret" value={identitySecret} secret />
          <div className="privacy-warning"><Key size={18} /><span>Save this now. A lost secret cannot be recovered from the chain.</span></div>
        </article>
        <article className="privacy-matrix">
          <h2>Disclosure map</h2>
          <div><span><EyeSlash size={19} /> Agreement text</span><strong>Local only</strong></div>
          <div><span><EyeSlash size={19} /> Delivery and dispute evidence</span><strong>Commitment only</strong></div>
          <div><span><ShieldCheck size={19} /> Deal and milestone state</span><strong>Public proof</strong></div>
          <div><span><ShieldCheck size={19} /> tNIGHT amounts and payouts</span><strong>Public ledger</strong></div>
          <div><span><LockKey size={19} /> Role authorization secret</span><strong>Never disclosed</strong></div>
        </article>
        <article className="privacy-tool">
          <h2>Restore an identity</h2>
          <p>Import the 64-character recovery secret to regain buyer, seller, or arbitrator permissions in this browser session.</p>
          <label className="field"><span>Recovery secret</span><input value={importValue} onChange={(e) => setImportValue(e.target.value)} autoComplete="off" spellCheck={false} /></label>
          <button className="button button-secondary" type="button" disabled={importValue.trim().length !== 64} onClick={() => void importIdentity(importValue).catch(() => undefined)}>Restore role access</button>
        </article>
        <article className="privacy-tool accent-surface">
          <h2>Prove completed work</h2>
          <p>Generate an on-chain proof that your private seller key has completed at least a chosen number of escrows.</p>
          <label className="field"><span>Minimum completed escrows</span><input type="number" min="1" value={minimum} onChange={(e) => setMinimum(e.target.value)} /></label>
          <button className="button button-primary" type="button" onClick={() => { const value = Number.parseInt(minimum, 10); if (Number.isSafeInteger(value) && value > 0) void proveReputation(BigInt(value)).catch(() => undefined); }}><Check size={17} /> Generate proof</button>
        </article>
      </div>
      <CopyField label="Connected contract" value={contractAddress} />
    </section>
  );
}
