"use server";

import { EntityForm } from "@/components/forms/entityForm";
import { redirect } from "next/navigation";
import { getUserFromCookies } from "@/lib/api/auth/getUserFromCookies";

export default async function LoginPage() {
  const user = await getUserFromCookies();
  if (user) redirect("/dashboard");
  return (
    <div className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <EntityForm formType="auth" />
      </div>
    </div>
  );
}
