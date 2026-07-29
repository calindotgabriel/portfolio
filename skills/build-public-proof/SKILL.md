---
name: build-public-proof
description: Design, build, and ship inspectable public proof artifacts for Calin Gabriel — working repositories, technical write-ups, and demos that substitute for unavailable references. Use when a claim on the CV needs verifiable backing, when outreach lacks a credible hook, or before any repository is linked from the portfolio.
---

# Build Public Proof

Act as the proof engineer. Calin has no referenceable former colleagues and no warm introductions.
Every piece of third-party credibility must therefore be something a stranger can inspect without
asking anyone's permission. This role builds those artifacts.

## The Standing Failure This Prevents

The portfolio previously linked two repositories labelled **"Demo repo"** —
`calindotgabriel/immobile-search` and `calindotgabriel/energy-reporter`. Both contained a single
README and zero code. Every commit was "Update README.md". They returned HTTP 200, so a liveness
check passed, while a technical evaluator who clicked found an empty repository under a label
promising a demo. That is worse than no link: it reads as implying code that does not exist.

The links have been removed. They may only return when the repositories contain real, working code.

## Start Every Run

1. Read `sales/operating-system.md` (the Proof Constraint section), `sales/core-proposal.md`,
   `src/data/projects.ts`, and `src/data/resumeDraft.ts`.
2. Identify which CV claim the artifact is meant to substantiate. An artifact that proves nothing on
   the CV is a hobby project, not pipeline work.
3. Check what already exists before building something new.

## Artifact Selection

Rank candidates by how directly they back a claim already being sold:

1. **Backs the most-quoted metric.** The strongest candidate is a working Node/TypeScript service
   demonstrating CPU-bound work moved to worker pools, with before/after benchmarks — the honest,
   reproducible echo of "exports 45 min → 12 min" and "65% faster APIs". A stranger can run it and
   see the numbers.
2. **Backs the domain claim.** A validated API slice in the shape of the Bitpanda address-book work —
   validation as domain logic, failure modes, tests — without reproducing anything proprietary.
3. **Craft signal.** Real, tested code that shows architecture and discipline even when the domain
   does not match. `/Users/mac/Dev/swords-and-sandals` (Spore & Sigil) qualifies: clean `core/` /
   `ui/` / `scenes/` separation, vitest coverage, deterministic RNG, a simulation harness. Position
   it as craft, never as backend proof.

One substantial artifact beats four thin ones. Depth is the signal; a directory of stubs is an
anti-signal.

## Build Standard

An artifact is shippable only when all of these hold:

- It runs. A stranger can clone it, follow the README, and get the stated result.
- It contains real source code, not configuration and prose.
- Tests exist and pass.
- The README states what it demonstrates, how to run it, and what the measured result was.
- Any benchmark is reproducible, with the method and hardware stated. Never publish a number that
  cannot be regenerated.
- It contains no proprietary code, client data, or confidential detail from any former employer.
  Rebuild the *pattern* from public knowledge; never port the original.

## Publication Checklist

Before any artifact is linked from the portfolio, CV, or outreach:

- [ ] Repository is public.
- [ ] GitHub API `language` field is non-null.
- [ ] Contents include source files, not only a README.
- [ ] Description and topics are set.
- [ ] README explains the claim it backs.
- [ ] Tests pass from a clean clone.
- [ ] Verified by **inspecting contents**, never by checking that a URL returns 200.

Only then add it to `src/data/projects.ts` and the relevant case-study page.

## Technical Writing

One article per substantial artifact, published where it is publicly readable.

- Lead with the problem and the measurement, not the tooling.
- Show the before/after numbers and how they were obtained.
- Keep it truthful about scope: describe what the reproduction demonstrates, and keep any reference
  to the original employer engagement at the level already published on the CV.
- The article is the hook for direct outbound, which currently has none. Write it to be sendable.

## Guardrails

- Never link an artifact that has not passed the publication checklist.
- Never describe an artifact as a "demo" of client work. It is a reproduction of a technique.
- Never publish a benchmark that cannot be regenerated on request.
- Do not disclose employer-confidential architecture, data, or code.
- Portfolio and CV edits require Calin's explicit approval of the specific wording.

## Required Output

- The claim being substantiated and the artifact chosen to back it.
- Build plan with a scope small enough to actually finish.
- Completed publication checklist, with the contents inspection recorded.
- Proposed `projects.ts` entry and case-study copy.
- A handoff to the lead.
