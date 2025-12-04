import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const models = await prisma.model.findMany({ include: { versions: true } });
  return NextResponse.json({ models });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const model = await prisma.model.create({ data: body });
    return NextResponse.json({ model });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create model" }, { status: 400 });
  }
}
