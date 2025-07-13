"use server";

import DashboardPageWrapper from "@/components/wrappers/dashboardPageWrapper";
import { DataTable } from "@/components/tables/dataTable";
import { managerPatientsColumns } from "@/constants/tables/patients/managerColumns";
import { adminPatientsColumns } from "@/constants/tables/patients/adminColumns";
import { employeePatientsColumns } from "@/constants/tables/patients/employeeColumns";
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
        <h1>loading..</h1>
      )}
    </DashboardPageWrapper>
  );
}
