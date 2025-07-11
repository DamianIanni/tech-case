"use server";

import { EntityForm } from "@/components/forms/entityForm";
import DashboardPageWrapper from "@/components/wrappers/dashboardPageWrapper";
import { notFound } from "next/navigation";
import { getUserById } from "@/app/api/nonSimulatedAPI/userMethods";

type Props = {
  params: { id: string };
};

export default async function EditMemberPage(props: Props) {
  const { params } = await props;
  const id = Number(params.id);
  const member = await getUserById(id);

  if (!member) return notFound();

  return (
    <DashboardPageWrapper>
      <EntityForm formType="member" mode={"edit"} data={member} />
    </DashboardPageWrapper>
  );
}
