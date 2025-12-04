import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveAuthContext } from "@/lib/auth-context";

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const logs = await prisma.auditLog.findMany({
    where: { organizationId: orgId },
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { user: true }
  });
  return NextResponse.json({ logs });
}
