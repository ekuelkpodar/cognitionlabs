import Redis from "ioredis";

export interface CacheClient {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  del(key: string): Promise<void>;
}

export class RedisCache implements CacheClient {
  private client: Redis;
  constructor(url: string | undefined) {
    this.client = new Redis(url ?? "redis://127.0.0.1:6379");
  }
  async get<T>(key: string): Promise<T | null> {
    const val = await this.client.get(key);
    return val ? (JSON.parse(val) as T) : null;
  }
  async set<T>(key: string, value: T, ttlSeconds?: number) {
    const payload = JSON.stringify(value);
    if (ttlSeconds) await this.client.set(key, payload, "EX", ttlSeconds);
    else await this.client.set(key, payload);
  }
  async del(key: string) {
    await this.client.del(key);
  }
}

export const cacheKey = (parts: (string | number)[]) => parts.join(":");
