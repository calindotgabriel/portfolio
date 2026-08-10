# Account: Iterable migration (client name unknown — via Razvan)

## Snapshot

- Company URL: **unknown** — end client not yet named
- Segment: Marketing-platform migration / Iterable implementation, German-speaking client
- Pipeline status: `interviewing` — discovery call scheduled
- Fit score: 89/100 (contract track)
- Assigned role chat: Lead Job Search
- Last verified: 2026-08-10

**Discovery call: Friday 2026-08-14, 15:00 Europe/Bucharest.**

## Score Breakdown

| Component | Score | Maximum | Evidence |
| --- | ---: | ---: | --- |
| Technical and domain fit | 22 | 25 | Iterable in production at ImmoScout24; migration shape proven at RWE; the 600-email consolidation is a data-modelling and refactoring problem, which is core competence |
| Active hiring or contract signal | 25 | 25 | Call booked with a date, plus a written scope from the project owner. Strongest possible signal |
| Relevance of Calin's proof | 18 | 20 | Direct Iterable integration proof; RWE Java→NestJS as the transferable migration story. Not a full SFMC migration — that gap is real |
| Remote-EU compatibility | 12 | 15 | Remote assumed but unconfirmed; working language unresolved |
| Reachable contact path | 10 | 10 | Direct contact with Razvan, who owns the project; call already scheduled |
| Likely rate viability | 2 | 5 | No budget signal whatsoever |
| **Total** | **89** | **100** | |

## Verified Facts

Everything below comes from Razvan's written scope, received 2026-08-10. Nothing else about this
client is confirmed.

1. **Platform setup** including connection to the client's CRM, and mapping of their data into the
   Iterable data model. — *"Setup der neuen Plattform incl. Anbindung an unser CRM und Mappings
   unserer Daten in das Iterable-Datenmodell"*
2. **Rebuild of existing journeys**, including creating the new entry audiences. — *"Setup der
   bestehenden Journeys incl. erstellen der neuen Entry Audiences"*
3. **Migration and consolidation of existing content.**
4. **The largest block, in the client's own estimate: ~600 emails to be migrated and reduced to a
   small number of dynamic emails.** — *"Voraussichtlich der grösste Block: ca. 600 Emails sollen
   migriert und dabei auf wenige dynamische E-Mails reduziert werden"*
5. The scope was written in German.

## Hypotheses

- **The CRM stays; Iterable replaces something else on the marketing side.** "Anbindung an unser CRM"
  reads as an integration to a system that remains in place. Which marketing system is being replaced
  is not stated anywhere. — medium confidence, and it is the single most consequential unknown.
- **"Salesforce" may mean Sales Cloud (CRM), not Marketing Cloud.** If so, this is a data-sync and
  integration project rather than a marketing-automation migration — a materially different job with
  different risks. — medium confidence.
- **The 600 emails are largely near-duplicates.** Nobody asks to reduce 600 to "a few" unless the
  redundancy is visible. — medium-high confidence, unverified.
- **Scope is genuinely undefined on their side too.** "Wenige" is not a number. — high confidence.

## Unknowns and Disqualifiers

**Unknowns, in order of how much they change the engagement:**

1. Source system on the marketing side. Everything else depends on this.
2. Working language. The scope arrived in German; Calin has Romanian and English C1, no German.
   Worked with German and Austrian teams before, presumably in English — needs confirming, because
   a German-only requirement is a hard blocker, not a preference.
3. Is Iterable already contracted, or still under evaluation? Changes urgency completely.
4. How many distinct clusters actually sit inside the 600 emails.
5. Budget, engagement form (B2B contract?), duration, deadline, remote arrangement.
6. Where consent and unsubscribe state currently live, and in what format.
7. Who owns content decisions on their side, and whether that person has capacity.

**No disqualifier identified.** German-as-mandatory is the only candidate and is unverified.

## Entry Strategy

