import { PrismaClient } from "@prisma/client";

// UiCopilotService: uses LLM to propose views/blocks (stubbed).
export class UiCopilotService {
  constructor(private prisma: PrismaClient) {}

  async proposeView(orgId: string, workspaceId: string, prompt: string) {
    // TODO: call LLM with schema/context to draft AiView + blocks. Return mock for now.
    return {
      name: "Suggested Dashboard",
      blocks: [
        { type: "CHART", title: "Latency p95", config: { source: "endpoints", metric: "latency" }, layout: { w: 6, h: 4 } },
        { type: "TABLE", title: "Recent Errors", config: { source: "logs", filter: { statusCode: ">=500" } }, layout: { w: 6, h: 4 } }
      ]
    };
  }
}
