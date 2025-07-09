/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
const SECRET =
  process.env.JWT_SECRET || "my-super-secret-clinical-aisel-client-jwt-key";

export function signJWT(payload: object) {
  const expiresIn = "1d";
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyJWT(token: string): any | null {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    console.log("Error verifying JWT:", err);
    return null;
  }
}
