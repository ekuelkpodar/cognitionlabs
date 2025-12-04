import { PrismaClient } from "@prisma/client";

export class PluginService {
  constructor(private prisma: PrismaClient) {}

  async register(orgId: string | null, payload: { type: string; name: string; description?: string; codeLocation?: string; configSchema?: object }) {
    return this.prisma.plugin.create({ data: { organizationId: orgId ?? undefined, ...payload } });
  }
}
