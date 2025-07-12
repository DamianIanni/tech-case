"use server";

import { User } from "@/types/user";
import { getUserById } from "@/app/api/nonSimulatedAPI/userMethods";
import EntityInfo from "@/components/feedback/entityInfo";
import DashboardPageWrapper from "@/components/wrappers/dashboardPageWrapper";

type Props = {
  params: { id: string };
};

export default async function UserInfoPage({ params }: Props) {
  // const id = Number(params.id);
  const user: User | null = await getUserById(Number(params.id));

  return (
    <DashboardPageWrapper>
      <EntityInfo data={user!} />
    </DashboardPageWrapper>
  );
}
