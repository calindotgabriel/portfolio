# Reliability, Redis and Queue Evidence Audit — 2026-07-25

## Handoff

- Objective: Determine which high-availability, Redis, caching, message-queue, background-job, and job-queue claims are supported by Calin’s existing evidence.
- Inputs and file paths: `src/data/resume.ts`; `src/data/projects.ts`; relevant `src/pages/projects/`; `docs/interview-narrative.md`; `docs/market-fit-plan.md`; `sales/core-proposal.md`; repository history and tracked source files where useful.
- Output path: `sales/handoffs/2026-07-25-reliability-queues-audit-results.md`.
- Verified evidence: Current resume lists Redis as a database skill and establishes AWS serverless/microservices, tested distributed systems, worker pools, Lambda document processing, WebSockets, performance work, and production-safety practices. It does not currently establish a named Redis caching implementation, Redis-backed queue, RabbitMQ/Kafka/SQS ownership, formal high-availability design, failover, replication, disaster recovery, SLOs, or on-call ownership.
- Required deliverable: Evidence table for each requested concept; safe and unsafe wording; exact missing facts requiring Calin confirmation; recommended profile placement. Do not convert architectural adjacency into production ownership.
- Recommendation: Use “reliability-minded distributed backend delivery” where supported; keep high availability and queue technologies out of experience claims unless direct evidence is found.
- Blockers or unknowns: Project-specific Redis usage, cache design, queue technology, retries/dead-letter handling, HA/failover responsibility, operational metrics, and on-call duties are unverified.
- Next owner: Lead Contract Sales.
- Due date: 2026-07-25.
- External action: Draft only; Calin approval required.
