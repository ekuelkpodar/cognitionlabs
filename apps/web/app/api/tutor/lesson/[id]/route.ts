import { NextResponse } from "next/server";
import { TutorService } from "@cognitionlabs/tutors";
import { prisma } from "@/lib/prisma";

const tutors = new TutorService(prisma);

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const agent = await tutors.getTutorForLesson(params.id);
  if (!agent) return NextResponse.json({ error: "Tutor not configured" }, { status: 404 });
  const reply = await tutors.chat(agent.id, body.message);
  return NextResponse.json({ reply });
}
