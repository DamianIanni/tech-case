"use server";
import { Patient } from "@/types/patient";
import { getPatientById } from "@/app/api/nonSimulatedAPI/methods";
import EntityInfo from "@/components/feedback/entityInfo";
import DashboardPageWrapper from "@/components/wrappers/dashboardPageWrapper";

type Props = {
  params: { id: string };
};

export default async function PatientInfoPage(props: Props) {
  const { params } = props;
  const patient: Patient | null = await getPatientById(Number(params.id));

  return (
    <DashboardPageWrapper>
      <EntityInfo data={patient!} />
    </DashboardPageWrapper>
  );
}
