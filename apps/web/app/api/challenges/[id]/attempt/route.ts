import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ChallengeService } from "@cognitionlabs/challenges";
import { resolveAuthContext } from "@/lib/auth-context";

const challenges = new ChallengeService(prisma);

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const { userId } = await resolveAuthContext();
  const attempt = await challenges.submitAttempt(params.id, userId, body.submission);
  return NextResponse.json({ attempt });
}
