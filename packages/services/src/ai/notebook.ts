import { PrismaClient } from "@prisma/client";

// NotebookService executes cells (SQL/Python/JS/Prompt) with sandbox TODOs.
export class NotebookService {
  constructor(private prisma: PrismaClient) {}

  async recordRun(blockId: string, userId: string, inputSnapshot: object, outputSnapshot: object | null, status: string) {
    return this.prisma.notebookCellRun.create({
      data: {
        aiBlockId: blockId,
        executedByUserId: userId,
        inputSnapshot,
        outputSnapshot,
        status
      }
    });
  }

  // TODO: implement safe execution for SQL/Python/JS with strict sandboxing.
}
