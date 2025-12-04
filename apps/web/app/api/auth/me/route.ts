import { NextResponse } from "next/server";

export async function GET() {
  // Placeholder user context. Integrate with NextAuth/session store later.
  return NextResponse.json({ user: { id: "demo", email: "founder@atlas.ai", name: "Uma Engineer" } });
}
