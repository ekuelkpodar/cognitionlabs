import { PrismaClient } from "@prisma/client";

export interface CostBreakdown {
  orgId: string;
  projectId?: string;
  endpointId?: string;
  estimateCents: number;
  components: { name: string; cents: number }[];
}

// CostService computes estimated spend from usage + cost models. Replace with real billing API/Stripe integration.
export class CostService {
  constructor(private prisma: PrismaClient) {}

  async estimateOrg(orgId: string): Promise<CostBreakdown> {
    // TODO: fetch CostModel and OrgCostProfile; compute from UsageMetric aggregates
    return { orgId, estimateCents: 0, components: [] };
  }

  async estimateEndpoint(orgId: string, endpointId: string): Promise<CostBreakdown> {
    return { orgId, endpointId, estimateCents: 0, components: [] };
  }
}
