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
import { GeneralTooltip } from "../feedback/generalTooltip";

export type Route = "patients" | "team";

type ActionsProps = {
  data: Partial<User | Patient>;
  route: Route;
  inInfo?: boolean;
};

export default function Actions(props: ActionsProps): React.ReactElement {
  const { data, route, inInfo } = props;
  const deleteMember = useDeleteTeamMember();
  const deletePatient = useDeletePatient();
  const { user } = useAuth();

  function handleDeleteAction() {
    if (route === "patients") {
      deletePatient.mutate(data.id!);
      return;
    }
    deleteMember.mutate(data.id!);
  }

  const detailRoute =
    route === "patients"
      ? ROUTES.patientDetail(data.id!)
      : ROUTES.teamMemberDetail(data.id!);

  const editRoute =
    route === "patients"
      ? ROUTES.patientEdit(data.id!)
      : ROUTES.teamMemberEdit(data.id!);

  const TITLE = route === "patients" ? "Patient" : "Team member";

  return (
    <div className="flex justify-end gap-2 min-w-[100px]">
      {!inInfo && (
        <GeneralTooltip message="View details">
          <Link href={detailRoute}>
            <span>
              <Button
                variant="ghost"
                size="sm"
                className="hover:cursor-pointer  hover:bg-muted"
              >
                <Info className="h-4 w-4  hover:bg-muted" />
              </Button>
            </span>
          </Link>
        </GeneralTooltip>
      )}

      {route !== "team" && (
        <GeneralTooltip message="Edit">
          <Link href={editRoute}>
            <span>
              <Button
                variant="ghost"
                size="sm"
                className="hover:cursor-pointer hover:bg-secondary"
              >
                <Edit2 className="h-4 w-4 hover:bg-secondary" />
              </Button>
            </span>
          </Link>
        </GeneralTooltip>
      )}
      {route === "team" && user?.role === "manager" ? null : (
        <GeneralTooltip message="Delete">
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
        </GeneralTooltip>
      )}
    </div>
  );
}
