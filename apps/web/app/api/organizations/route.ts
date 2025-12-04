import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createOrgSchema } from "@cognitionlabs/shared";

export async function GET() {
  const orgs = await prisma.organization.findMany({ include: { memberships: true } });
  return NextResponse.json({ orgs });
}

export async function POST(request: Request) {
  try {
    const body = createOrgSchema.parse(await request.json());
    const org = await prisma.organization.create({ data: body });
    return NextResponse.json({ org });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create organization" }, { status: 400 });
  }
}
