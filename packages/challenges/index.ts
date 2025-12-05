import { PrismaClient } from "@prisma/client";

export class ChallengeService {
  constructor(private prisma: PrismaClient) {}

  async submitAttempt(challengeId: string, userId: string, submission: any) {
    return this.prisma.challengeAttempt.create({ data: { challengeId, userId, submission, status: "SUBMITTED", submittedAt: new Date() } });
  }
}

// ChallengeEvaluationService stub: would run grading in worker
export class ChallengeEvaluationService {
  async gradeQuiz(submission: any) {
    // TODO: compare against answer key
    return { score: 0, feedback: {} };
  }
}
