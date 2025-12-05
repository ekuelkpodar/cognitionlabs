import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveAuthContext } from "@/lib/auth-context";

export async function GET() {
  const { userId } = await resolveAuthContext();
  const courses = await prisma.courseProgress.findMany({ where: { userId } });
  const lessons = await prisma.lessonProgress.findMany({ where: { userId } });
  return NextResponse.json({ courses, lessons });
}
