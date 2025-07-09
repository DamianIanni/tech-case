/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/api/login"];

export function requireAuth(user: any, pathname: string, req: NextRequest) {
  const isPublic = PUBLIC_PATHS.includes(pathname);

  if (!user && !isPublic) {
    return redirectTo("/login", req);
  }

  if (user && pathname === "/login") {
    return redirectTo("/dashboard", req);
  }

  return null;
}

function redirectTo(path: string, req: NextRequest) {
  return NextResponse.redirect(new URL(path, req.url));
}
