import { ArrowRight, Check, CheckCircle, FileLock, Fingerprint, LockKey, MoneyWavy, Scales, ShieldCheck, UserFocus } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';

export function Landing({ connect, busy }: { connect: () => void; busy: boolean }) {
  const reduce = useReducedMotion();
  const enter = reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
  const reveal = reduce ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 } };
  return (
    <main className="landing">
      <nav className="landing-nav container" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="zkEscrow home"><span className="brand-mark"><LockKey size={18} weight="fill" /></span>zkEscrow</a>
        <button className="button button-secondary compact" type="button" onClick={connect} disabled={busy}>Connect wallet</button>
      </nav>

      <section id="top" className="hero container">
        <motion.div className="hero-copy" {...enter} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
          <p className="eyebrow">Built on Midnight</p>
          <h1>Private deals.<br />Verifiable settlement.</h1>
          <p className="hero-sub">Lock tNIGHT, pay milestones, and resolve disputes without publishing your commercial terms.</p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={connect} disabled={busy}>
              {busy ? 'Connecting' : 'Open zkEscrow'} <ArrowRight size={18} />
            </button>
            <a className="text-link" href="#protocol">See how it works</a>
          </div>
        </motion.div>
        <motion.figure className="hero-visual" {...(reduce ? {} : { initial: { opacity: 0, scale: 0.985 }, animate: { opacity: 1, scale: 1 } })} transition={{ duration: 0.7, delay: 0.08 }}>
          <img src="/hero-vault.png" alt="An architectural glass vault securing two converging streams of value" width="1536" height="1024" fetchPriority="high" />
          <figcaption><ShieldCheck size={18} weight="fill" /> Contract custody on Midnight Preprod</figcaption>
        </motion.figure>
      </section>

      <section id="protocol" className="protocol container">
        <div className="protocol-heading">
          <h2>The agreement stays yours.</h2>
          <p>Only commitments and settlement state reach the public ledger. The contract still enforces every payment rule.</p>
        </div>
        <div className="protocol-grid">
          <article className="protocol-primary">
            <Fingerprint size={34} />
            <h3>Prove your role, not your identity</h3>
            <p>Witness-derived keys authorize buyers, sellers, and arbitrators without tying actions to a public profile.</p>
          </article>
          <article><CheckCircle size={26} /><h3>Milestone release</h3><p>Approval transfers only the agreed tranche. The remainder stays locked.</p></article>
          <article><Scales size={26} /><h3>Private disputes</h3><p>Evidence is committed on-chain and split awards settle atomically.</p></article>
        </div>
      </section>

      <section className="settlement-band container">
        <div><span>Create</span><strong>Commit private terms</strong></div>
        <div><span>Fund</span><strong>Lock native tNIGHT</strong></div>
        <div><span>Settle</span><strong>Release by contract rule</strong></div>
      </section>

      <section className="journey container" aria-labelledby="journey-title">
        <motion.div className="journey-heading" {...reveal} transition={{ duration: 0.52 }}>
          <p className="eyebrow">One agreement, four proofs</p>
          <h2 id="journey-title">From private handshake to on-chain finality.</h2>
          <p>Every action produces a verifiable state transition. The contract moves the money; invite secrets prove who is allowed to ask.</p>
        </motion.div>
        <div className="journey-track">
          <motion.i className="journey-signal" aria-hidden="true" {...(reduce ? {} : { animate: { x: ['0%', '300%'] } })} transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }} />
          {[
            { icon: <FileLock size={23} />, label: 'Commit', title: 'Buyer seals the terms', copy: 'Agreement text is encrypted for invitees. Its hash anchors the deal.' },
            { icon: <UserFocus size={23} />, label: 'Accept', title: 'Seller proves the invite', copy: 'The circuit checks the secret and assigns a pseudonymous seller role.' },
            { icon: <MoneyWavy size={23} />, label: 'Fund', title: 'tNIGHT enters custody', copy: 'The exact milestone total is locked inside the Compact contract.' },
            { icon: <Check size={23} />, label: 'Release', title: 'Rules settle each tranche', copy: 'Approval, timeout, refund, or arbitration determines the next transfer.' },
          ].map((step, index) => (
            <motion.article key={step.label} {...reveal} transition={{ duration: 0.45, delay: index * 0.08 }}>
              <div className="journey-icon">{step.icon}</div>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="disclosure container" aria-labelledby="disclosure-title">
        <motion.div className="disclosure-copy" {...reveal} transition={{ duration: 0.52 }}>
          <p className="eyebrow">Selective disclosure</p>
          <h2 id="disclosure-title">Useful proof, without the unnecessary story.</h2>
          <p>Participants see what they need to complete the work. Everyone else sees only the state required to trust the settlement.</p>
          <button className="button button-primary" type="button" onClick={connect} disabled={busy}>Start a private escrow <ArrowRight size={18} /></button>
        </motion.div>
        <motion.div className="disclosure-ledger" {...reveal} transition={{ duration: 0.58, delay: 0.08 }}>
          <div className="ledger-header"><span>DISCLOSURE MAP</span><i /> <strong>PREPROD</strong></div>
          <div className="ledger-row private"><span>Agreement & deliverables</span><strong><FileLock size={17} /> Encrypted locally</strong></div>
          <div className="ledger-row private"><span>Role identity & evidence</span><strong><Fingerprint size={17} /> Commitment only</strong></div>
          <div className="ledger-row public"><span>Funds locked & released</span><strong><ShieldCheck size={17} /> Publicly verifiable</strong></div>
          <div className="ledger-row public"><span>Milestone lifecycle</span><strong><CheckCircle size={17} /> Publicly verifiable</strong></div>
          <div className="ledger-proof"><span>COMPLETED ESCROWS ≥ N</span><strong>TRUE</strong><small>Proved without revealing counterparties or deal history</small></div>
        </motion.div>
      </section>

      <footer className="landing-footer container">
        <a className="brand" href="#top"><span className="brand-mark"><LockKey size={18} weight="fill" /></span>zkEscrow</a>
        <p>Privacy-preserving commerce on Midnight Preprod.</p>
      </footer>
    </main>
  );
}
