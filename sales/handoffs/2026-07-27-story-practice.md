# Interview Story Practice — 2026-07-27

## Purpose

These are spoken practice paragraphs grounded only in the current verified resume and interview narrative. Practice the sequence and meaning rather than memorizing every word. Keep each answer conversational and stop after the result unless the interviewer asks for technical depth.

## 1. Positioning Introduction

I'm a senior Node.js and TypeScript engineer focused on backend systems where correctness, performance, and safe delivery matter. Most recently, at Bitpanda, I built application-layer services for an institutional crypto-custody platform used by banks, working with Fastify, GraphQL, TypeScript, and AWS. Before that, I worked on data-heavy and distributed products at RWE and ImmoScout24. My strongest work tends to be in migrations, APIs, integrations, testing, and performance problems where a team needs someone who can understand the existing system, own a meaningful slice, and ship it safely.

## 2. Bitpanda Ownership and Financial-Risk Story

At Bitpanda, I owned the backend of a crypto address-book feature for an institutional custody platform. The important part was not simply storing addresses: in a custody product, accepting the wrong address can have irreversible financial consequences. I designed the API, data model, validation rules, tests, and release path using Fastify, GraphQL, TypeScript, and AWS services. I worked backwards from the failure cases—what the system must never allow—and shipped the feature to production. That experience taught me to treat validation and security as domain behavior, not as cleanup added after the feature works.

## 3. RWE Performance Story

At RWE, energy-market exports were taking about 45 minutes, which made them difficult to use during normal analyst workflows, and API latency was also affecting users. I profiled the system first so I could separate the real bottlenecks from assumptions. I optimized the MongoDB-heavy filtering paths and moved CPU-intensive export work into Node.js worker pools so it would not block normal API work. The export time dropped from 45 minutes to 12 minutes, and API response times improved by 65 percent. The main lesson was that performance work should start with measurement and end with a result that matters to the user's workflow.

## 4. RWE Migration and Safe-Change Story

RWE also had legacy Java components in an energy-market data platform that a small team needed to modernize without creating a risky rewrite. I helped move owned paths toward NestJS services, worked on the MongoDB-backed data flows, and introduced end-to-end testing practices early enough to protect the replacement work. The goal was not to redesign everything at once; it was to create a clear TypeScript service path and make each migration slice safe to release. That is the approach I bring to existing platforms: understand the constraints, improve one meaningful boundary, and leave the team with a safer path for the next change.

## 5. Mentoring and Seniority Story

At Endava, I mentored two junior developers who were joining React and Node.js project work. I tried not to become the person who simply fixed their code for them. Instead, I explained the architecture, the trade-offs behind implementation choices, and how to break a problem into something they could verify independently. Both developers integrated successfully into the team. I used the same style later at RWE when giving technical guidance on Node.js architecture: make the reasoning clear, give people enough context to decide well, and avoid turning seniority into a bottleneck.

## 6. Truthful Experience-Duration Answer

I started working professionally in 2013, then stepped away from full-time employment while completing my Computer Science degree, and later took a deliberate break between engagements before the RWE contract. My listed employment adds up to roughly eight years of hands-on professional delivery, so I do not present it as ten continuous years. What I can demonstrate is senior ownership in production: regulated custody work at Bitpanda, a two-year RWE engagement with measured performance improvements and migration work, and delivery inside mature distributed product teams.

## Practice Rhythm

- Introduction: 45–60 seconds.
- Main story: 60–90 seconds.
- Use the order: context, responsibility, actions, result, relevance.
- Keep one result number in the RWE performance story: 45 to 12 minutes, plus 65% faster APIs.
- Do not add technologies, team size, revenue, user counts, or business outcomes that are not in the verified source material.

