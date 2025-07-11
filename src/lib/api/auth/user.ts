"use server";
import axios from "axios";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/apiUtils/jwtUtil";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const res = await axios.get("/api/me", { withCredentials: true });
    console.log("User data from /api/me:", res.data);
    return res.data;
  } catch (err) {
    console.log("Error fetching current user:", err);
    return null;
  }
}

export async function loginWithCredentials(credentials: {
  email: string;
  password: string;
}): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const res = await axios.post("/api/login", credentials, {
      withCredentials: true,
    });
    console.log(res);
  } catch (error) {
    console.log("Login error", error);
  }
}

export async function userDoesLogout(): Promise<void> {
  try {
    await axios.post("/api/logout");
  } catch (error) {
    console.log("Logout error", error);
  }
}

export async function getUserFromCookies() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    const user = token ? verifyJWT(token) : null;
    return user;
  } catch (error) {
    console.log(error);
  }
}
