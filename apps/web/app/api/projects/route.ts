import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuditService, ProjectService, RbacService } from "@cognitionlabs/services";
import { createProjectSchema } from "@cognitionlabs/shared";
import { resolveAuthContext } from "@/lib/auth-context";
import { QuotaService, RateLimiter } from "@cognitionlabs/services";

const audit = new AuditService(prisma);
const rbac = new RbacService(prisma);
const projects = new ProjectService(prisma, audit, rbac);
const quota = new QuotaService(prisma);
const rateLimiter = new RateLimiter(process.env.REDIS_URL);

export async function GET() {
  const { orgId, userId } = await resolveAuthContext();
  const data = await projects.list(orgId, userId);
  return NextResponse.json({ projects: data, orgId, userId });
}

export async function POST(request: Request) {
  const body = createProjectSchema.parse(await request.json());
  const { orgId, userId } = await resolveAuthContext();
  await quota.assertProjectQuota(orgId);
  const limit = await rateLimiter.check(`org:${orgId}:projects:create`, 20, 60);
  if (!limit.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  const project = await projects.create(orgId, userId, body);
  return NextResponse.json({ project });
}
