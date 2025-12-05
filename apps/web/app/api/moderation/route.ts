import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ModerationService } from "@cognitionlabs/services";
import { resolveAuthContext } from "@/lib/auth-context";

const moderation = new ModerationService(prisma);

export async function POST(request: Request) {
  const body = await request.json();
  const { userId } = await resolveAuthContext();
  const report = await moderation.reportAbuse({ reporterUserId: userId, subjectType: body.subjectType, subjectId: body.subjectId, reason: body.reason, details: body.details });
  return NextResponse.json({ report });
}

export async function GET() {
  const reports = await prisma.abuseReport.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ reports });
}
