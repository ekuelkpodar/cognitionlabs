import { PrismaClient } from "@prisma/client";

export class WebhookService {
  constructor(private prisma: PrismaClient) {}

  async createWebhook(data: { organizationId: string; url: string; secret: string; eventTypes: string[] }) {
    return this.prisma.webhook.create({ data: { ...data, eventTypes: data.eventTypes } });
  }

  async logDelivery(webhookId: string, eventType: string, payload: object, status: string, errorMessage?: string) {
    return this.prisma.webhookDelivery.create({
      data: { webhookId, eventType, payload, status, errorMessage, attempts: 1, lastAttemptAt: new Date() }
    });
  }
}
