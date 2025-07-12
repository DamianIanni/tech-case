// app/api/login/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readUsers } from "@/lib/data/store"; // CAMBIADO de readPatients a readUsers
import { signJWT } from "@/lib/api/jwtUtil";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const users = await readUsers(); // CAMBIO CLAVE

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signJWT({
    id: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return NextResponse.json({ success: true });
}
