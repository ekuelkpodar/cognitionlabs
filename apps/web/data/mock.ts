export const dataSources = [
  { name: "Supply Chain Warehouse", type: "Postgres", status: "Connected", lastSync: "2h ago" },
  { name: "Product CSV Upload", type: "File Upload", status: "Ready", lastSync: "12m ago" },
  { name: "Snowflake Analytics", type: "Snowflake", status: "Connected", lastSync: "5h ago" }
];

export const datasets = [
  { name: "orders_daily", source: "Supply Chain Warehouse", lastRefresh: "2h ago", rows: "182k" },
  { name: "customers_scored", source: "Feature Store", lastRefresh: "30m ago", rows: "51k" }
];

export const featureTables = [
  { name: "customer_features", keys: "customer_id", features: "ltv, rfm_score, nps", updated: "30m ago" },
  { name: "product_demand", keys: "sku, date", features: "forecast, anomaly_score", updated: "1h ago" }
];

export const vectorStores = [
  { name: "atlas-pgvector", backend: "pgvector", collections: 3, items: "12.4k" },
  { name: "research-memory", backend: "external", collections: 1, items: "4.1k" }
];

export const agents = [
  { name: "Ops Copilot", model: "gpt-4o-mini", kb: "Operations KB", type: "Chat" },
  { name: "SQL Operator", model: "claude-3.5", kb: "", type: "Operator" }
];

export const knowledgeBases = [
  { name: "Operations KB", docs: 42, status: "Embedded", vectorStore: "atlas-pgvector" },
  { name: "API Docs", docs: 18, status: "Embedding", vectorStore: "atlas-pgvector" }
];

export const models = [
  { name: "demand-forecast", type: "Forecasting", prod: "v1", metric: "RMSE 0.21" },
  { name: "churn-predictor", type: "Classification", prod: "v3", metric: "AUC 0.91" }
];

export const workflows = [
  { name: "Daily Feature Refresh", status: "Success", lastRun: "2h ago" },
  { name: "Weekly Retrain", status: "Scheduled", lastRun: "3d ago" }
];

export const endpoints = [
  { name: "forecast-api", traffic: "12k/d", latency: "210ms", status: "Healthy" },
  { name: "ops-copilot", traffic: "4k/d", latency: "240ms", status: "Healthy" }
];

export const projects = [
  { name: "Atlas Supply Chain", slug: "atlas-supply", status: "Active", models: 4, endpoints: 2, activity: "Deploy v2 1h ago" },
  { name: "Customer Success AI", slug: "cs-ai", status: "Active", models: 3, endpoints: 1, activity: "KB refresh 30m ago" }
];

export const auditLogs = [
  { actor: "Uma Engineer", action: "Deploy model v2", resource: "endpoint:forecast-api", time: "12m ago" },
  { actor: "API key", action: "Create dataset", resource: "dataset:orders_daily", time: "1h ago" }
];

export const guardrails = [
  { name: "Content filter", type: "CONTENT_FILTER", attached: 3 },
  { name: "PII detector", type: "PII_DETECTION", attached: 2 }
];

export const experiments = [
  { name: "Forecast baseline", runs: 3, bestMetric: "RMSE 0.21" },
  { name: "Prompt evals", runs: 5, bestMetric: "Pass 92%" }
];

export const usageMetrics = [
  { metric: "LLM tokens", value: "412k", trend: "+12%" },
  { metric: "Endpoint requests", value: "54k", trend: "+4%" }
];
