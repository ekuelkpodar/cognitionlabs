import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LearningService } from "@cognitionlabs/learning";

const learning = new LearningService(prisma);

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const course = await learning.getCourse(params.id);
  if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ course });
}
