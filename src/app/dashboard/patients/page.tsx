"use server";

import DashboardPageWrapper from "@/components/wrappers/dashboardPageWrapper";
import { DataTable } from "@/components/tables/dataTable";
import { managerPatientsColumns } from "@/app/tables/patients/managerColumns";
import { adminPatientsColumns } from "@/app/tables/patients/adminColumns";
import { employeePatientsColumns } from "@/app/tables/patients/employeeColumns";
import { getUserFromCookies } from "@/lib/api/auth/getUserFromCookies";
import { getPatients } from "@/app/api/nonSimulatedAPI/methods";

export default async function PatientsPage() {
  const user = await getUserFromCookies();
  const patients = await getPatients();

  function whichColumns() {
    switch (user?.role) {
      case "admin":
        return adminPatientsColumns;
      case "manager":
        return managerPatientsColumns;
      default:
        return employeePatientsColumns;
    }
  }

  return (
    <DashboardPageWrapper>
      {user ? (
        <DataTable columns={whichColumns()} data={patients} />
      ) : (
        // <DataTable columns={adminPatientsColumns} data={mockPatients} />
        <h1>loading..</h1>
      )}
    </DashboardPageWrapper>
  );
}
