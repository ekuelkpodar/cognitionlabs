import Redis from "ioredis";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export class RateLimiter {
  private client: Redis;
  constructor(url: string | undefined) {
    this.client = new Redis(url ?? "redis://127.0.0.1:6379");
  }

  /** Sliding-window per key. ttlSeconds defines window size. */
  async check(key: string, limit: number, ttlSeconds: number): Promise<RateLimitResult> {
    const now = Date.now();
    const windowKey = `${key}:${Math.floor(now / (ttlSeconds * 1000))}`;
    const current = await this.client.incr(windowKey);
    if (current === 1) await this.client.expire(windowKey, ttlSeconds);
    return { allowed: current <= limit, remaining: Math.max(0, limit - current), resetAt: (Math.floor(now / (ttlSeconds * 1000)) + 1) * ttlSeconds * 1000 };
  }
}
