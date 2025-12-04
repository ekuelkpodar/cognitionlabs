import { PrismaClient } from "@prisma/client";

export class UsageService {
  constructor(private prisma: PrismaClient) {}

  async track(orgId: string, metricName: string, delta: number, projectId?: string) {
    const now = new Date();
    const periodStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const periodEnd = new Date(periodStart.getTime() + 24 * 60 * 60 * 1000);
    await this.prisma.usageMetric.upsert({
      where: {
        organizationId_metricName_periodStart_periodEnd: {
          organizationId: orgId,
          metricName,
          periodStart,
          periodEnd
        }
      },
      update: { value: { increment: delta } },
      create: { organizationId: orgId, projectId, metricName, periodStart, periodEnd, value: delta }
    });
  }
}
