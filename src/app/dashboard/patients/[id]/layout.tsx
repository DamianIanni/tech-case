// app/dashboard/patients/[id]/page.tsx
import { getPatientById } from "@/app/api/nonSimulatedAPI/methods";
import DashboardPageWrapper from "@/components/wrappers/dashboardPageWrapper";
import { notFound } from "next/navigation";
import PatientInfoView from "./page";

type Props = {
  params: { id: string };
};

export default async function PatientDetailsPage({ params }: Props) {
  const id = Number(params.id);
  const patient = await getPatientById(id);

  if (!patient) return notFound();

  return (
    <DashboardPageWrapper>
      <PatientInfoView patient={patient} />
    </DashboardPageWrapper>
  );
}
