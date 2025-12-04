import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveAuthContext } from "@/lib/auth-context";

export async function POST(request: Request) {
  const body = await request.json();
  const { orgId, userId } = await resolveAuthContext();
  const event = await prisma.productEvent.create({
    data: { organizationId: orgId, userId, eventName: body.eventName, properties: body.properties ?? {} }
  });
  return NextResponse.json({ event });
}

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const events = await prisma.productEvent.findMany({ where: { organizationId: orgId }, take: 100, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ events });
}
