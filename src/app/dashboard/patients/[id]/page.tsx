// import { Patient } from "@/types/patient";
"use server";
import DashboardPageWrapper from "@/components/wrappers/dashboardPageWrapper";
import { notFound } from "next/navigation";
// import { getPatients } from "@/app/api/nonSimulatedAPI/methods";
import { getPatientById } from "@/app/api/nonSimulatedAPI/methods";

type Props = {
  params: { id: string };
};

export default async function PatientDetails(props: Props) {
  const { params } = props;
  const patient = await getPatientById(Number(params.id));
  if (!patient) return notFound();
  return (
    <DashboardPageWrapper>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          {patient.firstName} {patient.lastName}
        </h1>
        <p>Email: {patient.email}</p>
        <p>Phone: {patient.phoneNumber}</p>
        <p>Date of Birth: {patient.dob}</p>
        <p>Treatment: {patient.treatment}</p>
        <p>Sessions completed: {patient.sessionsCompleted}</p>
      </div>
    </DashboardPageWrapper>
  );
}
