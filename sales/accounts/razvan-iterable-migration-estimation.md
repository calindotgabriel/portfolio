# Estimation call — prep

Follows the discovery call, which went well. Different game: on the first call the risk was sounding
uncredible. Here the risk is **being anchored into a number you can't deliver**, or into a shape of
engagement where you carry all the risk.

Companion to [`razvan-iterable-migration-briefing.md`](razvan-iterable-migration-briefing.md).
Commercial posture from `../core-proposal.md`: anchor €55–65/hour, long-term floor €35/hour effective.

---

## 0. The move that changes everything else: don't estimate the whole thing

**Sell a paid scoping phase instead.** Two to three weeks, fixed price, with a defined deliverable:

- a full inventory of the 600 emails, scripted rather than eyeballed, with send counts from the last
  12–18 months
- the cluster analysis — how many real templates are actually in there
- the Iterable data model and project-type decision, written down
- an inventory of the Automation Studio queries and what each one becomes
- **and a real estimate for the rest of the project**

Why it wins on every axis:

- **For them:** they stop buying a number invented by someone who hasn't seen their data. Two weeks
  and a small budget replaces a six-figure guess.
- **For you:** you don't have to defend a number you can't stand behind. You get paid to do the
  analysis that makes the estimate possible. And you're inside, which converts far better than any
  proposal.
- **Commercially:** a small fixed price on a scope you fully control is safe. A large fixed price on
  600 unseen emails is not.

> "Before I give you a number for the whole thing, I'd rather do two or three weeks of scoping as a
> paid phase — the inventory, the cluster analysis, and the data model. You'd come out of it with a
> real estimate instead of my guess, and you can take that estimate to anyone. If it turns out the 600
> are 12 templates, the project is a very different size than if they're 60, and right now nobody in
> this conversation knows which."

If they say no and want a number anyway — the rest of this file is how you give one without getting
trapped.

---

## 1. What to watch for on this call

**1. "Just give us one number."** The whole call will pull toward a single figure. Give structure
instead: a range per block, plus the variable that moves each one. One number is unfalsifiable and
you'll be held to it.

**2. Fixed price on undefined scope.** With 600 unanalysed emails, a fixed price moves the entire risk
onto you. Time and materials, or fixed price *per phase* with each phase scoped before it starts.

**3. Effort vs calendar being conflated.** The single most common estimation error. Five months of
effort is not five months of calendar. Warm-up, their review cycles, approvals, parallel running, and
their team's capacity all stretch calendar without adding effort. **Always ask which one they mean.**

**4. Content treated as cheap.** If their number assumes the 600 emails are copy-paste, everything
downstream is wrong. Content is normally *half* the total effort on a migration like this.

**5. Who does what.** The biggest scope risk isn't your work, it's the dependencies on theirs. Content
decisions, brand approvals, event instrumentation in the product, the jobs replacing Automation Studio
SQL. If those have no named owner with capacity, the timeline is fiction regardless of your estimate.

**6. A deadline that's already fixed.** If they have a date — an expiring SFMC contract is the usual
one — the question isn't "how long does it take" but "what fits in the time". That's a different
conversation and a better one for you. Ask early: *"is there a date this has to be done by?"*

**7. Who else is estimating.** If you're being compared to an agency or to Iterable's own professional
services, you're not competing on the same shape. Say so rather than pricing against a ghost.

---

## 2. The bottom-up model

Not benchmarks from a database — a build-up you can defend line by line, which is what lets you
challenge *their* number. Assumes one senior engineer, days of actual effort.

### Block 1 — Platform setup, CRM connection, data mapping

| Item | Days | What moves it |
| --- | ---: | --- |
| Iterable project, sending domains, DKIM/SPF/DMARC, IP provisioning | 3–5 | Little |
| Data model design + project type decision (the irreversible part) | 5–10 | Number of source systems; how clean the CRM model is |
| CRM → Iterable sync | 5–30 | **The big variable.** Standard connector/iPaaS at the low end, custom API integration at the high |
| Initial bulk load, validation, reconciliation | 5–8 | Contact volume; data quality |
| Event instrumentation in their product | 10–25 | How many events; whether *their* eng team does it |
| **Subtotal** | **28–78** | **≈ 6–16 weeks** |

### Block 2 — Journeys and entry audiences

Per-journey rebuild, including testing:

| Journey type | Days each |
| --- | ---: |
| Simple (one trigger, 1–3 steps, no branching) | 0.5–1 |
| Medium (5–10 nodes, branching, waits) | 2–3 |
| Complex (multi-branch, computed segments, cross-channel) | 4–8 |

A mid-size SFMC account runs 20–40 journeys. For 30, mixed, with patterns established after the first
few: **30–55 days, ≈ 6–11 weeks.**

Add for each journey whose entry audience depends on an Automation Studio query: the job that computes
and pushes that field. **2–5 days per distinct query**, and it lands on their engineering team.

### Blocks 3+4 — The 600 emails

