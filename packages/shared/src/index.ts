import { z } from "zod";

export const planTierSchema = z.enum(["FREE", "PRO", "ENTERPRISE"]);

export const createOrgSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  planTier: planTierSchema.optional()
});

export const createProjectSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional()
});

export const rolePolicySchema = z.object({
  name: z.string().min(2),
  capabilities: z.record(z.boolean())
});

export const guardrailSchema = z.object({
  name: z.string().min(2),
  policyType: z.string(),
  config: z.record(z.any())
});

export const authRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1)
});

export const authLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const createDataSourceSchema = z.object({
  name: z.string().min(1),
  type: z.string(),
  config: z.record(z.any())
});

export type CreateOrgInput = z.infer<typeof createOrgSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type AuthRegisterInput = z.infer<typeof authRegisterSchema>;
export type AuthLoginInput = z.infer<typeof authLoginSchema>;
export type CreateDataSourceInput = z.infer<typeof createDataSourceSchema>;
export type RolePolicyInput = z.infer<typeof rolePolicySchema>;
export type GuardrailInput = z.infer<typeof guardrailSchema>;
