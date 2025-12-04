import { PrismaClient } from "@prisma/client";

// ControlPlaneService orchestrates internal agents (Ops, Quality, Governance) and records suggestions.
export class ControlPlaneService {
  constructor(private prisma: PrismaClient) {}

  async recordSuggestion(input: {
    agentType: string;
    organizationId?: string;
    projectId?: string;
    targetType: string;
    targetId?: string;
    suggestionText: string;
    impactEstimate?: object;
  }) {
    return this.prisma.controlPlaneSuggestion.create({ data: { ...input, status: "OPEN" } });
  }

  async list(orgId?: string) {
    return this.prisma.controlPlaneSuggestion.findMany({ where: orgId ? { organizationId: orgId } : {}, orderBy: { createdAt: "desc" } });
  }
}
