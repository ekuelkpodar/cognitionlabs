import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BlockService } from "@cognitionlabs/services";
import { resolveAuthContext } from "@/lib/auth-context";

const blocks = new BlockService(prisma);

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const data = await blocks.list(orgId);
  return NextResponse.json({ blocks: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { orgId } = await resolveAuthContext();
  const block = await blocks.create({ ...body, organizationId: orgId });
  return NextResponse.json({ block });
}
