import { PrismaClient } from "@prisma/client";

export class AuditService {
  constructor(private prisma: PrismaClient) {}

  async log(params: {
    organizationId: string;
    userId?: string;
    apiKeyId?: string;
    actorType: string;
    action: string;
    resourceType: string;
    resourceId: string;
    metadata?: object;
    ipAddress?: string;
    userAgent?: string;
  }) {
    await this.prisma.auditLog.create({ data: { ...params, metadata: params.metadata ?? {} } });
  }
}
