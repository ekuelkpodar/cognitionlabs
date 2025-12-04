import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveAuthContext } from "@/lib/auth-context";

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const endpointCounts = await prisma.endpoint.count({ where: { organizationId: orgId } });
  const logs = await prisma.inferenceLog.findMany({ where: { endpoint: { organizationId: orgId } }, take: 50, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ endpointCounts, recentLogs: logs });
}
