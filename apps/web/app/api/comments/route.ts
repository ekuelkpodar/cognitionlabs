import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveAuthContext } from "@/lib/auth-context";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resourceType = searchParams.get("resourceType") || "";
  const resourceId = searchParams.get("resourceId") || "";
  const { orgId } = await resolveAuthContext();
  const comments = await prisma.comment.findMany({
    where: { organizationId: orgId, resourceType, resourceId },
    orderBy: { createdAt: "asc" }
  });
  return NextResponse.json({ comments });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { orgId, userId } = await resolveAuthContext();
  const comment = await prisma.comment.create({
    data: {
      organizationId: orgId,
      authorId: userId,
      resourceType: body.resourceType,
      resourceId: body.resourceId,
      body: body.body
    }
  });
  await prisma.auditLog.create({
    data: {
      organizationId: orgId,
      userId,
      actorType: "USER",
      action: "comment.create",
      resourceType: body.resourceType,
      resourceId: body.resourceId,
      metadata: { body: body.body }
    }
  });
  return NextResponse.json({ comment });
}
