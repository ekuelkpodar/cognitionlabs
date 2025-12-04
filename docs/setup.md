# Setup
1. Install deps: `npm install`
2. Env: copy `.env.example` to `.env`. Set `DATABASE_URL`, `REDIS_URL`, `MASTER_KEY` (for encrypting Secrets), feature flags.
3. Prisma: `npm run prisma:migrate` then `npm run seed`.
4. Web dev: `npm run dev:web`
5. Worker dev: `npm run dev:worker` (Redis required)

## Adding a Workflow Node Type
- Implement `WorkflowNodeHandler` (see `packages/services/src/registry.ts`).
- Register in `WorkflowNodeRegistry` and call from worker orchestration.
- For plugin-driven nodes, store plugin config in DB and resolve runtime via registry/HTTP.

## Adding an LLM Provider
- Store provider base URL + secret ref in `LlmProviderConfig` (keys in `Secret`).
- Implement provider client behind an interface; inject into Agent service; add guardrails and monitoring wrappers.

## Adding a Template / Blueprint
- Create Template row with type + config JSON.
- Expose via `/api/templates` and surface in UI gallery.
