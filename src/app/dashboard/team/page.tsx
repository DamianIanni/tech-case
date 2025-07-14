/**
 * Team Management Dashboard Page
 *
 * This page displays a comprehensive list of team members in a data table format.
 * The table columns and available actions are dynamically determined based on
 * the user's role (admin, manager, or employee) to ensure appropriate access
 * control for team management operations.
 */

import DashboardPageWrapper from "@/components/wrappers/dashboardPageWrapper";
import { DataTable } from "@/components/tables/dataTable";
import { managerTeamColumns } from "@/constants/tables/users/managerColumns";
import { adminTeamColumns } from "@/constants/tables/users/adminColumns";
import { employeeTeamColumns } from "@/constants/tables/users/employeeColumns";
import { getUserFromCookies } from "@/lib/api/auth/getUserFromCookies";

import { getUsers } from "@/app/api/simulatedAPI/userMethods";

export const metadata = {
  title: "Team - Patient Management System",
  description:
    "Manage your team members and their roles with role-based access controls.",
};

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  // Get current user information for role-based access control
  const user = await getUserFromCookies();

  // Fetch all team members data
  const users = await getUsers();

  /**
   * Determines which table columns to display based on user role
   * Different roles have different permissions for team management
   *
   * @returns Column configuration array for the data table
   */
  function whichColumns() {
    switch (user?.role) {
      case "admin":
        return adminTeamColumns;
      case "manager":
        return managerTeamColumns;
      default:
        return employeeTeamColumns;
    }
  }

  return (
    <DashboardPageWrapper>
      {user ? (
        // Render data table with role-appropriate columns and team member data
        <DataTable columns={whichColumns()} data={users} />
      ) : (
        <h1>loading</h1>
      )}
    </DashboardPageWrapper>
  );
}
