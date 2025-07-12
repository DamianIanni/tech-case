import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/api/jwtUtil";
import { User } from "./types/user";
import { requireAuth } from "./lib/middlewareHelpers/requireAuthHelper";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  let user: Partial<User> = token ? await verifyJWT(token) : null;
  if (token && token.split(".").length === 3) {
    user = await verifyJWT(token);
  }
  //  JWT verification
  const authRedirect = requireAuth(user, pathname, req);
  if (authRedirect) return authRedirect;
  return NextResponse.next();
}

export const config = {
  // runtime: "nodejs",
  matcher: ["/dashboard/:path*"],
};
