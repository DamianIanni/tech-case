/**
 * Patients Dashboard Page
 *
 * This page displays a comprehensive list of patients in a data table format.
 * The table columns and available actions are dynamically determined based on
 * the user's role (admin, manager, or employee) to ensure appropriate access
 * control and functionality.
 */

import DashboardPageWrapper from "@/components/wrappers/dashboardPageWrapper";
import { DataTable } from "@/components/tables/dataTable";
import { managerPatientsColumns } from "@/constants/tables/patients/managerColumns";
import { adminPatientsColumns } from "@/constants/tables/patients/adminColumns";
import { employeePatientsColumns } from "@/constants/tables/patients/employeeColumns";
import { getUserFromCookies } from "@/lib/api/auth/getUserFromCookies";
import { getPatients } from "@/app/api/simulatedAPI/patientMethods";

// Force dynamic rendering to ensure fresh data on each request
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Patients - Patient Management System",
  description:
    "View and manage your list of patients with role-based access controls.",
};

export default async function PatientsPage() {
  const user = await getUserFromCookies();

  const patients = await getPatients();

  /**
   * Determines which table columns to display based on user role
   * Different roles have different permissions and see different data
   *
   * @returns Column configuration array for the data table
   */
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
        // Render data table with role-appropriate columns and patient data
        <DataTable columns={whichColumns()} data={patients} />
      ) : (
        <h1>loading..</h1>
      )}
    </DashboardPageWrapper>
  );
}
