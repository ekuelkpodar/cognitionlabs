import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CostService } from "@cognitionlabs/services";
import { resolveAuthContext } from "@/lib/auth-context";

const cost = new CostService(prisma);

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const estimate = await cost.estimateOrg(orgId);
  return NextResponse.json({ estimate });
}
