# Deployment Notes (stubs)
- Dockerfiles: `Dockerfile.web`, `Dockerfile.worker` (production mode). Consider multi-stage builds with `npm ci --omit=dev`.
- Helm charts: see `deploy/helm` for web/worker values & deployments. Add Ingress, autoscaling, secrets (K8s Secrets for DATABASE_URL/REDIS_URL/MASTER_KEY), and liveness/readiness probes (`/api/health`).
- Redis/Postgres: sample values provided; for production use managed services.
- Kustomize: sample aggregator in `deploy/kustomize/kustomization.yaml`.
- TODO: add Helm templates for migrations Job and CronJobs for cleanup/drift checks.
- TODO: enable PodDisruptionBudgets, HPAs, resource requests/limits tuned per env.
- TODO: add ServiceMonitor manifests for Prometheus once MonitoringService is wired to metrics endpoints.
