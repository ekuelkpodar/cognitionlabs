# Cognition Labs Platform

Abacus.ai–style AI/ML + LLM Ops platform scaffold built as a modern SaaS web app. The monorepo uses Next.js 15, Prisma/Postgres, Tailwind/shadcn-style components, and a BullMQ worker for training/embeddings/workflows.

## Apps & Packages
- `apps/web` – Next.js App Router frontend + API route handlers. Includes dashboard, data/ML/LLM sections, and placeholder auth endpoints.
- `apps/worker` – BullMQ-based worker with stub processors for training, embeddings, and workflow orchestration.
- `packages/db` – Prisma schema + seed script with sample org, data source, dataset, vector store, KB, agent, model, endpoint, workflow.
- `packages/shared` – Shared Zod schemas and types for validation between API and worker.
- `packages/services` – Service-layer modules (RBAC, audit, projects, guardrails, experiments, usage, templates, plugins).
- Governance & quotas: new API routes and services for guardrails, templates, plugins, data policies, usage metrics, and quota checks; worker gains agent test processor and canary orchestration loop placeholder.

## Getting Started
1. Install deps: `npm install`
2. Set `DATABASE_URL` in `.env` for Postgres (pgvector recommended).
3. Run Prisma: `npm run prisma:migrate` then `npm run seed`.
4. Start web: `npm run dev:web` (Next.js + API routes).
5. Start worker: `npm run dev:worker` (requires Redis for BullMQ).

## Notes
- Auth endpoints are simple placeholders; wire NextAuth/SSO and secure session tokens before production.
- Billing/Stripe hooks, provider secrets, and real training/embedding implementations are stubbed for local dev.
- API routes exist for core entities (orgs, data sources, datasets, feature store, vector store, models, workflows, endpoints) and can be expanded per the requirements.
- V2 schema includes projects, RBAC role policies, audit logs, experiments, guardrails, templates/marketplace, plugins, usage metrics, and secrets/data governance scaffolding.
