import { Queue, Worker, Job } from "bullmq";
import { PrismaClient } from "@prisma/client";
import pino from "pino";
import { agentTestQueue, agentTestWorker } from "./agentTests";

const connection = { host: process.env.REDIS_HOST ?? "127.0.0.1", port: Number(process.env.REDIS_PORT ?? 6379) };
const logger = pino({ level: process.env.LOG_LEVEL ?? "info" });
const prisma = new PrismaClient();

export const trainingQueue = new Queue("training", { connection });
export const embeddingQueue = new Queue("embedding", { connection });
export const workflowQueue = new Queue("workflows", { connection });

// Example worker processors. Real implementations would call python libs or external services.
new Worker(
  "training",
  async (job: Job) => {
    logger.info({ jobId: job.id, data: job.data }, "training job started");
    await prisma.modelVersion.update({
      where: { id: job.data.modelVersionId },
      data: { status: "STAGING", metrics: { accuracy: Math.random() } }
    });
    logger.info({ jobId: job.id }, "training job finished");
  },
  { connection }
);

new Worker(
  "embedding",
  async (job) => {
    logger.info({ jobId: job.id }, "embedding job");
    await prisma.vectorItem.createMany({
      data: job.data.vectors.map((vec: number[], idx: number) => ({
        collectionId: job.data.collectionId,
        externalId: `doc-${idx}`,
        embedding: vec,
        metadata: { chunk: idx }
      }))
    });
  },
  { connection }
);

new Worker(
  "workflows",
  async (job) => {
    logger.info({ jobId: job.id }, "workflow run started");
    // Simplified orchestration placeholder
    await prisma.workflowRun.update({ where: { id: job.data.runId }, data: { status: "SUCCESS", finishedAt: new Date() } });
  },
  { connection }
);

// Canary traffic manager placeholder: would run on interval to adjust Endpoint trafficConfig based on live metrics.
// TODO: implement health checks, error thresholds, auto-promote/rollback.
async function runCanaryOrchestrator() {
  const endpoints = await prisma.endpoint.findMany({ where: { strategy: "CANARY" }, include: { bindings: true, logs: true } });
  for (const ep of endpoints) {
    const errorRate = ep.logs.filter((l) => l.statusCode >= 500).length / Math.max(1, ep.logs.length);
    if (errorRate < 0.1) {
      // promote new version gradually
      await prisma.endpoint.update({ where: { id: ep.id }, data: { trafficConfig: { ...(ep.trafficConfig as any), step: "ramp" } } });
    } else {
      await prisma.endpoint.update({ where: { id: ep.id }, data: { trafficConfig: { ...(ep.trafficConfig as any), step: "rollback" } } });
    }
  }
}

setInterval(() => {
  runCanaryOrchestrator().catch((err) => logger.error(err, "canary orchestrator failed"));
}, 30_000);


process.on("SIGINT", async () => {
  logger.info("Shutting down workers");
  await prisma.$disconnect();
  process.exit(0);
});
