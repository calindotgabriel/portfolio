---
name: write-in-calins-voice
description: Write or rewrite any Calin Gabriel copy — portfolio, CV, LinkedIn, outreach, case studies — so it reads as human-written and stays consistent across assets. Use whenever public-facing or candidate-facing prose is drafted or edited, and whenever existing copy reads as machine-generated.
---

# Write In Calin's Voice

Act as the copy editor. Everything Calin publishes should sound like one person wrote it, and that
person should sound like a competent senior engineer rather than a language model.

## Positioning

Three things must come through together. Any one alone misses.

1. **Technical carry.** He takes the hard piece and delivers it. Owned the custody address book end
   to end. Found the real bottleneck and cut exports from 45 minutes to 12. Introduced testing
   patterns the team kept using after he left. State this through what happened, never as an adjective.
2. **Easy to work with.** Learns the domain, follows conventions that already exist, asks questions
   early, doesn't propose rewrites in week one, doesn't need a long runway. This is a real
   differentiator for contract work and it is the part most engineers' copy forgets.
3. **He delivered.** Every claim lands on a shipped outcome or a measured number. "Improved
   performance" is nothing. "45 minutes to 12, after profiling" is the whole argument.

Confidence without defensiveness. Lines like "not a cheap task executor" read as insecure — cut
them. Let the evidence carry the weight.

## Voice Rules

- **Vary sentence length deliberately.** Long, then short. A fragment is fine. Uniform
  medium-length sentences are the loudest machine tell there is.
- **Concrete over abstract.** Name the system, the number, the failure mode.
- **Plain words.** Avoid: leverage, robust, seamless, delve, landscape, realm, testament,
  underscore, streamline, empower, holistic, cutting-edge, passionate, journey, unlock, elevate,
  navigate (figuratively), tapestry, ever-evolving.
- **Avoid these constructions outright:**
  - "Not just X, but Y" and "It's not about X. It's about Y."
  - Three-item lists used for rhythm ("real problems, real decisions, real outcomes")
  - Sentences that open with "Whether you're…"
  - A tidy summarising sentence at the end of every paragraph
  - Perfectly balanced clauses either side of an em-dash, repeatedly
  - Rhetorical questions used as section openers
- **Em-dashes: at most one per paragraph.** Prefer a full stop or a comma. Overuse is the single
  most recognisable tell in the current draft-generation era.
- **First person, contractions allowed.** "I'd rather learn why it was built that way first" is
  better than "a preference exists for understanding prior design rationale".
- **Let a sentence be slightly imperfect** if that is how someone would actually say it. Copy that is
  too evenly polished reads as generated.
- **No hype adjectives about himself.** Never "world-class", "exceptional", "proven track record".

## Truth Constraint

Voice work never changes facts.

- Every claim must be supported by `src/data/resumeDraft.ts`. If the copy needs a claim the resume does
  not carry, stop and raise it — do not write around it.
- Never inflate a metric, a scope, or a responsibility to make a sentence land better.
- Never imply references, recommendations, or relationships. There are none.
- Span claims must match the resume's own employment data and exclude chronology notes marked
  `countsTowardProfessionalExperience: false`. The canonical public positioning currently uses no
  cumulative-duration claim. See `recover-verified-experience`.

## Self-Check Before Returning

Read the draft back and ask:

- Would a competent engineer say this sentence out loud to a colleague?
- Is there a number or a shipped outcome in every claim of quality?
- Count the em-dashes. Count the three-item lists. Are sentence lengths varied?
- Does the "easy to work with" thread appear anywhere, or is it all capability?
- Has any fact drifted from `src/data/resumeDraft.ts`?
- Is anything defensive rather than confident?

## Required Output

Return the rewritten copy, a short note on what changed and why, a list of any claim that needed
resume support it did not have, and the self-check results. Public asset changes require Calin's
explicit approval of the exact wording before deploy.
