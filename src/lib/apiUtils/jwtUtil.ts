/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import jwt from "jsonwebtoken";
// const SECRET =
//   process.env.JWT_SECRET || "my-super-secret-clinical-aisel-client-jwt-key";

// export function signJWT(payload: object) {
//   const expiresIn = "1d";
//   return jwt.sign(payload, SECRET, { expiresIn });
// }

// export function verifyJWT(token: string): any | null {
//   try {
//     return jwt.verify(token, SECRET);
//   } catch (err) {
//     console.log("Error verifying JWT:", err);
//     return null;
//   }
// }

// lib/apiUtils/jwtUtil.ts
import { jwtVerify } from "jose";

import { SignJWT } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "my-super-secret-clinical-aisel-client-jwt-key"
);

export async function signJWT(
  payload: Record<string, unknown>
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d") // 1 día de expiración
    .sign(SECRET);
}

export async function verifyJWT(token: string): Promise<any | null> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(
        process.env.JWT_SECRET ||
          "my-super-secret-clinical-aisel-client-jwt-key"
      )
    );
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
