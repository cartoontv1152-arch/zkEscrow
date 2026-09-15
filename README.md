# zkEscrow

zkEscrow is a Midnight Preprod DApp for milestone-based escrow. A buyer creates a private agreement, invites a seller and (when needed) an independent arbitrator, and funds native unshielded tNIGHT. The Compact contract enforces role authorization, milestone deadlines, delivery commitments, refunds, dispute settlement, and seller completion counters.

This repository is a testnet release. Preprod tNIGHT and tDUST have no monetary value, and the contract has not been audited for mainnet or real-value use.

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

Deploy from the repository root after authenticating with the Vercel CLI or connecting the repository in the Vercel dashboard:

```powershell
npx vercel login
npx vercel --prod
```

Vercel hosts the static DApp only. Users still need a Preprod wallet, test funds, and a compatible proof server. A deployment cannot perform a wallet transaction or hide the public Preprod contract state.

## Verification status

The automated suite covers Compact simulator protocol tests, API helpers, and UI action logic. A real wallet/proof-server E2E flow must be run in a browser with a connected Preprod wallet; headless CI cannot approve wallet prompts. Before announcing a deployment, connect a funded test wallet and verify: contract deployment/join, seller acceptance, arbitrator claim, funding, milestone submit/approve, timeout refund, dispute resolution, recovery-secret import, and transaction receipt display.

## Security and operational notes

- Invite secrets and the browser identity secret are credentials. Share them only with the intended recipient and keep a recovery copy.
- Clearing session storage removes the active role identity; import the recovery secret to regain access.
- Private metadata is browser-local. Clearing local storage removes readable labels and descriptions, while the public commitments remain on-chain.
- Evidence commitments prove that a value was committed, not what the underlying evidence says. Exchange the original evidence out of band.
- Run an independent security review before using real-value assets or deploying a new contract version.
