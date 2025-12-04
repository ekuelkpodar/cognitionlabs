import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tables = await prisma.featureTable.findMany({ include: { rows: { take: 5 } } });
  return NextResponse.json({ tables });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const table = await prisma.featureTable.create({ data: body });
    return NextResponse.json({ table });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create feature table" }, { status: 400 });
  }
}
