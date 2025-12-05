import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveAuthContext } from "@/lib/auth-context";

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const programs = await prisma.learningProgram.findMany({ where: { organizationId: orgId } });
  return NextResponse.json({ programs });
}
