import { PrismaClient } from "@prisma/client";
import { AuditService } from "./audit";

export class ExperimentService {
  constructor(private prisma: PrismaClient, private audit: AuditService) {}

  async createExperiment(projectId: string, data: { name: string; description?: string; taskType: string }) {
    const experiment = await this.prisma.experiment.create({ data: { ...data, projectId } });
    await this.audit.log({
      organizationId: (await this.prisma.project.findUniqueOrThrow({ where: { id: projectId } })).organizationId,
      actorType: "SYSTEM",
      action: "experiment.create",
      resourceType: "Experiment",
      resourceId: experiment.id
    });
    return experiment;
  }

  async recordRun(experimentId: string, payload: { modelVersionId?: string; status: string; runConfig?: object; metrics?: object }) {
    const run = await this.prisma.experimentRun.create({ data: { experimentId, ...payload } });
    return run;
  }
}
