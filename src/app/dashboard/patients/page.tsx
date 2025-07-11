"use server";

import DashboardPageWrapper from "@/components/wrappers/dashboardPageWrapper";
import { DataTable } from "@/components/tables/dataTable";
import { managerPatientsColumns } from "@/app/tables/patients/managerColumns";
import { adminPatientsColumns } from "@/app/tables/patients/adminColumns";
import { employeePatientsColumns } from "@/app/tables/patients/employeeColumns";
import { getUserFromCookies } from "@/lib/api/auth/user";
import { getPatients } from "@/app/api/nonSimulatedAPI/methods";

export default async function PatientsPage() {
  // const user = token ? verifyJWT(token) : null;

  const user = await getUserFromCookies();
  console.log("user", user);
  const patients = await getPatients();
  console.log("patients", patients);

  // const user = JSON.parse(cookiesStore.get("user")?.value)
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
