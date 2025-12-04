import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const workflows = await prisma.workflow.findMany({ include: { nodes: true, runs: true } });
  return NextResponse.json({ workflows });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const workflow = await prisma.workflow.create({ data: body });
    return NextResponse.json({ workflow });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create workflow" }, { status: 400 });
  }
}
