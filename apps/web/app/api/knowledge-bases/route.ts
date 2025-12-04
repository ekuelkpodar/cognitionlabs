import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const kbs = await prisma.knowledgeBase.findMany({ include: { vectorCollection: true, documents: true } });
  return NextResponse.json({ knowledgeBases: kbs });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const kb = await prisma.knowledgeBase.create({ data: body });
    return NextResponse.json({ knowledgeBase: kb });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create knowledge base" }, { status: 400 });
  }
}
