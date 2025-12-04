import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const vectorStores = await prisma.vectorStore.findMany({ include: { collections: true } });
  return NextResponse.json({ vectorStores });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const store = await prisma.vectorStore.create({ data: body });
    return NextResponse.json({ vectorStore: store });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create vector store" }, { status: 400 });
  }
}
