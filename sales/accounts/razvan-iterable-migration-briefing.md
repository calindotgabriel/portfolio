# Technical briefing: SFMC → Iterable migration

For the call on Friday 2026-08-14, 15:00, **in English**. Companion to
[`razvan-iterable-migration.md`](razvan-iterable-migration.md) — the strategy is there, the substance
is here. On the day itself, open
[`razvan-iterable-migration-final-prep.md`](razvan-iterable-migration-final-prep.md) instead.

Goal: 10 minutes of credible conversation. Not mastery. You talk 30% of the time.

---

## 0. If you retain only three sentences

1. **"In SFMC the real segmentation logic doesn't sit in Journey Builder — it sits in the SQL queries
   in Automation Studio. Iterable has no equivalent for that, and it's usually the block that's
   missing from the estimate."**
2. **"The first decision in Iterable — the project type and the identity key — can't be changed
   afterwards. That gets decided before any import, not during it."**
3. **"With 600 emails, the first question isn't how we migrate them. It's how many of them actually
   sent anything in the last 12 months."**

Any one of these, said naturally, moves you out of the "developer who read about Iterable" category.

---

## 1. The SFMC → Iterable translation map

This is what you need to be able to walk through from memory. The third column is where the work hides.

| Salesforce Marketing Cloud | Iterable | What happens in the migration |
| --- | --- | --- |
| Subscriber Key / Contact Key | `userId` or `email` | **Irreversible decision.** See pitfall 1 |
| Data Extension (sendable) | User profile + Lists / Segments | Iterable has no arbitrary tables |
| Relational DE (non-sendable) | Catalog, event data, or Data Feed | Each DE has to be rehomed by hand |
| Contact Builder + data relationships | Flat user profile + events | **Iterable doesn't do joins.** Data arrives denormalised |
| Automation Studio + SQL Query Activity | *no equivalent* | See pitfall 2. The most underestimated block |
| Journey Builder journey | Journey | Doesn't translate 1:1, gets rethought |
| Entry source = Data Extension | Trigger: event / list / segment entry | Completely different model |
| Filter / Filtered DE | Segment (dynamic) | Fine, if the data is on the profile |
| Content Builder template + blocks | Template + Snippets | Snippets are your reusable block library |
| AMPscript / SSJS / GTL | Handlebars | **A rewrite, not a conversion** |
| `Lookup()` / `LookupRows()` in AMPscript | *doesn't exist* → profile / Catalog / Data Feed | See pitfall 3 |
| Publication List (subscription) | Message Type | Explicit mapping, not automatic |
| All Subscribers opt-out | Global unsubscribe | |
| Send Classification (transactional) | Message Channel marked transactional | Users can't unsubscribe from it |
| `%%unsub_center_url%%` | `{{hostedUnsubscribeUrl}}` | Breaks silently if you leave it in the 600 |
| Business Unit (MID) | Project | **Iterable projects don't share users** |
| Triggered Send | Event-triggered journey / API trigger | |
| Sender Authentication Package | Sending domain + DKIM/SPF + IP | Reputation doesn't transfer |
| Tracking data views (opens, clicks, sends) | *doesn't migrate* | See pitfall 4 |

A note on Business Units: if they have several BUs (per brand or per country), the question "one
Iterable project or several?" is an architecture decision with large consequences — separate projects
can't see each other's users. And it's very likely tied to the 600 emails, which are almost certainly
brand × language × lifecycle variants.

---

## 2. The pitfalls worth naming on the call

Pick two. Three if the conversation runs. Don't recite them — slip them in as a response to something
they said.

### Pitfall 1 — identity and field types are fixed at the start and never change

Iterable has three project types: **email-based**, **userId-based** and **hybrid**. The setting is
made when the project is created and **cannot be changed later**. If the master key in their CRM is a
contact ID (as Subscriber Key usually is in SFMC) and the Iterable project is created email-based,
every subsequent sync will be working against the model. User merges in Iterable are likewise
irreversible.

The second, subtler layer: **the data type of a profile field is inferred on first write and can
never be changed.** If the first import sends `"42"` instead of `42`, that field is a string forever
and you can no longer segment on a numeric range. Same with dates sent as text. One careless test
import poisons the schema.

