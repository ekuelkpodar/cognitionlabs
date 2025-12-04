import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createDataSourceSchema } from "@cognitionlabs/shared";

export async function GET() {
  const dataSources = await prisma.dataSource.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ dataSources });
}

export async function POST(request: Request) {
  try {
    const body = createDataSourceSchema.parse(await request.json());
    const ds = await prisma.dataSource.create({
      data: {
        organizationId: (await prisma.organization.findFirst())?.id ?? "",
        name: body.name,
        type: body.type as any,
        config: body.config
      }
    });
    return NextResponse.json({ dataSource: ds });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create data source" }, { status: 400 });
  }
}
