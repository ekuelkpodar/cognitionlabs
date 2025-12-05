import { PrismaClient } from "@prisma/client";

export class LabService {
  constructor(private prisma: PrismaClient) {}

  async startSession(labId: string, userId: string, organizationId: string) {
    const lab = await this.prisma.lab.findUnique({ where: { id: labId } });
    if (!lab) throw new Error("Lab not found");
    return this.prisma.labSession.create({
      data: {
        labId,
        userId,
        organizationId,
        status: "ACTIVE",
        environmentConfigSnapshot: lab.config,
        startedAt: new Date()
      }
    });
  }
}
