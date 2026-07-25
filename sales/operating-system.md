# Contract Sales Operating System

## Win Condition

Land one long-term remote-EU Node.js/TypeScript B2B contract within 30 days.

- Funnel: 30 qualified targets → 20 tailored contacts/applications → 5 replies → 3 interviews → 1 contract.
- Commercial posture: anchor qualified work at €55–65/hour; never accept or recommend below €40/hour B2B.
- Authority: agents research, recommend, and draft. Calin approves and performs every external action.
- Coordination: the lead chat owns prioritization. Specialist chats work only from a lead handoff.

## Canonical Files

- `sales/core-proposal.md`: current offer, proof, segment variants, and experiment history.
- `sales/pipeline.csv`: canonical account status, ownership, and next action.
- `sales/accounts/<slug>.md`: evidence, hypotheses, strategy, drafts, conversations, and outcome for one account.
- `sales/daily/YYYY-MM-DD.md`: assignments, handoffs, funnel metrics, results, and decisions.
- `docs/market-fit-plan.md` and `docs/interview-narrative.md`: source positioning and verified story guidance.

## Target Score: 100 Points

| Component | Maximum | Scoring guidance |
| --- | ---: | --- |
| Technical and domain fit | 25 | Node/TypeScript plus fintech, payments, custody, DACH product, migration, performance, or data-heavy overlap |
| Active hiring or contract signal | 25 | Current first-party opening or explicit contract need scores highest; unverified flexibility scores low |
| Relevance of Calin's proof | 20 | A direct Bitpanda, RWE, ImmoScout24, or Endava story maps to the observed need |
| Remote-EU compatibility | 15 | Remote from Romania, EU engagement, timezone, and B2B eligibility are evidenced |
| Reachable contact path | 10 | Warm referral, named recruiter, role owner, engineering leader, or direct application path |
| Likely rate viability | 5 | Published budget or credible senior-market signal; use `unknown` when unsupported |

Only accounts with at least 70/100 and dated evidence enter active outreach. Show all component scores. Never award points for an invented assumption.

## Pipeline Statuses

Use only: `researching`, `qualified`, `angle-ready`, `draft-ready`, `awaiting-approval`, `contacted`, `replied`, `interviewing`, `negotiating`, `won`, `lost`, `nurture`, `rejected`.

## Role Handoff Contract

Every handoff must contain:

```md
## Handoff

- Objective:
- Inputs and file paths:
- Output path:
- Verified evidence:
- Required deliverable:
- Recommendation:
- Blockers or unknowns:
- Next owner:
- Due date:
- External action: Draft only; Calin approval required.
```

The receiving agent must be able to act without reading another chat. Write missing context into the account or daily file before handing off.

The `Output path` is authoritative. If a later instruction requests another path, the receiving agent must stop and return the conflict to the lead without writing. When a path legitimately changes, the lead must revise the source handoff before work begins. The lead must not advance the workflow until the artifact exists at the assigned path and its return handoff points back to the lead.

## Simulation Mode

When any controlling input declares itself fictional, a fixture, a forward test, or a simulation:

- Confine every write to `sales/simulations/<slug>/`.
- Use fixture evidence in place of live URLs and do not browse unless the fixture explicitly permits it.
- Do not edit the live pipeline, live account files, daily funnel metrics, canonical proposal, portfolio, CV, source files, or public assets.
- Keep all live funnel counts unchanged and never activate the fictional company.
- Use `External action: Prohibited — fictional simulation; Calin approval does not authorize action.` in every handoff.
- Require lead review between stages in the same sequence as live work.
- Treat simulation outputs as validation evidence only, never as customer or market evidence.

## Daily Loop

1. Lead reviews pipeline, replies, meetings, overdue actions, and metrics.
2. Scout researches 3–5 current candidates without duplicating the pipeline.
3. Lead activates no more than two priority accounts.
4. Strategist creates one evidence-backed entry angle for each selected account.
5. Outbound specialist drafts the approved motion; Calin reviews and sends.
6. Closer handles active replies, meetings, qualification, and negotiation preparation.
7. Proof strategist proposes one evidence-based improvement or records that evidence is insufficient.
8. Lead records outcomes, experiment decisions, and tomorrow's first action.

## Truth and Safety Rules

- Keep `Verified facts`, `Hypotheses`, and `Unknowns` separate.
- Cite the source and observation date for live company facts.
- Never invent a stakeholder, relationship, opening, technology, budget, pain, result, or portfolio claim.
- Never send, post, apply, schedule, or promise externally.
- Never contact the same company from two chats.
- Do not alter public portfolio or CV claims without Calin's explicit approval.
- Daily iteration means inspect evidence daily; it does not require changing the canonical proposal daily.

## Persistent Chat Launch Prompts

Use one persistent Codex task per role. Replace `<skill>` and `<role>`:

> Load the repository-local skill at `/Users/mac/Documents/GitHub/portfolio/skills/<skill>/SKILL.md` and act as the `<role>` persistent agent. Read `/Users/mac/Documents/GitHub/portfolio/sales/operating-system.md` and the shared files required by the skill before working. Work only within this role, use file-based handoffs, and do not contact, apply, submit, schedule, or promise anything externally. Calin must approve and perform all external actions.
