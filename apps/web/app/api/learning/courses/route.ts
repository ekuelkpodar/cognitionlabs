import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LearningService } from "@cognitionlabs/learning";

const learning = new LearningService(prisma);

export async function GET() {
  const courses = await learning.listCourses();
  return NextResponse.json({ courses });
}
