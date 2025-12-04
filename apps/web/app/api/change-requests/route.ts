import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveAuthContext } from "@/lib/auth-context";

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const items = await prisma.changeRequest.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ changeRequests: items });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { orgId, userId } = await resolveAuthContext();
  const cr = await prisma.changeRequest.create({
    data: {
      organizationId: orgId,
      workspaceId: body.workspaceId,
      submittedByUserId: userId,
      type: body.type,
      payload: body.payload,
      status: "PENDING"
    }
  });
  await prisma.auditLog.create({
    data: {
      organizationId: orgId,
      userId,
      actorType: "USER",
      action: "changeRequest.create",
      resourceType: body.type,
      resourceId: cr.id,
      metadata: body.payload
    }
  });
  return NextResponse.json({ changeRequest: cr });
}
