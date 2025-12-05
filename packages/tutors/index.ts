import { PrismaClient } from "@prisma/client";

// TutorService wraps LlmAgent configured as a tutor/coach. Real implementation would call LLM providers with lesson/lab context.
export class TutorService {
  constructor(private prisma: PrismaClient) {}

  async getTutorForLesson(lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id: lessonId } });
    if (!lesson) throw new Error("Lesson not found");
    const agent = await this.prisma.llmAgent.findFirst({ where: { isTutor: true } });
    return agent;
  }

  async chat(agentId: string, message: string) {
    // TODO: call LLM provider; return mock
    return { reply: `Tutor response to: ${message}` };
  }
}
