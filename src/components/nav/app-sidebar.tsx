"use client";

import * as React from "react";
import { Bot, LucideHospital, HousePlus, BookUser } from "lucide-react";

import { NavMain } from "@/components/nav/nav-main";
// import { NavProjects } from "@/components/nav/nav-projects";
import { NavUser } from "@/components/nav/nav-user";
import { TeamSwitcher } from "@/components/nav/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    // avatar: Bot,
  },
  teams: [
    {
      name: "Amager Hospital",
      logo: LucideHospital,
    },
    {
      name: "Copenhagen Clinic",
      logo: HousePlus,
    },
  ],
  navMain: [
    {
      title: "Team",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Add new member",
          url: "/dashboard/team/newMember",
        },
        {
          title: "Members",
          url: "/dashboard/team",
        },
      ],
    },
    {
      title: "Patients",
      url: "/dashboard/patients",
      icon: BookUser,
      isActive: true,
      items: [
        {
          title: "Add new patient",
          url: "/dashboard/patients/new",
        },
        {
          title: "Patients",
          url: "/dashboard/patients",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
