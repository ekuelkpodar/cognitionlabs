# Platform Architecture (V2+)

- **Frontend**: Next.js App Router (apps/web) served via CDN/edge; talks to API routes (BFF) and uses SWR/React Query.
- **API/BFF**: Next.js route handlers acting as thin controllers delegating to domain packages (`packages/services`, future `/packages/auth`, `/packages/ml`, etc.).
- **Workers**: Node workers (apps/worker) running BullMQ queues (training, embeddings, workflows, agent tests, canary orchestrator). Future pods per queue in Kubernetes.
- **Data plane**: Postgres + Prisma (primary DB), Redis (cache + rate limits + queues), pgvector (vector store). External vector DBs can be swapped via service interfaces.
- **Object storage**: S3-compatible for artifacts and documents (TODO: wire client + signed URLs).
- **Observability**: MonitoringService abstraction; ready for Prometheus/OpenTelemetry exporters. Health endpoint `/api/health` probes DB/Redis.

## Deployment Topology (future K8s)
```
[Internet]
   |-- CDN/Edge -- Ingress --> [Next.js Web/API]
                     |--> Redis (cache/rate limit/queues)
                     |--> Postgres (managed) + pgvector
                     |--> Object Storage (S3)
              Worker Deployment(s) per queue: training, embeddings, workflows, agent-tests, canary
```
- Define Dockerfiles per app (web, worker). Helm/Kustomize charts should deploy web (Deployment + Service + HPA), worker deployments, Redis (if self-managed), config via ConfigMaps/Secrets, and Jobs for migrations/seeds.
- Multi-region: duplicate stack per region; store region in config; use read replicas for analytics queries.

## Packages (monorepo modules)
- `packages/shared`: DTOs/validators/types.
- `packages/services`: domain services (RBAC, audit, projects, experiments, guardrails, copilot, quota, data policies, cache, rate limit, monitoring, registry, tenant context, etc.).
- Planned: `packages/auth`, `packages/data`, `packages/vector`, `packages/ml`, `packages/llm`, `packages/workflows`, `packages/monitoring` to isolate domain logic as the codebase grows.

## Config
- All services load env via a typed config module. `.env.example` documents required vars (`DATABASE_URL`, `REDIS_URL`, `MASTER_KEY`, feature flags).
- Feature flags: gate marketplace/guardrails/copilots via env or DB table (TODO).

## Data flows (high level)
- Requests resolve tenant context (org/user), enforce RBAC, quotas, data policies.
- Controllers delegate to service layer; service uses caching (RedisCache) for frequently read configs.
- Heavy ops -> queues; worker processes execute with retries and DLQ (TODO) and emit monitoring events.
- Observability page consumes `/api/observability`; health check at `/api/health`.

See `docs/setup.md` and `docs/domain.md` for setup and domain notes.
