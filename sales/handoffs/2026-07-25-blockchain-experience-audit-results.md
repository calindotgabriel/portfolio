# Blockchain Experience Evidence Audit Results — 2026-07-25

## Outcome

Calin can truthfully claim **blockchain-domain backend experience in institutional crypto custody** and **backend work supporting a blockchain-integrated custody product**. The repository supports production ownership of a crypto address-book backend for managing and validating withdrawal addresses, plus service-to-service authentication and backend testing.

The repository does **not** establish direct blockchain-protocol integration. It contains no verified claim that Calin personally integrated chain nodes or RPC providers, signed or broadcast transactions, processed on-chain events, handled confirmations or reorgs, developed smart contracts, managed private keys or HSMs, or implemented a P2P protocol.

The distinction must stay explicit:

- **Supported:** application/service-layer backend work in the blockchain and digital-asset custody domain.
- **Not established:** direct chain/protocol integration ownership.

## Observed Signal and Diagnosis

- Signal: one submitted Tether application for a backend blockchain-integrations role exposed “blockchain integration” as a profile-matching gap.
- Sample size: one application and no reply or interview feedback yet.
- Diagnosis: this is primarily a **proof-label and specificity gap**, not evidence that Calin lacks relevant blockchain-domain experience. Existing material uses “crypto custody” and “crypto address-book” but does not label the boundary between application-layer custody work and protocol-layer chain integration.
- Canonical-positioning decision: do not broaden Calin's headline to “blockchain integration engineer” from this single signal.

## Claim-by-Claim Evidence Audit

| Candidate claim | Status | Repository evidence | Safe interpretation |
| --- | --- | --- | --- |
| Worked on an institutional crypto-custody platform for banks | Verified | `src/data/resume.ts:53,74`; `src/pages/projects/bitpanda-custody.astro:9`; `docs/interview-narrative.md:20` | Strong domain claim. |
| Built blockchain-integrated backend systems | Qualified only | The product is a crypto-custody platform and the feature manages crypto withdrawal addresses, but no direct chain interface is documented: `src/data/resume.ts:74-75`; `src/pages/projects/bitpanda-custody.astro:9-17` | Use only as “backend work supporting a blockchain-integrated custody product,” not as direct protocol integration. |
| Owned a production crypto address-book backend end to end | Verified | `src/data/resume.ts:75`; `src/pages/projects/bitpanda-custody.astro:17,26,32`; `docs/interview-narrative.md:21-23` | Strongest specific proof. |
| Managed and validated customer crypto withdrawal addresses | Verified | `src/data/resume.ts:75`; `src/pages/projects/bitpanda-custody.astro:10,17,25`; `docs/interview-narrative.md:20-22` | Safe if described as address management and validation, not withdrawal execution. |
| Designed the API, data model, validation rules, tests, and release | Verified in the current case-study/narrative sources | `src/pages/projects/bitpanda-custody.astro:26`; `docs/interview-narrative.md:22` | Safe as application-layer feature ownership. Do not infer chain calls. |
| Strengthened authentication between backend services | Verified | `src/data/resume.ts:76`; `src/pages/projects/bitpanda-custody.astro:18,27`; `docs/interview-narrative.md:30-33` | Strong security/reliability-adjacent proof. |
| Introduced backend testing patterns adopted by the team | Verified | `src/data/resume.ts:76`; `src/pages/projects/bitpanda-custody.astro:18,28,34`; `docs/interview-narrative.md:32-33` | Strong quality proof. |
| Worked with crypto wallets | Partially supported, but requires precise wording | Bitpanda evidence concerns institutional custody and an address book. WIP evidence concerns an e-commerce mobile wallet with balances, payments, deposits, withdrawals, and transaction history: `src/data/resume.ts:124-127`. | Say “custody backend and an earlier e-commerce wallet.” Do not describe the WIP wallet as a crypto wallet. |
| Integrated blockchain nodes, RPC APIs, indexers, or third-party chain providers | Not established | No supporting repository source or relevant historical tracked claim found. | Do not claim without Calin confirmation and specific project evidence. |
| Signed or broadcast blockchain transactions | Not established | No supporting repository source or relevant historical tracked claim found. | Prohibited until confirmed. |
| Processed on-chain events, confirmations, failed transactions, or reorgs | Not established | No supporting repository source or relevant historical tracked claim found. | Prohibited until confirmed. |
| Owned wallet key management, private keys, custody signing, HSMs, or MPC | Not established | No supporting repository source or relevant historical tracked claim found. | Prohibited until confirmed. |
| Developed or integrated smart contracts | Not established | No supporting repository source or relevant historical tracked claim found. | Prohibited until confirmed. |
| Built a production P2P protocol or Hyperswarm integration | Explicitly not claimed | `sales/accounts/tether.md:31,44,54,62` | Continue saying there is no direct production P2P experience. |

## Repository-History Check

