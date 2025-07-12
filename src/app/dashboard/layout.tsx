"use server";

import { AppSidebar } from "@/components/nav/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PageHeader } from "@/components/nav/pageHeader";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="pl-[--sidebar-width] flex min-h-screen w-full flex-col bg-muted">
        <header className=" flex h-10 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-10">
          <div className="flex items-center gap-2 px-2">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <PageHeader />
          </div>
        </header>
        <main className="flex flex-grow p-2 ">
          <div className="w-full h-full rounded-xl bg-white">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
