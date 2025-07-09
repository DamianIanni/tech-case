import axios from "axios";
import { User } from "@/types/user";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const res = await axios.get("/api/me", { withCredentials: true });
    console.log("User data from /api/me:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching current user:", err);
    return null;
  }
}

export async function loginWithCredentials(credentials: {
  email: string;
  password: string;
}): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await axios.post("/api/login", credentials, {
    withCredentials: true,
  });
  console.log(res);
}

export async function userDoesLogout(): Promise<void> {
  await axios.post("/api/logout");
}
