import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PluginService } from "@cognitionlabs/services";
import { resolveAuthContext } from "@/lib/auth-context";

const plugins = new PluginService(prisma);

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const data = await prisma.plugin.findMany({ where: { OR: [{ organizationId: orgId }, { organizationId: null }] } });
  return NextResponse.json({ plugins: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { orgId, userId } = await resolveAuthContext();
  const plugin = await plugins.register(orgId, body);
  await prisma.auditLog.create({
    data: {
      organizationId: orgId,
      userId,
      actorType: "USER",
      action: "plugin.register",
      resourceType: "Plugin",
      resourceId: plugin.id,
      metadata: body
    }
  });
  return NextResponse.json({ plugin });
}
