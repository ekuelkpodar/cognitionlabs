import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ExperimentService, AuditService } from "@cognitionlabs/services";
import { resolveAuthContext } from "@/lib/auth-context";

const audit = new AuditService(prisma);
const experiments = new ExperimentService(prisma, audit);

export async function GET() {
  const { orgId } = await resolveAuthContext();
  const projectId = (await prisma.project.findFirst({ where: { organizationId: orgId } }))?.id;
  if (!projectId) return NextResponse.json({ experiments: [] });
  const data = await prisma.experiment.findMany({ where: { projectId }, include: { runs: true } });
  return NextResponse.json({ experiments: data });
}

export async function POST(request: Request) {
  const { orgId, userId } = await resolveAuthContext();
  const projectId = (await prisma.project.findFirst({ where: { organizationId: orgId } }))?.id;
  if (!projectId) return NextResponse.json({ error: "No project" }, { status: 400 });
  const body = await request.json();
  const experiment = await experiments.createExperiment(projectId, body);
  await prisma.auditLog.create({
    data: {
      organizationId: orgId,
      userId,
      actorType: "USER",
      action: "experiment.create",
      resourceType: "Experiment",
      resourceId: experiment.id,
      metadata: body
    }
  });
  return NextResponse.json({ experiment });
}
