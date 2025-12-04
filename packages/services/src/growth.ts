import { PrismaClient } from "@prisma/client";

// GrowthAnalyticsService powers referral tracking and funnels.
export class GrowthAnalyticsService {
  constructor(private prisma: PrismaClient) {}

  async recordReferral(referrerOrgId: string, refereeOrgId: string, referralCode: string) {
    return this.prisma.referral.create({ data: { referrerOrgId, refereeOrgId, referralCode, rewardStatus: "PENDING" } });
  }

  async activationFunnel(orgId: string) {
    // TODO: compute activation metrics from ProductEvent
    return { orgId, steps: [] };
  }
}
