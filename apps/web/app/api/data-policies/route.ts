import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveAuthContext } from "@/lib/auth-context";

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const policies = await prisma.dataPolicy.findMany({ where: { organizationId: orgId } });
  return NextResponse.json({ policies });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { orgId, userId } = await resolveAuthContext();
  const policy = await prisma.dataPolicy.create({ data: { ...body, organizationId: orgId } });
  await prisma.auditLog.create({
    data: {
      organizationId: orgId,
      userId,
      actorType: "USER",
      action: "dataPolicy.create",
      resourceType: "DataPolicy",
      resourceId: policy.id,
      metadata: body
    }
  });
  return NextResponse.json({ policy });
}
