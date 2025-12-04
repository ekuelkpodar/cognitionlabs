import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  REDIS_HOST: z.string().optional(),
  REDIS_PORT: z.string().optional(),
  FEATURE_ENABLE_MARKETPLACE: z.string().optional()
});

export function loadConfig() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid env config: ${parsed.error.message}`);
  }
  const env = parsed.data;
  return {
    dbUrl: env.DATABASE_URL,
    redis: { host: env.REDIS_HOST ?? "127.0.0.1", port: Number(env.REDIS_PORT ?? 6379) },
    features: { marketplace: env.FEATURE_ENABLE_MARKETPLACE === "true" }
  };
}
