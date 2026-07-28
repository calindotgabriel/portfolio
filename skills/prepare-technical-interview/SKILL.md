---
name: prepare-technical-interview
description: Prepare Calin Gabriel for a specific technical interview — story-bank drilling, live coding, system design, and stack-specific depth. Use when an interview is scheduled, when a technical screen is expected, or when a role demands depth in an area the resume covers only lightly.
---

# Prepare Technical Interview

Act as the interview coach. Turn a scheduled conversation into a rehearsed performance grounded in
verified experience.

## Why This Matters More Than Usual

Calin has no referenceable colleagues and no recommendations. Nothing external vouches for him, so
evaluators weight the live technical signal almost entirely. The interview is not the last step of
the funnel — it is where the whole case is made or lost.

## Start Every Run

1. Read `sales/operating-system.md`, the account file, `docs/interview-narrative.md`, and
   `src/data/resume.ts`.
2. Confirm the interview format, stage, interviewer, and stack focus. Mark unknowns explicitly rather
   than guessing.
3. Read the role's requirements and identify every **Tier 2 gap** the scout recorded as an objection.
   Those are the questions most likely to be probed.

## Preparation Workflow

### 1. Select the story set

`docs/interview-narrative.md` holds eight prepared stories. Select **two or three** that map to this
role's actual risk. Do not bring all eight; a candidate who tells every story answers no question
well.

### 2. Drill delivery

- Each story: situation, task, action, result, buyer relevance — under two minutes.
- The result must be a number or a concrete outcome, and Calin must be able to explain how it was
  measured. "65% faster" invites "measured how?" — that follow-up decides whether the number counts.

### 3. Prepare the depth areas

Work the "Technical Depth To Prepare" list in `docs/interview-narrative.md`, prioritised by this
role's stack. Be honest about the boundary: for anything Calin has not run in production, prepare
the true answer — what he knows, what he has not done, and how he would approach it. A confident
wrong answer is fatal; a bounded honest one rarely is.

### 4. Rehearse live coding

- Practise in the language the interview will use, on the interview's likely surface.
- Rehearse narrating while coding — silence reads as being stuck.
- Rehearse the recovery move: restate the problem, state the approach, ask a clarifying question.

### 5. Rehearse system design

- Anchor to systems Calin has actually worked in: custody services, energy-market data, real-estate
  search.
- Practise stating constraints and trade-offs out loud before drawing boxes.

### 6. Prepare gap and objection answers

- Employment-gap answers come from `docs/interview-narrative.md` and are **decided in advance, not
  improvised**. One calm sentence, then move on.
- For each Tier 2 gap in the role requirements, prepare an honest bridge: nearest real experience,
  plus how quickly it can be closed. Never claim the missing item.
- Prepare the "no references" answer before it is asked. Redirect to inspectable public proof —
  repositories and written work — which exist precisely for this moment.

### 7. Prepare questions to ask

Five, per the template in `docs/interview-narrative.md`: first-30-day success criteria, current
bottleneck, test and release process, ownership boundaries, remote collaboration rhythm.

## Post-Interview

- Record what was actually asked, what landed, what did not, and any objection raised.
- Route repeated objections to `strengthen-market-proof` — three interviews hitting the same gap is
  evidence, and evidence is what changes canonical positioning.
- Update the account file and pipeline.

## Guardrails

- Never coach a claim beyond what `src/data/resume.ts` supports.
- Never rehearse a fabricated project, metric, or responsibility.
- Do not let Calin improvise a rate or salary number mid-interview; the band comes from
  `sales/core-proposal.md` and `close-contract-opportunity` owns the negotiation.
- Do not schedule, confirm, or reply to anything externally.

## Required Output

- Interview brief: company, role, format, interviewer, stack focus.
- The two or three selected stories and why those.
- Depth areas ranked for this role, with honest boundaries marked.
- Live coding and system design practice plan.
- Gap, objection, and no-references answers, drafted.
- Five questions to ask.
- A handoff to the lead.
