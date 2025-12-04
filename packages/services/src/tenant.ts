import { PrismaClient } from "@prisma/client";
import { RbacService } from "./rbac";

export interface TenantContext {
  organizationId: string;
  userId: string;
  planTier: string;
  capabilities: Record<string, boolean>;
}

export class TenantContextService {
  constructor(private prisma: PrismaClient, private rbac: RbacService) {}

  async build(orgId: string, userId: string): Promise<TenantContext> {
    const org = await this.prisma.organization.findUniqueOrThrow({ where: { id: orgId } });
    const membership = await this.prisma.organizationMembership.findFirst({ where: { organizationId: orgId, userId }, include: { rolePolicy: true } });
    const capabilities = membership ? this.rbac.resolveCapabilities(membership) : {};
    return { organizationId: orgId, userId, planTier: org.planTier, capabilities };
  }
}
