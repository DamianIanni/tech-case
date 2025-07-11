// import { Patient } from "@/types/patient";
"use server";
import DashboardPageWrapper from "@/components/wrappers/dashboardPageWrapper";
import { notFound } from "next/navigation";
import { getUserById } from "@/app/api/nonSimulatedAPI/userMethods";

type Props = {
  params: { id: string };
};

export default async function MemberDetails(props: Props) {
  const { params } = props;
  const member = await getUserById(Number(params.id));
  if (!member) return notFound();
  return (
    <DashboardPageWrapper>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          {member.firstName} {member.lastName}
        </h1>
        <p>Organization: {member.organization}</p>
        <p>Role: {member.role}</p>
      </div>
    </DashboardPageWrapper>
  );
}
