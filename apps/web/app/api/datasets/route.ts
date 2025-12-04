import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const datasets = await prisma.dataset.findMany({ include: { dataSource: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ datasets });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dataset = await prisma.dataset.create({ data: body });
    return NextResponse.json({ dataset });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create dataset" }, { status: 400 });
  }
}