- **Primary angle:** the 600-email consolidation is a refactoring problem, not an email-marketing
  problem — find what varies across 600 near-identical things and parameterise them into N
  data-driven templates. That is data modelling and systematic abstraction, which is what Calin
  actually does.
- **Why now:** unknown, and worth asking directly. The answer separates real urgency from exploration.
- **Closest proof:** Iterable integrated into production at ImmoScout24, inside a mature AWS/MongoDB
  platform with unit, integration and E2E coverage.
- **Supporting proof:** RWE Java→NestJS migration — different technology, same shape. Legacy to new,
  sliced, test-protected, no big-bang rewrite.
- **Likely objection:** "have you run a full migration onto Iterable before?" Answer honestly — no.
  See the positioning line below.
- **CTA:** ask for a sample of 20–30 of the emails, and offer a scope assessment within three days.
  A small step accepted beats a large contract discussed.

## Pre-Call Questions

**Ask before Friday, in writing:**

1. Which system are we migrating from on the marketing side? Is "Salesforce" the CRM or Marketing Cloud?
2. What varies across the 600 emails — language, brand, product, lifecycle stage? Can I see 20–30 samples?
3. Is Iterable already contracted, or still under evaluation?
4. What language does the call and the project run in?

**Ask on the call — they should be talking 70% of the time:**

- What is making you migrate *now*? Budget, an expiring contract, or a technical limit?
- How many journeys and automations are live? How many templates?
- Monthly send volume, and how many contacts?
- Where does consent live today, and in what format?
- What happens if this slips by two months?
- Who does marketing ops on your side, and do they have capacity?
- Have you attempted this before? What happened?
- Deadline? Is budget already allocated?

## Positioning — honest, rehearsed in advance

> I've integrated Iterable in production at ImmoScout24, so I know the data model and the API. I have
> not led a full migration onto Iterable. I have led legacy migrations — at RWE, Java to NestJS,
> sliced and test-protected rather than rewritten. Here's how I'd approach this one, and what I'd want
> to check in the first two weeks.

Stronger than a bluff. Clients have been oversold before and recognise the difference.

## Commercial Posture

Per `../core-proposal.md`: anchor €55–65/hour, long-term floor €35/hour effective.

- **Do not say a number first.** Return the question: *what is the budget for this project?*
- **No fixed price before discovery.** With 600 emails and no cluster count, undefined scope is the
  entire risk, and a fixed price transfers all of it to Calin.
- Prepared answer to "how long will it take": *it depends entirely on how many real clusters are in
  there — 600 emails could be 8 templates or 80, and that is several times the effort. I'd want to
  see a sample of 20–30 before giving any number.* True, careful, and competent at the same time.

## Migration Risks Worth Naming On The Call

Naming two or three of these signals real production experience:

1. **Consent and unsubscribe state** must migrate exactly. Getting it wrong is GDPR exposure, not a bug.
2. **Deliverability** — a new sending domain and IP need warm-up, so cutover cannot happen overnight.
3. **Journeys do not map 1:1.** Each one gets rethought, not translated.
4. **Template language is a rewrite**, not a conversion.
5. **Engagement history** usually does not come across.
6. **Event instrumentation** has to be redone in the product — that touches their engineering team,
   not just marketing.
7. **Phased cutover**, campaign by campaign, running in parallel. Never big bang.

## Conversation and Outcome

| Date | Event | Facts | Next step | Owner |
| --- | --- | --- | --- | --- |
| 2026-08-10 | Inbound via LinkedIn; discovery call agreed for Friday 15:00 | One of four leads that replied the same day | Send the four pre-call questions | Calin |
| 2026-08-10 | Razvan sent the written scope (German) | Four work blocks; ~600 emails named as the largest | Prep sessions Tue–Fri, see calendar | Calin |

## After The Call

Within two hours, while it is still accurate: fill in the Conversation table above with names,
volumes, deadlines and who decides, then add a `#nota` entry in `../../training/journal.md`. Add a
row to `../pipeline.csv` once the client's actual name is known.
