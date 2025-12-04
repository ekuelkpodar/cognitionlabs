import { NextResponse } from "next/server";
import { TemplateService } from "@cognitionlabs/services";
import { prisma } from "@/lib/prisma";
import { resolveAuthContext } from "@/lib/auth-context";

const templates = new TemplateService(prisma);

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const data = await templates.list(orgId);
  return NextResponse.json({ templates: data });
}
