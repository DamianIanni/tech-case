import axios from "axios";
import { User } from "@/types/user";

export async function getCurrentUser(): Promise<User | null> {
  const res = await axios.get("/api/me", { withCredentials: true });
  return res.data;
}

export async function loginWithCredentials(credentials: {
  email: string;
  password: string;
}): Promise<void> {
  await axios.post("/api/login", credentials, { withCredentials: true });
}

export async function userDoesLogout(): Promise<void> {
  await axios.post("/api/logout");
}
