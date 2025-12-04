import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guardrailSchema } from "@cognitionlabs/shared";
import { resolveAuthContext } from "@/lib/auth-context";

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const policies = await prisma.llmGuardrailPolicy.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ guardrails: policies });
}

export async function POST(request: Request) {
  const body = guardrailSchema.parse(await request.json());
  const { orgId, userId } = await resolveAuthContext();
  const policy = await prisma.llmGuardrailPolicy.create({ data: { ...body, organizationId: orgId } });
  await prisma.auditLog.create({
    data: {
      organizationId: orgId,
      userId,
      actorType: "USER",
      action: "guardrail.create",
      resourceType: "Guardrail",
      resourceId: policy.id,
      metadata: body
    }
  });
  return NextResponse.json({ guardrail: policy });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { orgId, userId } = await resolveAuthContext();
  const policy = await prisma.llmGuardrailPolicy.update({ where: { id: body.id }, data: body });
  await prisma.auditLog.create({
    data: {
      organizationId: orgId,
      userId,
      actorType: "USER",
      action: "guardrail.update",
      resourceType: "Guardrail",
      resourceId: policy.id,
      metadata: body
    }
  });
  return NextResponse.json({ guardrail: policy });
}
