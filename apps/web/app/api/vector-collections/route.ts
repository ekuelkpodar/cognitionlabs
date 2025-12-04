import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const collections = await prisma.vectorCollection.findMany({ include: { vectorStore: true, items: { take: 3 } } });
  return NextResponse.json({ collections });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const collection = await prisma.vectorCollection.create({ data: body });
    return NextResponse.json({ collection });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create collection" }, { status: 400 });
  }
}
