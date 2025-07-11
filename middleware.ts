// import { NextRequest, NextResponse } from "next/server";
// import { verifyJWT } from "./src/lib/apiUtils/jwtUtil";
// import { User } from "./src/types/user";
// import { requireAuth } from "./src/lib/middlewareHelpers/requireAuthHelper";

// export default function middleware(req: NextRequest) {
//   console.log("middleware called");

//   const { pathname } = req.nextUrl;
//   const token = req.cookies.get("token")?.value;
//   console.log("token", token);

//   const user: Partial<User> = token ? verifyJWT(token) : null;
//   console.log("Token:", token);
//   console.log("Decoded user:", user);
//   console.log("Path:", pathname);
//   //  JWT verification
//   const authRedirect = requireAuth(user, pathname, req);
//   if (authRedirect) return authRedirect;
//   return NextResponse.next();
// }

// export const config = {
//   runtime: "nodejs",
//   matcher: ["/dashboard/:path*", "/login"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("✅ MIDDLEWARE IS RUNNING!", request);
  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/dashboard/:path*", "/"],
};
