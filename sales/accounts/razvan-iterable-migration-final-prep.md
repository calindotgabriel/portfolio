# Final rehearsal — Friday 2026-08-14, 13:30–14:30

Call at 15:00, **in English**. This hour is **out loud, standing up, on the clock.** Like a mock, not
like reading.

**This is the only file you open in this hour.** The Iterable documentation is done. This hour is no
longer about knowing — it's about *delivering*. Those are two different things and they train
differently.

**At 14:30 you close everything.** Past a certain point, more preparation lowers confidence instead of
raising it. Between 14:30 and 14:55 you read nothing. That isn't advice, it's part of the plan.

---

## The clock

| Time | What | Length |
| --- | --- | --- |
| 13:30 | Block 1 — the 60-second opening | 8 min |
| 13:38 | Block 2 — the 9 discovery questions | 12 min |
| 13:50 | Block 3 — honest positioning ⚠️ | 10 min |
| 14:00 | Block 4 — the rate answer | 7 min |
| 14:07 | Block 5 — the three pitfalls | 13 min |
| 14:20 | Block 6 — the boring part (setup) | 10 min |
| **14:30** | **STOP.** No more reading. | 25 min |
| 14:55 | Join the call | |

If you fall behind, **do not cut block 3.** Cut from 2 and from 5.

---

## Block 1 — The opening, 60 seconds (13:30)

Not a recited CV. Who you are, why you're relevant *to this migration*, then hand over the ball.

> "I'm a senior backend developer, Node and TypeScript. Right now I'm at Bitpanda, working on
> institutional crypto custody for banks. I've integrated Iterable in production at ImmoScout24 — a
> React/Node platform on AWS. And I've led legacy migrations, the biggest one at RWE, Java to NestJS.
> From what Razvan sent over, the part that stood out to me is the 600-email block — but tell me
> first, where did this whole project come from?"

**How you rehearse it:** four times, on the clock. The first one will come out at 75 seconds — normal.

**Pass criterion:** under 45 seconds, and it ends with the question back to them. If you're still over
a minute on the fourth run, cut the RWE sentence — you get it back in block 3 anyway.

**Why it ends with a question:** you hand over the ball immediately. They need to talk 70% of the call.

---

## Block 2 — The 9 questions (13:38)

Said out loud until they sound like conversation, not like a questionnaire. The order matters — this
is the order in which they land naturally.

1. **What's making you migrate *now*?** Is it a contract expiring, cost, or a technical limit you've hit?
2. **Have you attempted this before?** What happened?
3. **How many journeys and automations are live right now?** How many templates in total?
4. **How much of the segmentation sits in scheduled SQL query activities in Automation Studio, versus
   in Journey Builder itself?**
5. **Of the ~600 emails, how many actually sent anything in the last 12 months?**
6. **Where's the source of truth for marketing consent right now — SFMC, the CRM, or a separate
   consent tool?** And is it one opt-in flag per contact, or granular preferences per topic, with the
   opt-in timestamp stored somewhere?
   *Follow-up if it flows:* "Do you use double opt-in, and do you need to keep the proof after the
   migration?"
7. **What's your monthly send volume, and how many contacts?**
8. **Who does marketing ops on your side, and do they have capacity for this?**
9. **Do you have a deadline? Is the budget already allocated?** What happens if this slips by two months?

**How you rehearse it:** two full passes, out loud. Second pass without looking — if you forget one,
let it go, don't go back. You won't tick all of them on the call anyway; it's a list you draw from,
not a script.

**Pass criterion:** questions 1, 4 and 5 come out without thinking. Those three do most of the work.
4 and 5 are the ones that make you sound like you've seen this before.

**The most important thing to rehearse in this block isn't a question — it's the silence after it.**
Say question 1 out loud and then actually stay quiet for five seconds. Twice. The silence is where
most people sabotage themselves, by filling the gap.

---

## Block 3 — Honest positioning ⚠️ (13:50)

**The most important block of the hour.** The only moment where you can lose the call in three
seconds — and not through content, but through the *hesitation before it*.

> "No — I haven't led a full migration off SFMC. I have integrated Iterable in production at
> ImmoScout24, so I know the data model and the API firsthand. And I have led legacy migrations — at
> RWE, Java to NestJS, sliced and covered by tests rather than rewritten in one go. The 600-email
> block is a refactoring and data-modelling problem, which is exactly what I do. Let me tell you how
> I'd approach it and what I'd want to check in the first two weeks."

**How you rehearse it:** five times. On the last one, **record yourself on your phone and listen
back.** This is the only block where that's worth the effort — because you can't hear whether you
sound apologetic while you're the one talking.

**Pass criterion, three conditions at once:**
- under 25 seconds
- **zero pause before "No"** — no intake of breath, no "so", no apologetic smile
- it ends on the pivot ("let me tell you how I'd approach it"), not on a justification

**The mistake to avoid:** explaining *why* you haven't done it, or adding "but I think I could". You
say no, then you say what you do have. No bridge of apology in between. The tone is a statement of
fact, not a confession.

**In English specifically:** don't soften it into "unfortunately no" or "I have to be honest with
you". Both read as apology. Plain "No —" then straight into what you have.

**If it sounds defensive on playback:** say it once more, slower and about 20% lower in pitch. That
fixes it almost every time.

---

## Block 4 — The rate answer (14:00)

First move, always:

> "What's the budget allocated for this project?"

