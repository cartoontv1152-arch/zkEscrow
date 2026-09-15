# zkEscrow

zkEscrow is a Midnight Preprod DApp for milestone-based escrow. A buyer creates a private agreement, invites a seller and (when needed) an independent arbitrator, and funds native unshielded tNIGHT. The Compact contract enforces role authorization, milestone deadlines, delivery commitments, refunds, dispute settlement, and seller completion counters.

This repository is a testnet release. Preprod tNIGHT and tDUST have no monetary value, and the contract has not been audited for mainnet or real-value use.

## Live Preprod deployment

| Item | Value |
| --- | --- |
| Application | [zkescrow-preprod.vercel.app](https://zkescrow-preprod.vercel.app) |
| Network | Midnight Preprod |
| Shared registry | `261c0e021728ed568f7b4796849d38ad117f3df7e0d92ada9959d60f2b035011` |
| Contract status | All 16 verifier-key circuits installed |
| Operator route | `https://zkescrow-preprod.vercel.app/?admin=1` |

The normal application automatically uses the shared registry after wallet connection. Users do not need to deploy a contract, know its address, or use the operator route.

## Why zkEscrow

Traditional escrow products ask users to trust a platform with both their agreement data and their funds. zkEscrow explores a different model:

- The Midnight contract, rather than the website operator, enforces who can move escrowed funds and when.
- Sensitive agreement and evidence text stays off the public ledger; the contract stores commitments that allow clients to detect tampering.
- Milestones make payment incremental, reducing the amount at risk during a long project.
- Time-based release and refund paths keep an unresponsive participant from freezing every deal permanently.
- Independent arbitration is available for contested outcomes without making an arbitrator part of every successful payment.

The current release is most useful for testing freelance work, service contracts, deliverable-based projects, and other buyer/seller agreements on Midnight Preprod.

## How a deal works

1. **Connect:** each participant connects a compatible wallet on Midnight Preprod.
2. **Create:** the buyer defines the private agreement, total amount, deadlines, and up to twelve milestones.
3. **Invite:** zkEscrow creates encrypted invitation links for the seller and arbitrator. The URL fragment containing the secret is not sent to the web server.
4. **Accept:** the seller opens their link, verifies the agreement details, and accepts on-chain.
5. **Assign arbitration:** the invited independent arbitrator can claim the role before a dispute is opened.
6. **Fund:** the buyer deposits the agreed native unshielded tNIGHT into the registry contract.
7. **Deliver and review:** the seller commits delivery evidence for each milestone. The buyer can approve it, or the seller can use time-based release after the review cutoff.
8. **Resolve exceptions:** eligible participants can use late-delivery refunds, a cooperative refund, cancellation before funding, or arbitration.
9. **Complete:** released and refunded amounts must reconcile with the funded balance. The seller's pseudonymous completion counter is updated when applicable.

Every state-changing action produces a transaction receipt with its transaction identifier and finalized block height.

## What is implemented

- Create one to twelve milestones with amount, delivery deadline, review cutoff, and a private label.
- Encrypt agreement metadata in each invitation with AES-256-GCM. The recipient decrypts it locally and verifies the metadata commitment against the ledger.
- Accept and fund an escrow, submit delivery commitments, approve milestones, or auto-release after the review cutoff.
- Claim a per-milestone late-delivery refund without cancelling milestones that are still in progress.
- Request/approve a remaining-balance refund and cancel an unfunded escrow.
- Require an independent arbitrator before a participant can open a dispute; submit evidence commitments and atomically split the remaining balance.
- Generate the seller's threshold completion proof from the contract's pseudonymous counter.
- Show ledger-derived balances, roles, milestone state, transaction receipts, invite recovery secrets, and responsive light/dark interfaces.

## Privacy model

Agreement text, milestone labels, and evidence text are not written to the public ledger. The chain stores their cryptographic commitments plus public amounts, deadlines, payout addresses, role keys, and lifecycle state. Invitation metadata is carried in an encrypted URL fragment and is stored in the browser's local storage after successful verification.

The role key is pseudonymous and stable for the browser recovery secret. Reusing that secret links its roles on the same registry; it is not an unlinkability guarantee. Evidence is currently commitment-only: the underlying file or reference must be exchanged with the arbitrator through a separate secure channel. zkEscrow does not host or retrieve evidence.

### Public and private data

| Public on Preprod | Kept off-chain/private |
| --- | --- |
| Escrow amounts and released/refunded totals | Agreement title and description |
| Milestone and lifecycle status | Milestone labels |
| Delivery and review deadlines | Evidence text or original files |
| Payout addresses and pseudonymous role keys | Invitation and identity recovery secrets |
| Cryptographic commitments | Decrypted invitation metadata |

Privacy depends on protecting invitation and identity secrets. A commitment proves that data has not changed; it does not hide public values such as amounts or deadlines and does not prove that an evidence claim is true.

## Contract lifecycle

```text
DRAFT -> ACCEPTED -> FUNDED -> IN_PROGRESS -> COMPLETED
   |         |          |          |
   +---- CANCELLED      +----------+-> REFUNDED
                        +----------+-> DISPUTED -> SETTLED
                                      |
                                      +-> SETTLED (mixed milestone payment/refund)
```

The entry points are `createDeal`, `addMilestone`, `acceptDeal`, `claimArbitrator`, `fundDeal`, `submitMilestone`, `approveMilestone`, `autoReleaseMilestone`, `requestRefund`, `approveRefund`, `claimLateRefund`, `cancelUnfunded`, `openDispute`, `submitDisputeEvidence`, `resolveDispute`, and `proveCompletedAtLeast`.

The contract rejects over-allocation, expired acceptance/funding, invalid deadline ordering, participant self-dealing, non-independent arbitrators, repeated claims, premature auto-release, invalid lifecycle transitions, role violations, mismatched dispute awards, and counter overflow.

## Repository layout

```text
contract/  Compact source, generated bindings/keys, witnesses, simulator tests
api/       Ledger readers, role mapping, commitments, encryption, amount/date helpers
ui/        React/Vite DApp, wallet bridge, local private state, product UI
scripts/   Compact compilation and browser-artifact copy scripts
```

The generated Compact output under `contract/src/managed/zkescrow` is part of the deployable source tree. `npm run build` copies its proving keys and ZKIR files into `ui/public` for the browser bundle.

## Requirements

- Node.js 24 or newer.
- WSL2 with Ubuntu on Windows for the Compact compiler.
- Compact CLI 0.5.x with compiler `+0.31.1`.
- A Midnight DApp Connector 4.x wallet (1AM or Lace), configured for Preprod and funded with test tNIGHT and tDUST.
- Lace requires a compatible local proof server, `midnightntwrk/proof-server:8.1.0`, reachable at `http://localhost:6300`. 1AM can use its in-browser prover.

The package line is pinned for the current Ledger 8 Preprod setup: Midnight.js `4.1.1`, Compact runtime `0.16.0`, DApp Connector `4.0.1`, and generated contract artifacts from Compact compiler `0.31.1`.

## Install, compile, test, and build

```powershell
npm install
npm run compact
npm run typecheck
npm test
npm run build
```

Run the UI locally:

```powershell
npm run dev -w ui -- --host 0.0.0.0
```

Preview the production bundle:

```powershell
npm run preview -w ui -- --host 0.0.0.0
```

The wallet extension must be allowed to access the selected origin. The browser connects to the node, indexer, and (where required) proof server supplied by the wallet's Preprod configuration; no private key or RPC secret is committed in this repository.

## Vercel deployment

The repository includes `vercel.json` with the monorepo build and output settings:

- install: `npm install`
- build: `npm run build`
- output: `ui/dist`

Production uses one shared on-chain registry. Set its public 64-character Preprod address before building:

```powershell
$env:VITE_ZKESCROW_CONTRACT_ADDRESS="<deployed-contract-address>"
```

On Vercel, add `VITE_ZKESCROW_CONTRACT_ADDRESS` to the Production environment. After wallet connection the DApp joins this registry automatically; ordinary users never deploy a contract or paste an address. The legacy deployment/join controls are available only to an operator at `/?admin=1` for initial setup or diagnostics.

The operator deployment is staged to stay within current Preprod block limits: seven core circuit verifier keys are deployed first, then the remaining nine are installed through signed contract-maintenance transactions. Keep the wallet and operator page open until all ten transactions finalize; if a maintenance transaction is interrupted, click **Deploy to Preprod** again in the same page session to resume.

The setup flow re-checks contract state before every maintenance transaction. It automatically waits and retries when the wallet still has a pending transaction or the Preprod transaction pool temporarily bans a recently rejected transaction. An unfinished registry address and its maintenance key are retained in session storage so a refresh in the same tab can resume instead of deploying a duplicate registry. Closing the tab clears this session-only recovery data.

Deploy from the repository root after authenticating with the Vercel CLI or connecting the repository in the Vercel dashboard:

```powershell
npx vercel login
npx vercel --prod
```

Vercel hosts the static DApp only. Users still need a Preprod wallet, test funds, and a compatible proof server. A deployment cannot perform a wallet transaction or hide the public Preprod contract state.

## Verification status

The automated suite covers Compact simulator protocol tests, API helpers, and UI action logic. A real wallet/proof-server E2E flow must be run in a browser with a connected Preprod wallet; headless CI cannot approve wallet prompts. Before announcing a deployment, connect a funded test wallet and verify: contract deployment/join, seller acceptance, arbitrator claim, funding, milestone submit/approve, timeout refund, dispute resolution, recovery-secret import, and transaction receipt display.

The current release passes all 22 automated tests, TypeScript checks for all workspaces, and the production Vite build. The shared Preprod registry was also verified through the public indexer with all 16 operations installed.

## Current limitations

- This is a Preprod demonstration, not an audited production financial product.
- Agreement metadata and recovery material are browser-managed; there is no encrypted cross-device synchronization yet.
- Evidence is committed on-chain but must be exchanged and stored outside zkEscrow.
- The release supports the native unshielded test token flow only.
- There is no arbitrator discovery, fee market, messaging, or notification service.
- Contract upgrades require an operator-controlled maintenance process and a documented migration plan.
- Wallet prompts and proof generation can take time, especially during network congestion or when using a local prover.

## Future roadmap

The following items are proposed improvements, not features promised by the current release. They are ordered roughly by user impact and implementation risk.

### Near-term usability

- **Guided onboarding:** detect the selected network, wallet compatibility, test-token balance, DUST balance, and prover availability before a user begins a deal.
- **Persistent transaction center:** show proving, wallet approval, submission, indexing, retry, and finalization as distinct steps with explorer links and actionable recovery guidance.
- **Safer recovery:** add an encrypted, user-controlled export for identities, private metadata, invitations, and contract-maintenance credentials.
- **Invitation management:** add expiry, revocation before acceptance, QR sharing, role-specific previews, and warnings before a user reveals or forwards a secret.
- **Deadline notifications:** optional browser, email, or push reminders for acceptance, funding, delivery, review, auto-release, and refund windows without exposing agreement content.
- **Accessibility and localization:** complete keyboard and screen-reader testing, clearer transaction language, locale-aware dates, and translated interfaces.

### Product capabilities

- **Encrypted evidence vault:** client-side encrypted file attachments stored through a content-addressed service, with hashes committed on-chain and controlled access for deal participants.
- **Agreement templates:** reusable milestone structures for common freelance, software, design, consulting, and marketplace workflows.
- **Mutual amendments:** allow buyer and seller to jointly approve deadline, milestone, or scope changes while preserving a complete agreement history.
- **Funding flexibility:** evaluate partial funding, approved top-ups, deposits, and additional supported assets without weakening balance invariants.
- **Better disputes:** structured claims, responses, evidence timelines, decision explanations, and explicit arbitrator fee handling.
- **Arbitrator marketplace:** opt-in arbitrator profiles, availability, specialties, fees, conflict checks, and privacy-preserving performance attestations.
- **Portable reputation:** expand threshold proofs so sellers can demonstrate useful completion or dispute-rate ranges without publishing their entire work history.
- **Team and marketplace integrations:** multi-signer organizations, project-platform APIs, webhooks, and embeddable checkout or deal-status components.

### Security and production readiness

- Commission an independent Compact contract, cryptography, frontend, and operational security audit.
- Add property-based tests, invariant fuzzing, adversarial deadline tests, and wallet-backed end-to-end tests in CI.
- Version the registry and define upgrade, rollback, and state-migration procedures before changing deployed contract logic.
- Replace browser-only private-state storage with encrypted durable storage and explicit backup/restore controls.
- Add privacy-preserving reliability monitoring for indexer, prover, wallet, and transaction-finalization failures.
- Perform load, proof-generation, accessibility, recovery, and incident-response testing before considering a mainnet release.

## Contributing

Keep changes focused and include tests for contract invariants, API behavior, or UI action logic as appropriate. Before opening a change, run:

```powershell
npm run typecheck
npm test
npm run build
```

Contract changes must regenerate the managed Compact artifacts with `npm run compact`. Never commit wallet seeds, identity recovery secrets, invitation secrets, maintenance signing keys, or real credentials.

## Security and operational notes

- Invite secrets and the browser identity secret are credentials. Share them only with the intended recipient and keep a recovery copy.
- Clearing session storage removes the active role identity; import the recovery secret to regain access.
- Private metadata is browser-local. Clearing local storage removes readable labels and descriptions, while the public commitments remain on-chain.
- Evidence commitments prove that a value was committed, not what the underlying evidence says. Exchange the original evidence out of band.
- Run an independent security review before using real-value assets or deploying a new contract version.
