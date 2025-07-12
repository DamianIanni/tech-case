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
import { useAuth } from "../providers/AuthProvider";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  console.log(user);

  const data = {
    user: {
      name: user?.firstName,
      lastname: user?.lastName,
      email: user?.email,
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
          // {
          //   title: "Add new member",
          //   url: "/dashboard/team/newMember",
          // },
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
            title: "Patients",
            url: "/dashboard/patients",
          },
          {
            title: "Add new patient",
            url: "/dashboard/patients/new",
          },
        ],
      },
    ],
  };

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
