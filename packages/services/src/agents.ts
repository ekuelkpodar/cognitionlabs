import { PrismaClient } from "@prisma/client";
import { AuditService } from "./audit";

export class AgentService {
  constructor(private prisma: PrismaClient, private audit: AuditService) {}

  async runTestSuite(testSuiteId: string) {
    const suite = await this.prisma.agentTestSuite.findUnique({ where: { id: testSuiteId }, include: { testCases: true, agent: true } });
    if (!suite) throw new Error("Suite not found");
    const run = await this.prisma.agentTestRun.create({
      data: {
        testSuiteId,
        agentVersionSnapshot: { config: suite.agent.config, prompt: suite.agent.systemPrompt },
        status: "RUNNING"
      }
    });
    // TODO: enqueue jobs to worker to execute each test case with LLM + heuristics
    await this.audit.log({
      organizationId: suite.agent.organizationId,
      actorType: "USER",
      action: "agent.tests.run",
      resourceType: "AgentTestRun",
      resourceId: run.id
    });
    return run;
  }
}
