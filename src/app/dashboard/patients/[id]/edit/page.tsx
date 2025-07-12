"use server";

import { EntityForm } from "@/components/forms/entityForm";
import DashboardPageWrapper from "@/components/wrappers/dashboardPageWrapper";
import { notFound } from "next/navigation";
import { getPatientById } from "@/app/api/nonSimulatedAPI/methods";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPatientPage(props: Props) {
  const params = await props.params;
  const id = Number(params.id);
  const patient = await getPatientById(id);

  if (!patient) return notFound();

  return (
    <DashboardPageWrapper>
      <EntityForm formType="patient" mode={"edit"} data={patient} />
    </DashboardPageWrapper>
  );
}
