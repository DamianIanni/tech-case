"use client";
import { usePathname } from "next/navigation";

export function PageHeader() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname.startsWith("/dashboard/patients")) return "Patients";
    return "Untitled Page";
  };

  return (
    <header className="px-4 py-2">
      <p className="text-sm font-semibold">{getTitle()}</p>
    </header>
  );
}
