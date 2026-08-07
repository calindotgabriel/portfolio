# Cluj Market Scout — 2026-08-07

**Result: 0 verified rows. `sales/pipeline.csv` was not modified.**

This is a tooling failure, not a market finding. Every outbound HTTPS request to every
job-bearing domain was refused by the session's egress proxy, so no listing could be
observed and therefore no listing could honestly be filed.

## Handoff

- Objective: find 8–15 currently live Node.js/TypeScript/backend/full-stack openings workable
  from Cluj-Napoca (on-site, hybrid, or Romania-wide remote), score them on the
  permanent/contract rubrics, and append verified rows to the pipeline.
- Track: contract and permanent (both in scope)
- Inputs and file paths:
  - `sales/operating-system.md` (gate model, rubrics, truth rules) — read
  - `sales/core-proposal.md` (commercial bands) — read
  - `docs/market-fit-plan.md` (Cluj section) — read
  - `src/data/resumeDraft.ts` (canonical CV) — read
  - `sales/pipeline.csv` (schema, 5 existing rows) — read, **unchanged**
- Output path: `sales/handoffs/2026-08-07-cluj-market-scout.md` (this file)
- Verified evidence: none obtainable — see the blocker section
- Required deliverable: verified pipeline rows — **not produced, and deliberately not faked**
- Recommendation: re-run this batch from a session with unrestricted outbound HTTPS
- Blockers or unknowns: total egress block on job-listing domains (below)
- Next owner: Lead Job Search
- Due date: next session with working network egress
- External action: Draft only; Calin approval required. Nothing was applied to, sent, or contacted.

## The blocker

Outbound HTTPS in this session is tunnelled through a policy-enforcing egress proxy. Requests
to non-allowlisted hosts are refused at CONNECT with HTTP 403 before any content is returned.

Reproduced directly on the command line:

```
$ curl -sS -o /dev/null -w "%{http_code}\n" https://www.fortech.ro/careers/
curl: (56) CONNECT tunnel failed, response 403
```

`/root/.ccr/README.md` is explicit that a 403/407 from the proxy means the destination is not
allowed by the organization's egress policy for this session, and that it must be reported
rather than retried or routed around. That instruction was followed — no attempt was made to
bypass the policy.

`WebSearch` still functions, because it does not egress through the same path. It returned
result titles and aggregator URLs (Glassdoor listing pages for Cluj JavaScript / full-stack /
Node roles, and a model-written prose summary naming companies such as Softex, AXON Soft,
Accenture, TEC, Emerson, DataArt, Garmin Cluj, Artsoft and MassMutual Romania). **None of that
was used to create a row.** A search-result snippet is not an observed listing: it carries no
verified role title, no work model, no location, no stack, no posting date, and no evidence the
opening is still open. Filing rows from it would have been exactly the failure mode the truth
rules forbid.

## Employers and sources checked

All 16 hosts below were requested this session. Every one was refused by the egress proxy
before any page content was returned. None could be verified, and the failure reason is
identical in every case — **blocked by egress policy**, not "JS-rendered", not "no Node roles",
not "career page dead". Those distinctions could not be established, because no page was ever
seen.

| Target | Host requested | Outcome |
| --- | --- | --- |
| Endava (former employer, Cluj office) | `careers.endava.com` | EGRESS_BLOCKED |
| Accesa | `www.accesa.eu` | EGRESS_BLOCKED |
| Arobs | `arobs.com` | EGRESS_BLOCKED |
| Fortech | `www.fortech.ro` | 403 CONNECT (curl) |
| Banca Transilvania (Cluj HQ, in-house tech) | `www.bancatransilvania.ro` | EGRESS_BLOCKED |
| UiPath | `www.uipath.com` | EGRESS_BLOCKED |
| ejobs.ro | `www.ejobs.ro` | Fetch failed |
| bestjobs.eu | `www.bestjobs.eu` | EGRESS_BLOCKED |
| hipo.ro | `www.hipo.ro` | EGRESS_BLOCKED |
| LinkedIn Jobs | `www.linkedin.com` | EGRESS_BLOCKED |
| Glassdoor (from WebSearch results) | `www.glassdoor.com` | EGRESS_BLOCKED |
| Himalayas (source of an existing pipeline row) | `himalayas.app` | EGRESS_BLOCKED |
| RemoteOK | `remoteok.com` | EGRESS_BLOCKED |
| Lever ATS | `jobs.lever.co` | EGRESS_BLOCKED |
| Greenhouse ATS | `boards.greenhouse.io` | EGRESS_BLOCKED |
| Workable ATS | `apply.workable.com` | EGRESS_BLOCKED |
| SmartRecruiters ATS | `careers.smartrecruiters.com` | EGRESS_BLOCKED |
| Control probe (general web) | `en.wikipedia.org` | EGRESS_BLOCKED |
| Control probe (known-allowed) | `github.com` | **200 OK** |

The two control probes matter. `github.com` returned real content, which proves the fetch tool
itself works and the CA/proxy chain is healthy. `en.wikipedia.org` was refused, which proves the
allowlist is narrow and general-purpose rather than something specific to recruitment sites.
The block is categorical.

Not reached at all, because the pattern was already conclusive after 18 probes: NTT Data
Romania, Cognizant Softvision, 3Pillar Global, Yardi Romania, Bosch Cluj, Emerson Cluj,
Telenav, Halcyon Mobile, Wolfpack Digital, Tapptitude, Zitec, Betfair/Flutter Romania, and the
Cluj IT cluster listings. There is no reason to expect a different outcome for any of them, and
continuing to probe would have burned the session's time budget without producing evidence.

## Rows added

None. Scores are not reported for any employer, because a fit score computed against an
unverified opening is a number with no evidence behind it, and recording one would give a guess
the appearance of research.

## Three strongest opportunities

Cannot be stated. Ranking requires at least one verified opening, and there are zero.

What survives from the prior research — as a **prioritised target list to work first next
session, not as findings** — is the segment ordering already recorded in
`docs/market-fit-plan.md`:

1. **Banca Transilvania** — Cluj HQ with a substantial in-house technology arm; the closest
   available match to the Bitpanda regulated-fintech proof.
2. **Endava** — former employer with a Cluj office; the boomerang channel in
   `sales/operating-system.md` is a legitimate, evidence-backed path needing no referral.
3. **Accesa / Fortech / Arobs / NTT Data / Cognizant Softvision** — Cluj services firms that
   hire Node/TS continuously and run faster processes, which serves the interview-rep goal that
   EXP-002 is actually chasing.

These are research starting points. Not one of them has a confirmed live opening as of
2026-08-07.

## What must happen next

1. Re-run this scout from a session with unrestricted outbound HTTPS, or have the egress
   allowlist extended to first-party career domains and the major ATS hosts
   (`careers.endava.com`, `accesa.eu`, `fortech.ro`, `arobs.com`, `bancatransilvania.ro`,
   plus `*.lever.co`, `*.greenhouse.io`, `*.workable.com`, `*.smartrecruiters.com`,
   `*.myworkdayjobs.com`, `linkedin.com`, `ejobs.ro`, `hipo.ro`, `bestjobs.eu`).
2. Until then, do not treat the absence of Cluj rows in the pipeline as evidence about the Cluj
   market. Nothing was learned about the market today. The correct reading of this batch is
   "the instrument was disconnected", and per `sales/operating-system.md` a zero-activation
   batch is a calibration incident — but that rule assumes opportunities were actually
   reviewed. Here, none were, so the gates are not implicated and must not be loosened in
   response to this result.
3. The daily loop is unaffected. Post-mortems and training are not blocked by this failure and
   remain the priority per EXP-002.
