import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ControlPlaneService } from "@cognitionlabs/services";
import { resolveAuthContext } from "@/lib/auth-context";

const control = new ControlPlaneService(prisma);

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const suggestions = await control.list(orgId);
  return NextResponse.json({ suggestions });
}

export async function POST(request: Request) {
  const { orgId } = await resolveAuthContext();
  const body = await request.json();
  const suggestion = await control.recordSuggestion({ ...body, organizationId: orgId });
  return NextResponse.json({ suggestion });
}
