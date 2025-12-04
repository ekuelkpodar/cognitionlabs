import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ViewService } from "@cognitionlabs/services";
import { resolveAuthContext } from "@/lib/auth-context";

const views = new ViewService(prisma);

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const data = await prisma.aiView.findMany({ where: { organizationId: orgId }, include: { viewBlocks: true } });
  return NextResponse.json({ views: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { orgId } = await resolveAuthContext();
  const view = await views.create({ ...body, organizationId: orgId });
  return NextResponse.json({ view });
}
