// src/lib/api/users.ts
"use server";
import { User } from "@/types/user";
import { getUserFromCookies } from "@/lib/api/auth/getUserFromCookies";
import { readUsers, writeUsers } from "@/lib/data/store";
// import { Redirect } from "next";
import { redirect } from "next/dist/server/api-utils";

const WAIT = 200;
function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function getUserById(id: number): Promise<User | null> {
  const users = await readUsers();
  return users.find((u) => u.id === id) || null;
}

export async function getUsers(): Promise<User[]> {
  await wait(WAIT);
  const user = await getUserFromCookies();
  if (!user || (user.role !== "admin" && user.role !== "manager")) {
    // redirect("/login");
    throw new Error("Unauthorized");
  }
  return await readUsers();
}

export async function createUser(newUser: Omit<User, "id">): Promise<User> {
  await wait(WAIT);
  const user = await getUserFromCookies();
  if (!user || (user.role !== "admin" && user.role !== "manager"))
    throw new Error("Unauthorized");

  const users = await readUsers();
  const id = Date.now();
  const created: User = { ...newUser, id };
  users.push(created);
  await writeUsers(users);
  return created;
}

export async function updateUser(
  id: number,
  updated: Partial<User>
): Promise<User> {
  await wait(WAIT);
  const user = await getUserFromCookies();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");

  const users = await readUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("User not found");
  users[index] = { ...users[index], ...updated };
  await writeUsers(users);
  return users[index];
}

export async function deleteUser(id: number): Promise<User> {
  await wait(WAIT);
  const user = await getUserFromCookies();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");

  const users = await readUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("User not found");
  const removed = users[index];
  users.splice(index, 1);
  await writeUsers(users);
  return removed;
}

// src/lib/api/centers.ts
