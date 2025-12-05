import { PrismaClient } from "@prisma/client";

export class ModerationService {
  constructor(private prisma: PrismaClient) {}

  async reportAbuse(data: { reporterUserId: string; subjectType: string; subjectId: string; reason: string; details?: string }) {
    return this.prisma.abuseReport.create({ data: { ...data, status: "OPEN" } });
  }

  async setStatus(reportId: String, status: string) {
    return this.prisma.abuseReport.update({ where: { id: String(reportId) }, data: { status } });
  }
}
