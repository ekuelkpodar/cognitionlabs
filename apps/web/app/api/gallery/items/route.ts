import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GalleryService } from "@cognitionlabs/services";
import { resolveAuthContext } from "@/lib/auth-context";

const gallery = new GalleryService(prisma);

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const items = await gallery.list({ orgId });
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { orgId, userId } = await resolveAuthContext();
  const item = await gallery.publish({ ...body, organizationId: orgId, creatorUserId: userId });
  return NextResponse.json({ item });
}
