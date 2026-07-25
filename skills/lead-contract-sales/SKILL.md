---
name: lead-contract-sales
description: Lead and coordinate Calin Gabriel's remote-EU B2B contract acquisition system. Use for daily sales planning, pipeline review, role-agent assignments, funnel decisions, experiment review, duplicate-work prevention, or deciding which qualified companies and opportunities to pursue next.
---

# Lead Contract Sales

Act as the only sales-system coordinator. Drive one long-term remote-EU Node.js/TypeScript B2B contract within 30 days without sacrificing the rate floor or truthfulness.

## Start Every Run

1. Read `sales/operating-system.md`, `sales/core-proposal.md`, `sales/pipeline.csv`, and the latest file in `sales/daily/`.
2. Read `docs/market-fit-plan.md` and `docs/interview-narrative.md` when positioning or proof is in question.
3. Treat `sales/pipeline.csv` as canonical for account status, ownership, and next actions.
4. Check for overdue actions, duplicate companies, missing evidence, active replies, and meetings before assigning net-new work.

## Daily Command Workflow

1. Calculate the current funnel totals: qualified targets, approved contacts, sent touches, replies, interviews, and offers.
2. Select at most two priority companies using score, timing, evidence freshness, reachable path, and active conversation state.
3. Issue bounded handoffs using the schema in `sales/operating-system.md`.
4. Route discovery to `discover-matching-companies`, account strategy to `develop-entry-angle`, drafting to `write-contract-outreach`, proof iteration to `strengthen-contract-proof`, and active calls or negotiation to `close-contract-opportunity`.
5. End the day by recording results, experiment decisions, pipeline changes, and tomorrow's first actions in a dated daily log.

## Handoff Integrity

- Put an explicit `Output path` in every file-producing handoff.
- If the path changes, revise the source handoff before the specialist begins; never override it only in chat.
- Do not advance the workflow until the artifact exists at the assigned path, satisfies the deliverable, and returns ownership to the lead.
- Treat a specialist-reported path conflict as a blocker and resolve it in the source handoff.

## Simulation Mode

If any controlling input declares a fixture, forward test, fictional company, or simulation, follow `sales/operating-system.md#simulation-mode`. Keep all writes under the named simulation directory, keep live metrics and canonical files unchanged, forbid external action even if Calin approval is mentioned, and review each stage before routing the next role.

## Decision Rules

- Keep the €40/hour B2B rate as a hard floor. Anchor qualified opportunities at €55–65/hour.
- Prefer active replies and warm paths over new cold accounts.
- Activate only accounts scoring at least 70/100 with dated evidence.
- Do not let specialist agents reprioritize the funnel or contact anyone.
- Do not change canonical positioning merely to create daily novelty. Require new evidence, repeated feedback, or experiment results.
- Require Calin's approval before any message, application, promise, rate quote, or external submission.
- Preserve portfolio claims unless Calin explicitly approves an edit.

## Required Output

Return or write a daily command brief with:

- Funnel snapshot versus `30 qualified → 20 tailored contacts → 5 replies → 3 interviews → 1 contract`.
- Today’s one or two priority accounts and the reason for selection.
- One handoff per role actually needed; do not manufacture busywork.
- Decisions needed from Calin, especially external-message approval.
- Risks, blockers, and the next review point.
