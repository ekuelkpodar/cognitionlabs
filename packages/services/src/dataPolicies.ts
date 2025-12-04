import { PrismaClient } from "@prisma/client";

export class DataPolicyService {
  constructor(private prisma: PrismaClient) {}

  async canAccessDataset(orgId: string, datasetId: string, roleCapabilities: Record<string, boolean>) {
    const policy = await this.prisma.dataPolicy.findFirst({
      where: { organizationId: orgId, appliesTo: "Dataset", rules: { path: "targetId", equals: datasetId } as any }
    });
    if (!policy) return true;
    const allowedRoles = (policy.rules as any).allowedRoles ?? [];
    if (roleCapabilities.all) return true;
    return allowedRoles.some((cap: string) => roleCapabilities[cap]);
  }
}
