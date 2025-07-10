"use server";

import { AppSidebar } from "@/components/nav/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PageHeader } from "@/components/nav/pageHeader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch del user, si querés
  // const user = await getCurrentUser();

  // Fetch de pacientes si sos manager, admin, etc.
  // const patients = await fetchPatientsForUser(user);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="pl-[--sidebar-width] flex min-h-screen w-full flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    <PageHeader />
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex-grow p-4 bg-amber-100">{children}</main>
      </div>
    </SidebarProvider>
  );
}
