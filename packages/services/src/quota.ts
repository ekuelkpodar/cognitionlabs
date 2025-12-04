import { PlanTier, PrismaClient } from "@prisma/client";

const PLAN_LIMITS: Record<PlanTier, { maxProjects: number; maxEndpoints: number; monthlyTokens: number }> = {
  FREE: { maxProjects: 2, maxEndpoints: 2, monthlyTokens: 100_000 },
  PRO: { maxProjects: 20, maxEndpoints: 20, monthlyTokens: 5_000_000 },
  ENTERPRISE: { maxProjects: 200, maxEndpoints: 200, monthlyTokens: 100_000_000 }
};

export class QuotaService {
  constructor(private prisma: PrismaClient) {}

  async assertProjectQuota(orgId: string) {
    const org = await this.prisma.organization.findUnique({ where: { id: orgId } });
    if (!org) throw new Error("Org not found");
    const limits = PLAN_LIMITS[org.planTier];
    const count = await this.prisma.project.count({ where: { organizationId: orgId } });
    if (count >= limits.maxProjects) throw new Error("Project quota exceeded");
  }

  async assertEndpointQuota(orgId: string) {
    const org = await this.prisma.organization.findUnique({ where: { id: orgId } });
    if (!org) throw new Error("Org not found");
    const limits = PLAN_LIMITS[org.planTier];
    const count = await this.prisma.endpoint.count({ where: { organizationId: orgId } });
    if (count >= limits.maxEndpoints) throw new Error("Endpoint quota exceeded");
  }
}
