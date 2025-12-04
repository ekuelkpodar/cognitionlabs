import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveAuthContext } from "@/lib/auth-context";

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const endpoints = await prisma.endpoint.findMany({ where: { organizationId: orgId }, include: { bindings: true, logs: { take: 5 } } });
  return NextResponse.json({ endpoints });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orgId, userId } = await resolveAuthContext();
    const endpoint = await prisma.endpoint.create({ data: { ...body, organizationId: orgId } });
    await prisma.auditLog.create({
      data: {
        organizationId: orgId,
        userId,
        actorType: "USER",
        action: "endpoint.create",
        resourceType: "Endpoint",
        resourceId: endpoint.id,
        metadata: body
      }
    });
    return NextResponse.json({ endpoint });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create endpoint" }, { status: 400 });
  }
}

// PATCH can update traffic strategy/ratios (canary, traffic split)
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orgId, userId } = await resolveAuthContext();
    const endpoint = await prisma.endpoint.update({
      where: { id: body.id },
      data: { strategy: body.strategy, trafficConfig: body.trafficConfig }
    });
    await prisma.auditLog.create({
      data: {
        organizationId: orgId,
        userId,
        actorType: "USER",
        action: "endpoint.traffic.update",
        resourceType: "Endpoint",
        resourceId: endpoint.id,
        metadata: { strategy: body.strategy, trafficConfig: body.trafficConfig }
      }
    });
    return NextResponse.json({ endpoint });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to update endpoint traffic" }, { status: 400 });
  }
}
