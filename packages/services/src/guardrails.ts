import { PrismaClient } from "@prisma/client";

export class GuardrailService {
  constructor(private prisma: PrismaClient) {}

  async evaluateGuardrails(guardrailIds: string[], input: string) {
    const policies = await this.prisma.llmGuardrailPolicy.findMany({ where: { id: { in: guardrailIds } } });
    // TODO: implement actual checks (content filter, PII regex, prompt injection heuristics)
    const blocks = policies.filter((p) => (p.config as any)?.blockAll === true);
    return { blocked: blocks.length > 0, annotations: policies.map((p) => ({ id: p.id, type: p.policyType })) };
  }
}
