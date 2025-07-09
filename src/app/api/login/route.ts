import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { mockUsers } from "@/mocks/users/userMock";
import { signJWT } from "@/lib/apiUtils/jwtUtil";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const cookiesStore = await cookies();

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signJWT({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  cookiesStore.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return NextResponse.json({ success: true });
}
