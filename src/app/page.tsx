import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/apiUtils/jwtUtil";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const user = verifyJWT(token);

  if (!user) {
    redirect("/login");
  }

  redirect("/dashboard");
}
