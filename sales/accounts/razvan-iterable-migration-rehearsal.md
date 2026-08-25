# Rehearsal sheet — Iterable call, Friday 2026-08-14, 15:00

Substance is in [`razvan-iterable-migration-briefing.md`](razvan-iterable-migration-briefing.md).
Strategy is in [`razvan-iterable-migration.md`](razvan-iterable-migration.md).
**This file is only what you say out loud, where it comes from, and what risk it covers.**

For the hour immediately before the call, use
[`razvan-iterable-migration-final-prep.md`](razvan-iterable-migration-final-prep.md) instead — it's
self-contained.

**The call is in English**, so every line below is rehearsed in English. Rehearsing in one language and
delivering in another defeats the point of rehearsing.

Principle: a get-to-know is lost in three moments — the first 60 seconds, the "have you done this
before?" question, and the rate question. The rest is conversation. So you rehearse those three
disproportionately, and almost nothing else.

Ground rule: **out loud, standing up, on the clock.** Reading it in your head doesn't count as
rehearsal.

---

## The 9 blocks

Each block: what you say · where it comes from · what risk it covers · how you know you're done.

---

### B1 — The opening about you (40 seconds, no more)

> "I'm a senior backend developer, Node and TypeScript. Right now I'm at Bitpanda, working on
> institutional crypto custody for banks. I've integrated Iterable in production at ImmoScout24 — a
> React/Node platform on AWS. And I've led legacy migrations, the biggest one at RWE, Java to NestJS.
> From what Razvan sent over, the part that stood out to me is the 600-email block — but tell me
> first, where did this whole project come from?"

**Source:** Snapshot + Entry Strategy in the account file; the Bitpanda role from memory.
**Risk covered:** the first 60 seconds fix the category they put you in. Without a rehearsed opening
you either ramble or sound like a recited CV.
**Pass criterion:** under 45 seconds, timed, and it ends with a question back to them. If it runs a
full minute you've already lost half the advantage.

**Why it ends with a question:** you hand over the ball immediately. They need to talk 70%.

---

### B2 — The "why now" question

> "What's making you migrate *now*? Is it a contract expiring, cost, or a technical limit you've hit?"

**Source:** Pre-Call Questions, the on-call section.
**Risk covered:** without this answer you don't know whether it's a real project or exploration, and
you can't calibrate anything after it. It's the one question that changes everything downstream.
**Pass criterion:** you ask it in the first 3 minutes, and **you go quiet after it.** Rehearse the
silence, not the question.

---

### B3 — "Have you run a full migration onto Iterable before?" ⚠️ the most important block

> "No — I haven't led a full migration off SFMC. I have integrated Iterable in production at
> ImmoScout24, so I know the data model and the API firsthand. And I have led legacy migrations — at
> RWE, Java to NestJS, sliced and covered by tests rather than rewritten in one go. The 600-email
> block is a refactoring and data-modelling problem, which is exactly what I do. Let me tell you how
> I'd approach it and what I'd want to check in the first two weeks."

