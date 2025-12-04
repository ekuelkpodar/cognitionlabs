import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveAuthContext } from "@/lib/auth-context";

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const metrics = await prisma.usageMetric.findMany({ where: { organizationId: orgId }, orderBy: { periodStart: "desc" }, take: 100 });
  return NextResponse.json({ metrics });
}
