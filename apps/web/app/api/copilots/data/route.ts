import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CopilotService } from "@cognitionlabs/services";

const copilot = new CopilotService(prisma);

export async function POST(request: Request) {
  const body = await request.json();
  const projectId = body.projectId ?? (await prisma.project.findFirst())?.id;
  if (!projectId) return NextResponse.json({ error: "No project" }, { status: 400 });
  const suggestions = await copilot.suggestDatasets(projectId, body.goal ?? "");
  return NextResponse.json({ suggestions });
}