**Source:** briefing §4, developed from Positioning in the account file.
**Risk covered:** the only moment where you can lose the call in three seconds. Not through the
answer — through *the hesitation before it*. A pause before "No" reads as embarrassment, and
embarrassment reads as lack of competence.
**Pass criterion:** under 25 seconds, **zero pause before "No"**, and it ends on the pivot ("let me
tell you how I'd approach it"), not on an apology. Record yourself on your phone and listen back once
— this is the only block where that's worth the effort.

**The mistake to avoid:** explaining why you haven't, or adding "but I think I could". You say no,
then you say what you have. No bridge of apology in between. In English, also avoid "unfortunately"
and "I have to be honest with you" — both read as apology.

---

### B4 — The Automation Studio pitfall (the block that shifts perception)

> "How much of your segmentation actually lives in scheduled SQL query activities in Automation
> Studio, rather than in Journey Builder itself? That's usually where most of the logic sits, and
> Iterable has no equivalent — so every query becomes either a segment, if the data is already on the
> user profile, or a job on your side that computes the field and pushes it in. That part touches your
> engineering team, not just marketing."

**Source:** briefing §2, pitfall 2.
**Risk covered:** the risk of being read as "developer who read about Iterable yesterday". This is the
block that shows you understand *where the work hides*, not just what the features are called.
**Pass criterion:** you can say it without looking, and carry on naturally if they ask "and how much
is that?" — answer: *"depends how many queries there are and what data they depend on; that's the
first list I'd ask for."*

**When you use it:** when they get onto journeys or data. You don't drop it at random — you tie it to
what they just said.

---

### B5 — The irreversible-decisions pitfall

> "One thing I'd want nailed down before any import: the Iterable project type and the identity key
> can't be changed after creation, and profile field data types are fixed on first write. So the CRM
> mapping isn't an execution step — it's an architecture decision that gets made in week one, with a
> test import into a throwaway project."

**Source:** briefing §2, pitfall 1 (verified against Iterable's documentation).
**Risk covered:** speaks directly to block 1 of their scope ("Mappings unserer Daten in das
Iterable-Datenmodell"). Shows you think in terms of what can't be repaired later.
**Pass criterion:** you say it in 20 seconds without conflating the two things (project type ≠ field
type). They're two separate traps, both irreversible.

**Backup, if they want one more:** consent/unsubscribe (briefing pitfall 3) or engagement history not
migrating (pitfall 4). Pick based on what they seemed worried about.

---

### B6 — The 600-email block + refusing to give a number

> "The first question with 600 isn't how we migrate them — it's how many of them actually sent
> anything in the last 12 months. Usually the real number is much smaller, and it's the cheapest
> reduction in the whole project. After that you cluster them by language, brand, lifecycle stage and
> structure, and you separate what varies: layout goes into one template with snippets, content into a
> catalog or a data feed, audience into different journeys on the same template. 600 could be 8
> templates or 80, and that's several times the effort. I won't give you a number until I've seen 20
> or 30 samples. What I can tell you already is that the realistic answer is closer to 15 or 20 than
> to 3."

**Source:** briefing §3.
**Risk covered:** this block is 70% of their project. If you sound vague here, the rest doesn't
matter. And the ending — "closer to 15 or 20 than to 3" — is the credibility move: you tell them what
they don't want to hear.
**Pass criterion:** you can say it in under 60 seconds, and **you don't cave** if they push for a
number. Rehearse the exact scenario: someone says "but roughly, how long would it take?" and you
answer with this again.

---

### B7 — Rate and budget

> "What's the budget allocated for this project?"

And if they insist you go first:

> "It depends a lot on the engagement form and the duration. To give you a number that actually means
> something, I'd want to see the samples first. But if you need a ballpark just to know whether it's
> worth continuing — tell me what range you're working with and I'll tell you straight away whether I
> work there."

**Source:** Commercial Posture in the account file (anchor €55–65/hour, long-term floor €35/hour
effective).
**Risk covered:** whoever says the number first loses. And a number given before you know the scope,
on a project with 600 unanalysed emails, is the most expensive minute of the call.
**Pass criterion:** you can turn the question back **twice** in a row without sounding evasive.
Rehearse the second deflection, not the first — the first is easy, the second is where people cave.
**No fixed price.** With scope undefined, a fixed price moves all the risk onto you.

---

### B8 — The safety exits

For when you don't know. Two versions, both of which make you look more serious, not less:

> "I don't know that off the top of my head — I'll check and confirm on Monday."

> "I know SFMC as a source system — what needs to come out of it and in what shape. I haven't operated
> it day to day. On a migration that matters less than it sounds, because everything that comes out of
> it gets rewritten anyway."

**Source:** briefing §4 and §6.
**Risk covered:** the biggest risk in a credibility call isn't not knowing something — it's
improvising. One invented Iterable feature, caught by someone who knows the platform, undoes the whole
call.
**Pass criterion:** it comes out automatically. Rehearse it until you don't have to think about it —
precisely because you'll need it at a moment when you have no time to think.

---

### B9 — The close

> "The most useful next step for me would be a sample of 20 to 30 emails out of the 600, as different
> from each other as possible. I'll go through them and give you a scope assessment within three
> days — how many real clusters are in there and what that means in effort. No commitment either way."

**Source:** the CTA in Entry Strategy.
**Risk covered:** good calls that end in "let's stay in touch" die. A small step accepted beats a
large contract discussed.
**Pass criterion:** **you** say it before the call winds down, you don't wait for them to ask.
Rehearse it last so you don't forget it.

---

## Rehearsal schedule

You have two days. About 2 hours total, split up. Three short sessions beat one long one.

### Wednesday (today), 35 minutes

1. Read the briefing once, end to end. Once only. (10 min)
2. **B3** out loud × 5, timed. Record the last one and listen back. (10 min)
3. **B4** out loud × 3. (5 min)
4. Send the 6 pre-call questions in writing (4 from the account file + 2 from briefing §7). (10 min)

Questions sent today count double: if they answer before Friday you go into the call with information
nobody handed you for free, and you already look like someone working on the problem.

### Thursday, 45 minutes

1. All 9 blocks out loud, one pass. (20 min)
2. **B3, B6, B7** once more each — the three with real risk. (15 min)
3. Pressure drill: ask yourself the three uncomfortable questions out loud and answer immediately,
   without looking at the file: (10 min)
   - "So you've never actually done this before?"
   - "Roughly how long would it take? Just give me a ballpark."
   - "Could you do a fixed price for the whole project?"

If you hesitate more than two seconds on any of them, that's the block you rehearse again on Friday.

### Friday, 14:15–14:45

Superseded by [`razvan-iterable-migration-final-prep.md`](razvan-iterable-migration-final-prep.md),
which lays out the 13:30–14:30 hour minute by minute. Use that instead.

### If you only have 20 minutes total

B3 (× 5), B4 (× 3), B7 (× 3), and the three sentences from briefing §0. That's it, in that order.

---

## What you have open during the call

**On screen, in one tab:** briefing §1 (the translation map) and §2 (the pitfalls). You don't read
them — they're a safety net for a feature name that escapes you.

**On paper, in front of you, handwritten:** six lines, that's all.

```
1. Why NOW?  ...then SHUT UP.
2. NO. But: ImmoScout Iterable in prod + RWE migration.
   Pivot: "let me tell you how I'd approach it."
3. Automation Studio SQL — how much segmentation is in there?
4. Of 600, how many sent last year? Realistically 15-20, not 3.
5. Consent: most restrictive wins. Warmup: no big bang.
6. Budget? → turn it back. TWICE.

CTA: 20-30 samples → scope assessment in 3 days
```

Paper beats screen: a glance down reads as thinking, a scroll reads as improvising.

---

## What you don't rehearse

Wasted time, listed explicitly so you don't spend it:

- **SFMC terminology by heart.** If one comes up you don't know, it's in the map. And your position
  isn't "SFMC expert" anyway.
- **Pitfalls 4 and 5** (engagement history, deliverability). They're backups. Read them once, don't
  drill them — if you get to a third pitfall the call is already going very well.
- **Handlebars syntax, API endpoint names, Data Feed details.** It's a get-to-know. Nobody asks that,
  and if they do, that's B8.
- **A long pitch about yourself.** B1 is 40 seconds for a reason.
- **Answers to questions nobody will ask you.** The temptation is to rehearse what makes you feel
  prepared. Rehearse what stops you losing.

---

## What actually counts as success

Not "I said everything I knew". Three things, in order of importance:

1. **They talked more than you did.**
2. **You said at least one thing they didn't know** — most likely B4 or B5.
3. **You left with a concrete next step**, not with "let's stay in touch".

If all three are ticked and you said "no" without hesitating in B3, the call went well regardless of
how it felt.
