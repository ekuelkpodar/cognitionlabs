import { PrismaClient } from "@prisma/client";

export class SecretService {
  constructor(private prisma: PrismaClient) {}

  async resolveSecret(secretRef: string) {
    // TODO: integrate with external KMS (AWS SM, Vault). For now return placeholder reference.
    const secret = await this.prisma.secret.findUnique({ where: { id: secretRef } });
    if (!secret) throw new Error("Secret not found");
    return { provider: secret.provider, value: `ref:${secret.externalRef ?? secret.id}` };
  }
}
