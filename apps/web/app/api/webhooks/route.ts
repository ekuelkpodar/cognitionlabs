import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { WebhookService } from "@cognitionlabs/services";
import { resolveAuthContext } from "@/lib/auth-context";

const webhooks = new WebhookService(prisma);

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const data = await prisma.webhook.findMany({ where: { organizationId: orgId }, include: { deliveries: { take: 10, orderBy: { createdAt: "desc" } } } });
  return NextResponse.json({ webhooks: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { orgId } = await resolveAuthContext();
  const hook = await webhooks.createWebhook({ organizationId: orgId, url: body.url, secret: body.secret, eventTypes: body.eventTypes ?? [] });
  return NextResponse.json({ webhook: hook });
}
