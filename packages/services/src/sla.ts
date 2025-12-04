import { PrismaClient } from "@prisma/client";

export class SlaService {
  constructor(private prisma: PrismaClient) {}

  async evaluateSla(slaConfigId: string, metrics: { uptime: number; latencyP95: number; errorRate: number }) {
    // TODO: compare metrics with objectives, create violations when breached
    return this.prisma.slaViolation.create({
      data: {
        slaConfigId,
        details: { metrics },
        status: "OPEN"
      }
    });
  }
}