> **How to say it:** "One thing I'd want nailed down before any import: the Iterable project type and
> the identity key can't be changed after creation, and profile field data types are fixed on first
> write. So the CRM mapping isn't an execution step — it's an architecture decision that gets made in
> week one, with a test import into a throwaway project."

Why it works: it shows you think in terms of irreversible decisions, which is exactly what someone
paying for a migration wants to hear.

### Pitfall 2 — the real logic is in Automation Studio, not Journey Builder *(the best one)*

In most mature SFMC accounts the segmentation doesn't live in journeys. It lives in **SQL Query
Activities** running on a schedule in Automation Studio, which populate Data Extensions; Journey
Builder just reads the resulting DE. None of it is visible from the journey UI.

Iterable has nothing equivalent. You can't run scheduled SQL over your data inside Iterable. Every
query becomes one of two things:

- **an Iterable segment** — but only if all the data it depends on is already on the user profile or
  in events;
- **a job in their stack**, computing the value and pushing it into Iterable as a profile field.

The second is engineering work, on their side, not marketing's. And it's the block missing from
almost every estimate, because nobody looks inside Automation Studio when counting journeys.

> **How to say it:** "How much of your segmentation actually lives in scheduled SQL query activities
> in Automation Studio, rather than in Journey Builder itself? That's usually where most of the logic
> sits, and Iterable has no equivalent — so every query becomes either a segment, if the data is
> already on the user profile, or a job on your side that computes the field and pushes it in. That
> part touches your engineering team, not just marketing."

Why it works: it's an engineer's perspective, not a marketing consultant's. And it's verifiably true —
if they run SFMC seriously they'll confirm it immediately, possibly with relief.

### Pitfall 3 — consent and unsubscribe don't map 1:1

SFMC has three coexisting levels of opt-out: **All Subscribers** (global), **list** level, and
**Publication List** (content-type preferences) — plus **Send Classification**, where a send marked
transactional bypasses unsubscribes entirely.

Iterable has its own model: **global unsubscribe**, **message channel** (marketing vs transactional)
and **message type** within the channel. The overlap is partial. There's no automatic mapping —
whoever runs the migration decides, and the only safe default is *the most restrictive interpretation
wins*.

Plus the detail that breaks silently: the unsubscribe links in all 600 templates point at SFMC. They
have to become `{{hostedUnsubscribeUrl}}`. A migrated template with the old link sends people to the
preference centre of a system you've switched off.

> **How to say it:** "This isn't a mapping, it's a decision. SFMC has opt-out at three levels — global,
> list, publication list — plus send classification. Iterable has global, channel and message type.
> They only partly overlap. The rule I'd apply is: where it's ambiguous, the most restrictive
> interpretation wins. With GDPR, getting this wrong isn't a bug, it's legal exposure."

**The question that opens this up, and how to read the answer.** Ask:

> "Where's the source of truth for marketing consent right now — SFMC, the CRM, or a separate consent
> tool? And is it one opt-in flag per contact, or granular preferences per topic, with the opt-in
> timestamp stored somewhere?"

Two things are being asked at once. *Where it lives* = which system is authoritative for opt-in and
opt-out. *What format* = a bare boolean, or a full trail — timestamp, source, double opt-in
confirmation, and which purposes were consented to. GDPR wants provable consent, not a flag.

It matters twice over. The Iterable message channel and message type structure has to mirror their
consent granularity — five consent purposes in the CRM means five message types, and you can't design
that block until you know. And if consent lives *only* in SFMC, switching SFMC off destroys the proof,
which is a risk they have probably not costed.

| Their answer | What it means |
| --- | --- |
| "It's in the CRM" | Best case. Simpler migration, SFMC can be switched off cleanly |
| "It's in SFMC" | **Raise the flag:** switching it off destroys the audit trail. Export and archive is a separate scope item |
| "In a consent tool" (OneTrust, Usercentrics — common in DACH) | Fine, but Iterable has to be fed from it. An integration, not just a mapping |
| "Several places" / "not sure" | Most common answer, and the most valuable. A block of work nobody has estimated |
| "Just a boolean" | Message types stay simple — but ask whether they *want* granular. 600 emails suggests they might |

Follow-up if it flows, and it sounds like someone who has worked with German clients:
*"Do you use double opt-in, and do you need to keep the proof after the migration?"* Double opt-in is
the norm in the DACH market and the proof is the part people forget to migrate.

