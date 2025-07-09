// ✅ middleware.ts
import { NextRequest, NextResponse } from "next/server";
// import { requireAuth } from '@/lib/middleware/requireAuth';
// import { requireRole } from '@/lib/middleware/requireRole';
import { verifyJWT } from "./lib/apiUtils/jwtUtil";
import { User } from "./types/user";
import { requireAuth } from "./lib/middlewareHelpers/requireAuthHelper";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const user: Partial<User> = token ? verifyJWT(token) : null;

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
