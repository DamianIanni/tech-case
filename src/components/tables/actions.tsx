"use client";

import { Button } from "@/components/ui/button";
import { Info, Edit2 } from "lucide-react";
import Link from "next/link";
import { useDeleteTeamMember } from "@/hooks/team/useTeam";
import { useDeletePatient } from "@/hooks/patient/usePatient";
import { ActionDialog } from "@/components/feedback/actionDialog";
import { User } from "@/types/user";
import { Patient } from "@/types/patient";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "../providers/AuthProvider";

type ActionsProps = {
  data: Partial<User | Patient>;
  route: string;
};

export default function Actions(props: ActionsProps): React.ReactElement {
  const { data, route } = props;
  const deleteMember = useDeleteTeamMember();
  const deletePatient = useDeletePatient();
  const { user } = useAuth();

  function handleDeleteAction() {
    if (route === "patients") {
      if (typeof data?.id === "number") {
        deletePatient.mutate(data.id);
      } else {
        console.error("Patient id is undefined or not a number");
      }
      return;
    }
    if (typeof data.id === "number") {
      deleteMember.mutate(data.id);
      console.log("Deleted", data.id);
    } else {
      console.error("Member id is undefined or not a number");
    }
  }

  const ROUTE = route === "patients" ? ROUTES.patients : ROUTES.team;

  const TITLE = route === "patients" ? "Patient" : "Team member";

  return (
    <div className="flex justify-end gap-2 min-w-[100px]">
      <Link href={`${ROUTE}${data.id}`}>
        <Button variant="outline" size="sm" className="hover:cursor-pointer">
          <Info className="h-4 w-4" />
        </Button>
      </Link>

      {route !== "team" && (
        <Link href={`${ROUTE}${data.id}/edit`}>
          <Button variant="outline" size="sm" className="hover:cursor-pointer">
            <Edit2 className="h-4 w-4" />
          </Button>
        </Link>
      )}
      {route === "team" && user?.role === "manager" ? null : (
        <ActionDialog
          title={`Delete ${TITLE}`}
          description={`Are you sure you want to delete ${data.firstName} ${data.lastName}?\n This action cannot be undone.`}
          triggerLabel="Delete"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={() => {
            handleDeleteAction();
          }}
        />
      )}
    </div>
  );
}
