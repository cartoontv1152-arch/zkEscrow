import { ArrowRight, CloudArrowUp, LinkSimple, LockKey } from '@phosphor-icons/react';
import { useState } from 'react';

export function ContractGate({ deploy, join, busy, detectedAddress }: {
  deploy: () => void;
  join: (address: string) => void;
  busy: boolean;
  detectedAddress?: string;
}) {
  const [address, setAddress] = useState(detectedAddress ?? '');
  return (
    <main className="gate-page">
      <header className="gate-nav container">
        <a className="brand" href="/"><span className="brand-mark"><LockKey size={18} weight="fill" /></span>zkEscrow</a>
        <span className="network-chip">Midnight Preprod</span>
      </header>
      <section className="gate container">
        <div className="gate-intro">
          <span className="step-number">PRIVATE WORKSPACE</span>
          <h1>Choose the on-chain workspace.</h1>
          <p>Deploy a new shared escrow registry or join the contract address from an invitation.</p>
        </div>
        <div className="gate-options">
          <article className="gate-option accent-surface">
            <CloudArrowUp size={30} />
            <h2>Deploy new contract</h2>
            <p>Your wallet creates one zkEscrow registry on Preprod. Every deal is then written to this address.</p>
            <button className="button button-primary" type="button" onClick={deploy} disabled={busy}>Deploy to Preprod <ArrowRight size={18} /></button>
          </article>
          <article className="gate-option">
            <LinkSimple size={30} />
            <h2>Join existing contract</h2>
            <p>Paste a 64-character contract address. Invitation links fill this automatically.</p>
            <label className="field">
              <span>Contract address</span>
              <input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="64-character address" autoComplete="off" spellCheck={false} />
            </label>
            <button className="button button-secondary" type="button" onClick={() => join(address)} disabled={busy || address.trim().length !== 64}>Join contract <ArrowRight size={18} /></button>
          </article>
        </div>
      </section>
    </main>
  );
}
