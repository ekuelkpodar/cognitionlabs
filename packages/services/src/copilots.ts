import { PrismaClient } from "@prisma/client";

/** Copilot stubs that eventually call LLM providers with org/project context. */
export class CopilotService {
  constructor(private prisma: PrismaClient) {}

  async suggestDatasets(projectId: string, goal: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId }, include: { datasets: true } });
    if (!project) throw new Error("Project not found");
    // TODO: call LLM with schema metadata; return drafted SQL + feature ideas.
    return {
      suggestions: [
        {
          name: "orders_enriched",
          sql: "select date, customer_id, sum(amount) as revenue from orders group by 1,2",
          features: ["revenue_7d", "orders_30d"],
          rationale: `Based on project ${project.slug}, enrich orders for forecasting.`
        }
      ],
      note: `Mocked suggestion for goal: ${goal}`
    };
  }

  async suggestPipeline(projectId: string, problem: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new Error("Project not found");
    return {
      steps: [
        { type: "IngestData", config: { source: "primary" } },
        { type: "TransformData", config: { description: "Clean, impute, join" } },
        { type: "TrainModel", config: { algorithm: problem.includes("forecast") ? "xgboost_ts" : "xgboost" } },
        { type: "EvaluateModel", config: { metric: problem.includes("forecast") ? "RMSE" : "AUC" } },
        { type: "DeployModel", config: { endpoint: `${project.slug}-api` } }
      ],
      rationale: `Generated pipeline for ${problem}`
    };
  }

  async explainMetrics(endpointId: string, stats: { metric: string; value: number; change: number }) {
    const endpoint = await this.prisma.endpoint.findUnique({ where: { id: endpointId } });
    if (!endpoint) throw new Error("Endpoint not found");
    return {
      summary: `Metric ${stats.metric} is ${stats.value} (${stats.change}% vs prior).`,
      recommendations: ["Collect more recent data", "Tighten drift thresholds", "Trigger retrain workflow"],
      endpoint: endpoint.name
    };
  }
}
