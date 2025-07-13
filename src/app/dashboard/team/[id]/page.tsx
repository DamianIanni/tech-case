"use server";

import { User } from "@/types/user";
import { getUserById } from "@/app/api/simulatedAPI/userMethods";
import EntityInfo from "@/components/feedback/entityInfo";
import DashboardPageWrapper from "@/components/wrappers/dashboardPageWrapper";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UserInfoPage(props: Props) {
  const params = await props.params;
  const user: User | null = await getUserById(Number(params.id));

  return (
    <DashboardPageWrapper>
      <EntityInfo data={user!} />
    </DashboardPageWrapper>
  );
}
