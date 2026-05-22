# EU B2B Senior Contract Interview Narrative

## Positioning Answer

I am a senior Node.js/TypeScript engineer focused on backend-heavy product systems. My strongest fit is teams modernizing or scaling production services where delivery risk matters: migrations, data-heavy APIs, testing, integrations, and performance.

I am available immediately from Romania for remote EU work, and I prefer long-term B2B contracts where I can own meaningful slices of an existing system rather than just clear tickets.

## Contract Win Condition

- Target: remote EU-compatible senior Node.js/TypeScript contract or contract-to-hire.
- Proof threshold: at least 70% overlap with Node.js, TypeScript, React, databases, cloud, testing, performance, migration, platform/product delivery.
- Offer goal: one long-term B2B contract within 30 days after focused outreach.
- Funnel goal: 30 qualified leads, 20 direct applications or direct notes, 5 replies, 3 interviews.

## Story 1: RWE Migration

Use when asked about legacy modernization, ownership, or backend architecture.

- Situation: RWE had legacy Java components in an energy-market data platform that were hard for a small team to extend safely.
- Task: Help move replacement work into Node.js/NestJS while keeping migration risk controlled.
- Action: Worked on the NestJS replacement path, MongoDB-backed data flows, and test coverage for owned features.
- Result: The team gained a clearer TypeScript service path for follow-up work, with production behavior protected by tests.
- Buyer relevance: I can enter an existing system, understand domain constraints, and modernize backend paths without treating the project like a greenfield rewrite.

## Story 2: RWE Performance And Export Optimization

Use when asked about performance, debugging, profiling, or measurable business impact.

- Situation: Energy market exports took 45 minutes and API response times were slow enough to affect daily analyst workflows.
- Task: Reduce latency and make large exports practical during the workday.
- Action: Used profiling to locate real bottlenecks, optimized MongoDB-heavy filtering paths, and moved expensive export work into worker pools.
- Result: Export time dropped from 45 minutes to 12 minutes, and API responses improved by 65%.
- Buyer relevance: I do not guess at performance fixes; I measure first, isolate the expensive path, and ship changes tied to user workflow impact.

## Story 3: ImmoScout24 Quality-Bar Adaptation

Use when asked about ramp-up, senior collaboration, code review, or joining mature teams.

- Situation: ImmoScout24 Austria was a mature distributed platform with strong unit, integration, and e2e test expectations.
- Task: Become productive without lowering release quality.
- Action: Shipped targeted search/listing improvements, matched review standards, and calibrated when to sync with senior engineers or push independently.
- Result: Contributed inside a high-quality production environment without needing a long runway.
- Buyer relevance: I can join teams that already have standards and become useful without creating extra coordination drag.

## Story 4: Iterable Product Integration

Use when asked about integrations, product collaboration, or business enablement.

- Situation: Marketing automation needed to connect to product flows without creating constant engineering dependency for campaign changes.
- Task: Integrate Iterable into the existing Scout24 product context.
- Action: Worked across React/Node surfaces and respected SEO, testing, and release constraints.
- Result: Marketing teams gained more automation leverage while the engineering team protected platform quality.
- Buyer relevance: I can handle third-party integrations as product work, not just API glue.

## Story 5: Endava Payments And Checkout

Use when asked about payments, reliability, or enterprise client work.

- Situation: NETS checkout work required reliable React/TypeScript delivery across multiple payment methods, including Klarna and card flows.
- Task: Build checkout functionality where edge cases affect money, reconciliation, and trust.
- Action: Implemented frontend payment flows with attention to user states and payment-critical behavior.
- Result: Delivered enterprise payment work inside an agency/client environment.
- Buyer relevance: I understand that production work is not only code correctness; it is trust, edge cases, and domain risk.

## Story 6: Mentoring And Communication

Use when asked about seniority, leadership, stakeholder communication, or team behavior.

- Situation: At Endava, junior developers needed support integrating into React and Node.js project work.
- Task: Help them become productive without taking over their work.
- Action: Guided React practices, Node.js architecture decisions, and the reasoning behind implementation choices.
- Result: Two junior developers integrated successfully into the development team.
- Buyer relevance: I raise team throughput by making decisions clearer, not by becoming a bottleneck.

## Technical Depth To Prepare

- Node.js: event loop, worker threads, worker pools, profiling, API latency, when CPU-bound work must leave the main thread.
- NestJS: module boundaries, service design, validation, testing strategy, migration slices, dependency injection tradeoffs.
- Databases: MongoDB aggregation profiling, indexes, query shape, PostgreSQL tradeoffs, Redis use cases.
- Testing: unit versus integration versus e2e, TDD in migration work, regression safety, reviewable test boundaries.
- React: product delivery, state boundaries, SEO-sensitive pages, integration work, avoiding a frontend-only positioning trap.
- Cloud/delivery: AWS, Docker, CI/CD, honest boundaries around deeper Kubernetes/IaC ownership if asked.

## Contract-Specific Answers

- Availability: immediate.
- Engagement: long-term B2B preferred, contract-to-hire acceptable if the scope is strong.
- Location: Romania, Europe/Bucharest timezone, EU citizen.
- Collaboration: async-friendly, clear written updates, weekly delivery rhythm, early risk flags.
- Rate: define target band before each call; do not improvise under pressure.
- Best project shape: existing product/platform team with backend, data, integration, migration, or quality risk.

## Pre-Interview Brief Template

Before each interview, prepare one page with:

- Why this company: one concrete domain or product reason.
- Why this role: stack overlap and production risk fit.
- Closest proof: one case study only, not all of them.
- Likely risks I can reduce: migration risk, data/API performance, integration quality, testing/release confidence, or senior delivery clarity.
- Questions to ask: success criteria for first 30 days, current bottleneck, test/release process, ownership boundaries, remote collaboration rhythm.