**Rehearse the second deflection, not the first.** The first is easy. The second is where most people
give in. Say to yourself, out loud, "come on, just give me a ballpark" — and answer:

> "It depends a lot on the engagement form and the duration. To give you a number that actually means
> something, I'd want to see the samples first. But if you need a ballpark just to know whether it's
> worth continuing — tell me what range you're working with and I'll tell you straight away whether I
> work there."

And if they push on duration rather than money:

> "600 could be 8 templates or 80, and that's several times the effort. I won't give you a number
> until I've seen 20 or 30 samples."

**In your head, not on the table:** anchor €55–65/hour, long-term floor €35/hour effective.
**No fixed price.** With scope undefined, a fixed price moves all the risk onto you.

**Pass criterion:** you can turn the question back twice in a row without sounding evasive, and
without the nervous laugh.

---

## Block 5 — The three pitfalls (14:07)

You name them **only if the technical conversation opens up**, and you tie them to what they just
said. You don't recite them.

The order below is the order you use them in. **One is changed from the calendar entry:** the
Automation Studio pitfall is stronger than "journeys don't map 1:1", because it's verifiably true at
this client and it reads as an engineer's observation rather than a consultant's. "Journeys 1:1"
stays as backup.

### Pitfall A — the real logic isn't in Journey Builder *(open with this one)*

> "How much of your segmentation actually lives in scheduled SQL query activities in Automation
> Studio, rather than in Journey Builder itself? That's usually where most of the logic sits, and
> Iterable has no equivalent — so every query becomes either a segment, if the data is already on the
> user profile, or a job on your side that computes the field and pushes it in. That part touches
> your engineering team, not just marketing."

If they ask "and how much is that?": *"depends how many queries there are and what data they depend
on — that's the first list I'd ask for."*

### Pitfall B — consent and unsubscribe

> "This isn't a mapping, it's a decision. SFMC has opt-out at three levels — global, list, publication
> list — plus send classification. Iterable has global, channel and message type. They only partly
> overlap. The rule I'd apply is: where it's ambiguous, the most restrictive interpretation wins. With
> GDPR, getting this wrong isn't a bug, it's legal exposure."

### Pitfall C — deliverability and warm-up

> "A new sending domain and a new IP mean warm-up, and reputation doesn't transfer between ESPs. The
> consequence isn't technical, it's about the plan: there can't be a big bang. You go campaign by
> campaign, in parallel, starting with your most engaged segments. If that isn't in the plan from day
> one, the deadline is fiction."

**Backups, if it's going well and they want a fourth:** journeys don't map 1:1, each one gets
rethought rather than translated · the Iterable project type and the profile field data types are
both fixed irreversibly, so the mapping is an architecture decision, not an execution step.

**How you rehearse it:** one pass out loud for each of A, B, C. Then A once more. You're not
memorising word for word — you need to be able to say the idea in your own words.

**Pass criterion:** you can say A without looking, and carry on naturally if they ask something after.

---

## Block 6 — The boring part (14:20)

Done **now**, not at 14:58. Ten minutes, hands on each one:

- [ ] **The call link opens.** Actually open it, don't assume. Which platform is it?
- [ ] **Microphone** — tested, not assumed. Headphones too, if you're using them.
- [ ] **Camera** — on, framed at eye level, not from below.
- [ ] **Light** — on your face, not behind you. Window in front of you, not at your back.
- [ ] **Background** — clean or blurred.
- [ ] **Notifications off** — phone on silent, Slack, mail, all of it.
- [ ] **Water** within reach.
- [ ] **The paper card**, handwritten, in front of you. (below)
- [ ] **One tab open** with the briefing, §1 and §2 — safety net, not reading material.

---

## The card — handwritten, on paper, in front of you

Paper beats screen: a glance down reads as thinking, a scroll reads as improvising.

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

---

## Closing the call — don't forget it

**You** say it, before it winds down. You don't wait for them to ask.

> "The most useful next step for me would be a sample of 20 to 30 emails out of the 600, as different
> from each other as possible. I'll go through them and give you a scope assessment within three
> days — how many real clusters are in there and what that means in effort. No commitment either way."

---

## If you run out of things to say mid-call

Three exits, all of which make you look more serious, not less:

- **You don't know something:** "I don't know that off the top of my head — I'll check and confirm on
  Monday."
- **They press you on SFMC:** "I know SFMC as a source system — what needs to come out of it and in
  what shape. I haven't operated it day to day. On a migration that matters less than it sounds,
  because everything that comes out of it gets rewritten anyway."
- **Awkward silence:** turn it back to them. "And how does that look on your side today?"

**Don't invent Iterable feature names.** An invented feature, caught by someone who knows the
platform, undoes the whole call. "I'll check and confirm" costs nothing.

---

## What counts as success

Not "I said everything I knew". Three things:

1. **They talked more than you did.**
2. **You said at least one thing they didn't know** — most likely pitfall A.
3. **You left with a concrete next step**, not with "let's stay in touch".

If all three are ticked and you said "no" without hesitating in block 3, the call went well —
regardless of how it felt at the time. The feeling after a good call and a bad one is nearly
identical. Don't go by it.

---

## After the call — 30 minutes, while it's still accurate

Fill in the *Conversation and Outcome* table in
[`razvan-iterable-migration.md`](razvan-iterable-migration.md): names, volumes, deadline, who decides.
Then a `#nota` entry in `../../training/journal.md`. Two days from now you won't remember anything
useful.
