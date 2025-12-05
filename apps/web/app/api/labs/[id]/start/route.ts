import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LabService } from "@cognitionlabs/labs";
import { resolveAuthContext } from "@/lib/auth-context";

const labs = new LabService(prisma);

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const { orgId, userId } = await resolveAuthContext();
  const session = await labs.startSession(params.id, userId, orgId);
  return NextResponse.json({ session });
}
