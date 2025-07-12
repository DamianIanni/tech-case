"use server";

import DashboardPageWrapper from "@/components/wrappers/dashboardPageWrapper";
import { DataTable } from "@/components/tables/dataTable";
import { managerTeamColumns } from "@/app/tables/users/managerColumns";
import { adminTeamColumns } from "@/app/tables/users/adminColumns";
import { employeeTeamColumns } from "@/app/tables/users/employeeColumns";
import { getUserFromCookies } from "@/lib/api/auth/getUserFromCookies";

import { getUsers } from "@/app/api/nonSimulatedAPI/userMethods";

export default async function PatientsPage() {
  const user = await getUserFromCookies();
  const users = await getUsers();

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
        <DataTable columns={whichColumns()} data={users} />
      ) : (
        <h1>loading</h1>
      )}
    </DashboardPageWrapper>
  );
}