If the answer is vague or the person on the call doesn't know, the fallback question is just **"who
would know that?"** — often it isn't them, and getting the name is itself a useful outcome.

### Pitfall 4 — engagement history doesn't come with you *(backup)*

Opens, clicks and sends stay in SFMC. On day 1 in Iterable, any segment like "opened in the last 90
days" is empty. Which means every re-engagement, win-back or inactivity-suppression journey is dead at
cutover and stays thin for about a quarter.

Concrete mitigation: backfill a few summary fields onto the profile (`lastOpenAt`, `lastClickAt`, an
engagement score) via bulk update, and keep read-only access to SFMC for a while. It isn't a history
migration, it's a migration of *derived values* — enough to make segmentation work.

### Pitfall 5 — deliverability forces a phased cutover *(backup)*

A new sending domain and a new IP mean warm-up. Reputation doesn't transfer between ESPs. If the first
send on a cold IP goes to the whole list, including people inactive for two years, you land in spam
and damage your reputation from the start.

The consequence is about the plan, not just the tech: **there can't be a big bang**. Campaign by
campaign, in parallel, starting with the most engaged segments and ramping volume. That has to be in
the plan from day one, otherwise the deadline is fiction.

---

## 3. The 600-email block — the method

This is your ground. It's refactoring, not email marketing. Four steps, in order.

**Step 0 — kill first, migrate second.**
Ask for the send logs for the last 12–18 months. In accounts with 600 templates, a substantial share
haven't sent anything in a year. Every template eliminated before analysis is work saved three times
over: you don't cluster it, don't rewrite it, don't test it.

> "The first question with 600 isn't how we migrate them. It's how many of them actually sent
> anything last year. Usually the real number you're working with is much smaller, and it's the
> cheapest reduction in the whole project."

**Step 1 — cluster on four axes.**
Language / market · brand or business unit · lifecycle stage · layout structure.
600 typically means something like 40 real messages × 3 languages × a few variants.

**Step 2 — separate the kinds of variation.** This is the real insight, and it's an engineer's:

| What varies | Where it's solved in Iterable |
| --- | --- |
| Layout / structure | One template + Handlebars conditionals + Snippets |
| Content (products, prices, offers) | Catalog, Data Feed, or profile fields |
| Audience / send timing | The *same* template, a different journey |

Whoever doesn't make this distinction ends up either with 600 templates in the new system, or with one
monstrous template nobody can maintain. Consolidating properly means moving each kind of variation to
the level where it belongs — not compressing it.

**Step 3 — every `Lookup()` in AMPscript is a work item.**
In SFMC a template can query any Data Extension at send time. In Iterable, Handlebars only sees what's
on the user profile, in the event payload, in a Catalog, or what comes from a **Data Feed** — an HTTP
endpoint called at send time and merged into the render context.

So every `Lookup()` across the 600 becomes either a profile field, a catalog item, or an endpoint
somebody has to build **and operate**. Data Feeds are powerful and they're the key to consolidation,
but they introduce a runtime dependency: if the endpoint is slow or down, it affects sending. Dynamic
feeds, with merge tags in the URL, cache poorly — one call per user.

**Step 4 — the realistic number.**
"Wenige" is not a number. Realistically they land at something like **10–25 base templates plus a
snippet library**, not 5. Say that on the call. It isn't what they want to hear, and that's exactly
why they'll believe you.

> "600 could be 8 templates or 80, and that's several times the effort. I won't give you a number
> until I've seen 20 or 30 samples. What I can tell you already is that the realistic answer is closer
> to 15 or 20 than to 3 — and if someone promises you 3, either they haven't looked inside them, or
> they're building something you won't be able to maintain."

---

## 4. "Have you run a full migration onto Iterable before?"

Four sentences, rehearsed out loud. No apology, no long explanation.

> "No — I haven't led a full migration off SFMC. I have integrated Iterable in production at
> ImmoScout24, so I know the data model and the API firsthand. And I have led legacy migrations — at
> RWE, Java to NestJS, sliced and covered by tests rather than rewritten in one go. The 600-email
> block is a refactoring and data-modelling problem, which is exactly what I do. Let me tell you how
> I'd approach it and what I'd want to check in the first two weeks."

Then move straight on. The pause before the "No" is what costs you, not the answer.

Don't soften it into "unfortunately not" or "I have to be honest with you" — both read as apology.

If they push deep on SFMC and you feel the edge:

