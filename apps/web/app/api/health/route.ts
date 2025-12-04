import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Redis from "ioredis";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const redis = new Redis(process.env.REDIS_URL ?? "redis://127.0.0.1:6379");
    await redis.ping();
    return NextResponse.json({ status: "ok", checks: { db: true, redis: true } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "degraded" }, { status: 503 });
  }
}
