import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AppBuilderService } from "@cognitionlabs/services";
import { resolveAuthContext } from "@/lib/auth-context";

const apps = new AppBuilderService(prisma);

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const data = await apps.listApps(orgId);
  return NextResponse.json({ apps: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { orgId } = await resolveAuthContext();
  const app = await apps.createApp({ ...body, organizationId: orgId });
  return NextResponse.json({ app });
}