> "I know SFMC as a source system — what needs to come out of it and in what shape. I haven't operated
> it day to day. On a migration that matters less than it sounds, because everything that comes out of
> it gets rewritten anyway."

Honest, and true.

---

## 5. The 10-minute arc

1. **They speak first.** "Tell me where this started — what's making you migrate *now*?" The reason (a
   contract expiring, cost, a technical limit, someone who left) tells you everything about urgency
   and budget.
2. **You listen and ask one sharp technical question** — the Automation Studio one. That's the moment
   the tone of the conversation changes.
3. **You name one pitfall**, not three. The one that connects to what they just said.
4. **The honest positioning**, if they ask. Without waiting to be asked, if you sense it hanging.
5. **The 600-email block** — the method, briefly, plus the polite refusal to give a number.
6. **CTA:** 20–30 sample emails, and a scope assessment within three days.

---

## 6. What not to do

- **Don't play SFMC expert.** They almost certainly know it better than you. Your position is
  "engineer who knows Iterable and knows migrations", not "SFMC consultant".
- **Don't give a number** — not days, not rate. Turn the question back: *what's the budget for this
  project?*
- **Don't promise 600 → 5.**
- **Don't invent Iterable feature names.** If you're not sure: "I'll check and confirm on Monday." A
  developer who says that is more credible than one who's never wrong.
- **Don't talk more than 30% of the time.** It's a get-to-know. Whoever asks the questions controls
  the impression.

---

## 7. Questions to send in writing before Friday

Beyond the four in the account file, two worth adding — both make you sound like you've seen this
before:

5. How much of the segmentation sits in scheduled SQL query activities in Automation Studio, versus in
   Journey Builder?
6. Of the ~600 emails, how many actually sent anything in the last 12 months?

---

## 8. Vocabulary — to recognise the terms if they come up

**SFMC:** Data Extension (DE) · Subscriber Key · Contact Builder · Journey Builder · Automation Studio
· Query Activity · Content Builder · AMPscript · SSJS · GTL · Publication List · Send Classification ·
Sender Profile · Business Unit (MID) · Triggered Send · All Subscribers.

**Iterable:** User Profile · Custom Event · Catalog · List (static) · Segment (dynamic) · Journey ·
Template · Snippet · Data Feed · Handlebars / merge tags · Message Channel · Message Type · Project ·
`{{hostedUnsubscribeUrl}}`.

**From the German scope**, in case they quote it: *Anbindung* = connection/integration · *Datenmodell*
= data model · *Entry Audiences* = journey entry audiences · *Inhalte* = content · *voraussichtlich* =
presumably/estimated · *wenige* = few (not a number — which is precisely the problem).

---

## Verified sources

- [Iterable — Project Types and Unique Identifiers](https://support.iterable.com/hc/en-us/articles/9216719179796-Project-Types-and-Unique-Identifiers)
- [Iterable — Field Data Types](https://support.iterable.com/hc/en-us/articles/208183076-Field-Data-Types)
- [Iterable — Managing User Profile Fields](https://support.iterable.com/hc/en-us/articles/206430145-Managing-User-Profile-Fields-in-Iterable)
- [Iterable — Data Feeds Overview](https://support.iterable.com/hc/en-us/articles/204795659-Personalizing-Templates-with-Data-Feeds-)
- [Iterable — Using Data Feeds in Templates](https://support.iterable.com/hc/en-us/articles/39206002278932-Using-Data-Feeds-in-Templates)
- [Iterable — Personalizing Templates with Handlebars](https://support.iterable.com/hc/en-us/articles/205480365-Personalizing-Templates-with-Handlebars)
- [Iterable — Message Channels and Message Types Overview](https://support.iterable.com/hc/en-us/articles/204780529-Message-Channels-and-Message-Types-Overview)
- [Iterable — Creating a Subscription Preference Center](https://support.iterable.com/hc/en-us/articles/208463956-Creating-a-Subscription-Preference-Center)
- [Iterable — Maximizing Email Deliverability](https://support.iterable.com/hc/en-us/articles/205480215-Maximizing-Email-Deliverability)
- [SFMC Query Activity SQL — guide](https://rizexlabs.com/sfmc-query-activity-sql-guide/)
- [Automation Studio in Marketing Cloud — guide](https://deselect.com/automation-studio-marketing-cloud-guide/)
