import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CopilotService } from "@cognitionlabs/services";

const copilot = new CopilotService(prisma);

export async function POST(request: Request) {
  const body = await request.json();
  const endpointId = body.endpointId ?? (await prisma.endpoint.findFirst())?.id;
  if (!endpointId) return NextResponse.json({ error: "No endpoint" }, { status: 400 });
  const result = await copilot.explainMetrics(endpointId, body.stats ?? { metric: "latency", value: 200, change: 5 });
  return NextResponse.json({ explanation: result });
}
