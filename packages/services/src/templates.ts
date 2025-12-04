import { PrismaClient } from "@prisma/client";

export class TemplateService {
  constructor(private prisma: PrismaClient) {}

  async list(orgId?: string) {
    return this.prisma.template.findMany({
      where: { OR: [{ organizationId: null }, ...(orgId ? [{ organizationId: orgId }] : [])] },
      orderBy: { createdAt: "desc" }
    });
  }
}
