import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authLoginSchema } from "@cognitionlabs/shared";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = authLoginSchema.parse(await request.json());
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const ok = await bcrypt.compare(body.password, user.passwordHash);
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    // Token/session placeholder. In real app, wire NextAuth or JWT issuance here.
    return NextResponse.json({ token: "demo-token", user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to login" }, { status: 500 });
  }
}
