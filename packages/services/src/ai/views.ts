import { PrismaClient } from "@prisma/client";

export class ViewService {
  constructor(private prisma: PrismaClient) {}

  async create(data: { organizationId: string; workspaceId: string; projectId?: string; name: string; slug: string; layoutType: string; metadata?: object }) {
    return this.prisma.aiView.create({ data });
  }

  async attachBlock(aiViewId: string, aiBlockId: string, position: object) {
    return this.prisma.aiViewBlock.create({ data: { aiViewId, aiBlockId, position } });
  }

  async cloneView(viewId: string, targetWorkspaceId: string) {
    // TODO: deep clone blocks and view-block bindings
    const view = await this.prisma.aiView.findUnique({ where: { id: viewId }, include: { viewBlocks: true } });
    if (!view) throw new Error("View not found");
    return this.prisma.aiView.create({
      data: {
        organizationId: view.organizationId,
        workspaceId: targetWorkspaceId,
        projectId: view.projectId,
        name: `${view.name} copy`,
        slug: `${view.slug}-copy`,
        layoutType: view.layoutType,
        metadata: view.metadata
      }
    });
  }
}
