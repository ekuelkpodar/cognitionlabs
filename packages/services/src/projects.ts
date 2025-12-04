import { PrismaClient } from "@prisma/client";
import { AuditService } from "./audit";
import { RbacService } from "./rbac";

export class ProjectService {
  constructor(private prisma: PrismaClient, private audit: AuditService, private rbac: RbacService) {}

  async list(orgId: string, userId: string) {
    await this.rbac.enforce(orgId, userId, "canManageProjects");
    return this.prisma.project.findMany({ where: { organizationId: orgId } });
  }

  async create(orgId: string, userId: string, data: { name: string; slug: string; description?: string }) {
    await this.rbac.enforce(orgId, userId, "canManageProjects");
    const project = await this.prisma.project.create({ data: { ...data, organizationId: orgId } });
    await this.audit.log({
      organizationId: orgId,
      userId,
      actorType: "USER",
      action: "project.create",
      resourceType: "Project",
      resourceId: project.id,
      metadata: data
    });
    return project;
  }
}
