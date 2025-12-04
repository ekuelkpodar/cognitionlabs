import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NotebookService } from "@cognitionlabs/services";
import { resolveAuthContext } from "@/lib/auth-context";

const notebook = new NotebookService(prisma);

export async function POST(request: Request) {
  const body = await request.json();
  const { userId } = await resolveAuthContext();
  // TODO: actually execute cell safely; here we just echo input
  const run = await notebook.recordRun(body.aiBlockId, userId, body.inputSnapshot ?? {}, { echo: body.content }, "SUCCESS");
  return NextResponse.json({ run });
}
