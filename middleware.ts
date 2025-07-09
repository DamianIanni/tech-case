export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
// import { requireAuth } from '@/lib/middleware/requireAuth';
// import { requireRole } from '@/lib/middleware/requireRole';
import { verifyJWT } from "./src/lib/apiUtils/jwtUtil";
import { User } from "./src/types/user";
import { requireAuth } from "./src/lib/middlewareHelpers/requireAuthHelper";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  console.log("token", token);

  const user: Partial<User> = token ? verifyJWT(token) : null;
  console.log("Token:", token);
  console.log("Decoded user:", user);
  console.log("Path:", pathname);
  //  JWT verification
  const authRedirect = requireAuth(user, pathname, req);
  if (authRedirect) return authRedirect;
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/patients/:path*",
    "/admin/:path*",
    "/manager/:path*",
    "/login",
  ],
};
