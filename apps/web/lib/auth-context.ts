import { prisma } from "@/lib/prisma";

// Placeholder auth resolver: replace with real session lookup (NextAuth/SSO/JWT).
export async function resolveAuthContext() {
  const user = await prisma.user.findFirst();
  const org = await prisma.organization.findFirst();
  if (!user || !org) throw new Error("Auth context missing demo user/org");
  return { userId: user.id, orgId: org.id };
}
