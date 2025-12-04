# Domain Model (Key Entities)
- Organizations, Projects, Users, API Keys
- DataSources, Datasets, FeatureTables/Rows
- VectorStores/Collections/Items, KnowledgeBases, Documents
- LLM Providers/Agents, Guardrail Policies, Agent Test Suites/Runs
- Models/Versions, Experiments/Runs, Endpoints (strategies: simple/split/canary/bandit), Workflow DAGs/Runs
- Governance: RolePolicy (RBAC), AuditLog (with retention), DataPolicy (access restrictions), Secrets (encrypted), Comments, ShareLinks
- Growth/Analytics: ProductEvent, OnboardingState
- Extensibility: Templates, Plugins (data connectors, workflow nodes, LLM tools, metrics, widgets)

Indexes: inference logs by endpointId/modelVersionId createdAt; product events by org/eventName.
