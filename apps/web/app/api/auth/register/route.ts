import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authRegisterSchema } from "@cognitionlabs/shared";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = authRegisterSchema.parse(json);
    const hashed = await bcrypt.hash(body.password, 10);

    const existing = await prisma.user.findUnique({ where: { email: body.email } });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const user = await prisma.user.create({ data: { email: body.email, name: body.name, passwordHash: hashed } });
    return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to register" }, { status: 500 });
  }
}
