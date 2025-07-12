import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/apiUtils/jwtUtil";
import { User } from "./types/user";
import { requireAuth } from "./lib/middlewareHelpers/requireAuthHelper";

export default async function middleware(req: NextRequest) {
  console.log("middleware called");

  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  console.log("token", token);

  let user: Partial<User> = token ? await verifyJWT(token) : null;
  if (token && token.split(".").length === 3) {
    user = await verifyJWT(token);
  }
  console.log("Token:", token);
  console.log("Decoded user:", user);
  console.log("Path:", pathname);
  //  JWT verification
  const authRedirect = requireAuth(user, pathname, req);
  if (authRedirect) return authRedirect;
  return NextResponse.next();
}

export const config = {
  // runtime: "nodejs",
  matcher: ["/dashboard/:path*"],
};

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const token = req.cookies.get("token")?.value;

//   let user: Partial<User> | null = null;

//   if (token) {
//     try {
//       user = await verifyJWT(token);
//     } catch (err) {
//       console.error("Failed to verify token in middleware:", err);
//     }
//   }

//   const authRedirect = requireAuth(user, pathname, req);
//   if (authRedirect) return authRedirect;

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   console.log("✅ MIDDLEWARE IS RUNNING!", request);
//   return NextResponse.next();
// }

// export const config = {
//   // runtime: "nodejs",
//   matcher: ["/dashboard/:path*", "/"],
// };
