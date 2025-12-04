import { PrismaClient } from "@prisma/client";

export class AppBuilderService {
  constructor(private prisma: PrismaClient) {}

  async createApp(data: { organizationId: string; workspaceId: string; projectId?: string; name: string; slug: string; description?: string; config: object }) {
    return this.prisma.aiApp.create({ data });
  }

  async listApps(orgId: string, workspaceId?: string) {
    return this.prisma.aiApp.findMany({ where: { organizationId: orgId, workspaceId } });
  }

  async instantiateTemplate(templateId: string, mapping: object, orgId: string, workspaceId: string, projectId?: string) {
    // TODO: clone template config into AiApp and create views/blocks per mapping
    const template = await this.prisma.aiAppTemplate.findUnique({ where: { id: templateId } });
    if (!template) throw new Error("Template not found");
    return this.prisma.aiApp.create({
      data: {
        organizationId: orgId,
        workspaceId,
        projectId,
        name: template.name,
        slug: `${template.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
        description: template.description,
        config: { templateConfig: template.config, mapping }
      }
    });
  }
}
