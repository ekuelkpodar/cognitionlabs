import { Queue, Worker, Job } from "bullmq";
import { PrismaClient } from "@prisma/client";
import pino from "pino";

const connection = { host: process.env.REDIS_HOST ?? "127.0.0.1", port: Number(process.env.REDIS_PORT ?? 6379) };
const logger = pino({ level: process.env.LOG_LEVEL ?? "info" });
const prisma = new PrismaClient();

export const agentTestQueue = new Queue("agent-tests", { connection });

export const agentTestWorker = new Worker(
  "agent-tests",
  async (job: Job) => {
    logger.info({ jobId: job.id, suiteId: job.data.testSuiteId }, "agent test run started");
    const runId = job.data.testRunId as string;
    // Naive heuristic evaluator placeholder
    const suite = await prisma.agentTestSuite.findUnique({ where: { id: job.data.testSuiteId }, include: { testCases: true } });
    if (!suite) throw new Error("Suite not found");

    for (const test of suite.testCases) {
      const pass = (test.expectedOutputPattern ?? "").length === 0 ? true : Math.random() > 0.2;
      await prisma.agentTestCaseRun.create({
        data: {
          testRunId: runId,
          testCaseId: test.id,
          inputPrompt: test.inputPrompt,
          actualOutput: "stub-output",
          evaluationResult: { matched: pass },
          score: pass ? 1 : 0,
          latencyMs: 100 + Math.floor(Math.random() * 50)
        }
      });
    }

    await prisma.agentTestRun.update({ where: { id: runId }, data: { status: "SUCCESS", finishedAt: new Date(), summaryMetrics: { passRate: 0.8 } } });
    logger.info({ jobId: job.id, runId }, "agent test run completed");
  },
  { connection }
);

process.on("SIGINT", async () => {
  await prisma.$disconnect();
});