| Item | Days | What moves it |
| --- | ---: | --- |
| Inventory + send-log analysis (scripted) | 3–5 | |
| Cluster analysis | 5–10 | How much real variety is in there |
| Base template system: HTML, snippets, responsive, dark mode, client-tested | 10–20 | Number of base templates; whether brand design is settled |
| Per template, simple (content into an existing base) | 0.5–1 each | |
| Per template, with dynamic logic (Handlebars, data feed, catalog) | 2–4 each | |
| Localisation | +30–60% | Number of languages; one template with conditionals vs one per locale |
| QA across email clients | 0.25–0.5 per template | Always cut first, always regretted |

For 600 → 20 base templates plus a snippet library: **50–80 days, ≈ 10–16 weeks.**

### Cutover and warm-up

**4–8 weeks of calendar**, largely overlapping the build. Mostly waiting, not effort — and no amount
of people compresses it.

### Totals

| Scenario | Effort | Calendar, one person |
| --- | --- | --- |
| Simple (clean CRM, 15 journeys, 600 → 12 templates, one language) | ~90 days | **4–5 months** |
| Typical (custom integration, 30 journeys, 600 → 20 templates, 2–3 languages) | ~150 days | **7–9 months** |
| Complex (multiple BUs, 40+ journeys, heavy Automation Studio logic, 600 → 40 templates) | ~230 days | **11–14 months** |

**Full SFMC→Iterable migrations at this scope typically run 4 to 9 months.** If someone has told them
six weeks, that estimate covers platform setup and nothing else.

---

## 3. Anchors — numbers to drop when you need to intervene

Use these when their number sounds wrong and you need to say why without sounding obstructive.

- **"A journey rebuild is half a day to a day for a simple one, two to four for one with real
  branching. So thirty journeys is six to ten weeks, not two."**
- **"Content is normally half the total effort on a migration like this. If it's a quarter of your
  estimate, something's been left out."**
- **"The audit alone — inventorying 600 templates and clustering them — is two to three weeks. It's
  also the cheapest two weeks in the project, because it's what makes everything else estimable."**
- **"IP warm-up is four to six weeks of calendar that no amount of people compresses."**
- **"Testing is twenty to thirty percent of build effort. It's the first thing cut and the first thing
  regretted."**
- **"Every Automation Studio query that becomes a job on your side is two to five days of engineering
  work — on your team, not mine."**
- **"600 could be 12 templates or 40. That's roughly a threefold difference in the content block,
  which is half the project. So it's a threefold difference in a bit under half the total."**

---

## 4. Interventions — what to say when the number is wrong

Ranked by how much they buy you. All of them are questions, which is why they work — you're not
contradicting anyone, you're asking them to show their work.

1. **"What's that number based on?"** The single best intervention. Most estimates on a call like this
   have no derivation, and asking politely surfaces that without you having to be the one who says it.
2. **"Is that effort or calendar?"** Catches the most common error, and it's a neutral question.
3. **"Which of the four blocks does that cover?"** Usually it covers one and is being quoted as if it
   covers all four.
4. **"Who's doing the content production in that estimate?"** If the answer is you, alone, the number
   is wrong by a factor. If the answer is unclear, that's the finding.
5. **"What happens to that number if the 600 turn out to be 40 clusters instead of 12?"** Forces the
   variance into the open without you having to claim a figure.
6. **"What's in there for the parallel-running period?"** Two platforms live at once has cost —
   licences, double maintenance, and someone keeping them in sync.

---

## 5. Scope that isn't in their four blocks

Worth raising, because each one is real and none appears in the German scope. Raise them as questions,
not as objections.

- **Event instrumentation** in their product — needs their engineering team
- **The Automation Studio queries** that become jobs on their side
- **Preference centre rebuild** — SFMC's is going away with SFMC
- **Consent audit trail** export and archive, if consent lives in SFMC
- **Deliverability warm-up** as calendar time in the plan, not as an afterthought
- **Parallel running** — licences and double maintenance while both are live
- **Training** their team on Iterable, which is not the same as handing it over
- **Other channels** — if they use SFMC Mobile Studio for SMS or push, that's a whole block nobody
  has mentioned yet

---

## 6. Commercial guardrails

- **No fixed price on the whole project.** Fixed price per phase, each scoped before it starts.
- **Anchor €55–65/hour.** Floor €35/hour effective on a long engagement — but don't volunteer the
  floor and don't work backwards from it out loud.
- **Know your own arithmetic before the call.** A 7-month full-time engagement is roughly 1,200 hours;
  at €55 that's about €66k, at €35 about €42k. You should not be doing that maths for the first time
  while they're talking.
- **Watch the shape, not just the rate.** Being the sole person on a 9-month migration including 600
  email templates is a production job, not an engineering one. The better shape is: you do blocks 1
  and 2 and the template *system*, and content production is resourced on their side or by a
  specialist. **Say that** — it lowers their number and improves your work.
- **The scoping phase is the ask.** Two to three weeks, fixed, deliverable-based. Everything else can
  follow from it.

---

## 7. If you take one thing in

Their number will be too low, and the gap will be in the content block. Don't fight it with a bigger
number of your own — fight it with the question *"what happens if the 600 are 40 clusters and not
12?"*, and then offer the two-week scoping phase that answers it.

You win this call by being the only person in it who is honest about the variance.