- The Bitpanda role and its institutional-custody/address-book claims first appear in commit `f1f02267f93a513ab0ef720d2d838d5c4fd4c9c3` (`Add Bitpanda role to resume and homepage`), authored by Calin Gabriel on 2026-06-13.
- Later commits reframe and expand the same custody/address-book/auth/testing material but do not add verified node, RPC, signing, broadcasting, smart-contract, key-management, on-chain-event, or protocol-integration ownership.
- A history-wide search found “blockchain” language in prospecting material about target companies, not additional evidence about Calin's delivered work.

## Strongest Safe Wording

### Compact profile wording

> Backend experience in institutional crypto custody, including a production address-book service for managing and validating customer crypto withdrawal addresses.

### Bitpanda experience wording

> Built backend features for a bank-facing institutional crypto-custody platform, owning a production crypto address-book for managing and validating withdrawal addresses, and strengthening service authentication and testing.

### When specifically asked about blockchain integration

> My blockchain experience is on the application and service layer of an institutional crypto-custody platform. At Bitpanda, I owned the backend for a production crypto address book that managed and validated customer withdrawal addresses; I have not claimed direct ownership of node/RPC integration, transaction signing or broadcasting, or P2P protocols.

### Very short skills/profile label

> Digital-asset custody backends · Crypto address management and validation

## Prohibited or Unsupported Overclaims

Do not use any of the following unless Calin confirms the underlying work and provides enough detail to document it:

- “Implemented blockchain integrations.”
- “Integrated multiple blockchains” or “integrated blockchain nodes/providers.”
- “Built crypto-wallet integrations” when referring to the WIP e-commerce wallet.
- “Built withdrawal processing” or “executed on-chain withdrawals.” The current evidence supports management and validation of addresses used for withdrawals.
- “Signed/broadcast transactions.”
- “Owned wallet/key-management infrastructure,” “HSM,” “MPC,” or “private-key security.”
- “Processed on-chain events,” “handled confirmations/reorgs,” or “built indexers.”
- “Developed smart contracts.”
- “Built P2P systems” or “worked with Hyperswarm.”
- “Blockchain engineer” or “blockchain integration engineer” as a general title.

## Facts Requiring Calin Confirmation

Before strengthening the claim, Calin should answer these with a concrete Bitpanda example:

1. Did the address validation call a blockchain node, RPC endpoint, chain SDK, custody API, explorer/indexer, or third-party provider?
2. Were validation rules chain-specific, such as network selection, address formats, checksums, memo/tag requirements, or asset/network compatibility?
3. Did Calin personally implement any transaction construction, signing request, broadcasting, status tracking, confirmations, or retry/idempotency behavior?
4. Did he consume on-chain events or handle chain reorganizations, finality, failed transactions, or fee estimation?
5. Did he work with wallet/key-management systems, HSMs, MPC, or access controls around signing?
6. Which chains or digital assets, if any, can be named without breaching confidentiality?
7. Was “auditability” implemented through concrete audit logs or controls owned by Calin, or is it only platform context?

Until those answers are confirmed, the audit's safe wording is the ceiling.

## Recommended Placement

| Asset | Recommendation |
| --- | --- |
| Bitpanda experience | Use the specific custody/address-book sentence above. This is the best placement because it keeps the domain and implementation boundary together. |
| Professional summary | Optional compact phrase: “institutional crypto-custody backend experience.” Do not promote “blockchain integrations” into the headline. |
| Skills | Add domain labels only if space permits: “Digital-asset custody” and “Crypto address validation.” Do not add standalone “Blockchain integration.” |
| Private application answers | Use the qualified blockchain-integration answer above, then answer follow-up questions about nodes, RPC, signing, transactions, or P2P directly and honestly. |
| Public case study | Existing specificity is sufficient. No change is justified until Calin confirms one or more missing protocol-layer facts. |

## Proposed Proof Experiment

- Improvement: test the qualified phrase “application-layer backend work on an institutional crypto-custody platform” in relevant private applications or recruiter conversations.
- Hypothesis: precise domain wording will preserve credibility while making the blockchain relevance easier to recognize.
- Audience: qualified blockchain, custody, payments, or digital-asset backend roles.
- Success measure: a recruiter or interviewer advances the application or asks a substantive technical follow-up about custody/address integration.
- Keep/change/kill rule: keep after two relevant positive responses; revise if two interviewers independently misunderstand it as direct chain ownership; kill if Calin cannot substantiate the address-management details in a technical interview.
- Rollback: return to “institutional crypto-custody backend” without any integration wording.
- Affected assets: private answers first; no canonical CV, proposal, public profile, or case-study edit from this audit.

## Complete Handoff to Lead Contract Sales

- Objective completed: strongest truthful blockchain-experience wording identified.
- Evidence: repository sources and tracked history distinguish custody application/backend ownership from unverified protocol integration.
- Deliverable: this audit, including claim table, wording, overclaims, confirmation questions, placement guidance, and experiment.
- Recommendation: use the qualified private-answer wording only; keep “blockchain integration” out of the standalone skills/headline until Calin confirms protocol-layer work.
- Blocker: direct chain/protocol responsibilities remain unknown and require Calin's factual confirmation.
- Next owner: Lead Contract Sales.
- Due date: 2026-07-25.
- External action: none performed. No resume, profile, proposal, public asset, application, or message was edited or sent.
