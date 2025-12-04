import { PrismaClient } from "@prisma/client";

export class BlockService {
  constructor(private prisma: PrismaClient) {}

  async list(orgId: string, workspaceId?: string) {
    return this.prisma.aiBlock.findMany({ where: { organizationId: orgId, workspaceId } });
  }

  async create(data: { organizationId: string; projectId?: string; workspaceId?: string; type: string; title: string; config: object; layout?: object }) {
    return this.prisma.aiBlock.create({ data: { ...data, layout: data.layout ?? {} } });
  }

  async update(id: string, data: Partial<{ title: string; config: object; layout: object }>) {
    return this.prisma.aiBlock.update({ where: { id }, data });
  }
}
