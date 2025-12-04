import { PrismaClient, MembershipRole, RolePolicy } from "@prisma/client";

export type Capability = keyof RolePolicy["capabilities"] | string;

export class RbacService {
  constructor(private prisma: PrismaClient) {}

  /** Check membership and capability for an org. Throws if unauthorized. */
  async enforce(orgId: string, userId: string, capability: string) {
    const membership = await this.prisma.organizationMembership.findFirst({
      where: { organizationId: orgId, userId },
      include: { rolePolicy: true }
    });
    if (!membership) throw new Error("Not a member of organization");

    const caps = this.resolveCapabilities(membership);
    if (!caps[capability]) throw new Error(`Missing capability: ${capability}`);
  }

  resolveCapabilities(membership: { role: MembershipRole; rolePolicy: RolePolicy | null }) {
    const basePolicies: Record<MembershipRole, Record<string, boolean>> = {
      OWNER: { all: true },
      ADMIN: { canManageProjects: true, canDeployModels: true, canViewSecrets: true, canInviteMembers: true },
      MEMBER: { canManageProjects: true },
      VIEWER: {},
      CUSTOM: {}
    };
    const merged = { ...(basePolicies[membership.role] || {}) };
    if (membership.rolePolicy) Object.assign(merged, membership.rolePolicy.capabilities as Record<string, boolean>);
    return merged;
  }
}
