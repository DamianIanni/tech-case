// "use client";

// import { useRouter } from "next/navigation";
// import { Patient } from "@/types/patient";
// import { ActionDialog } from "@/components/feedback/actionDialog";
// import { deletePatient } from "@/app/api/nonSimulatedAPI/methods";
// import { InfoCardWithActions } from "@/components/feedback/showInfo";

// type Props = {
//   patient: Patient;
// };

// export default function PatientInfoView(props: Props) {
//   const { patient } = props;
//   console.log("Patient Info View", patient);

//   const router = useRouter();

//   async function handleDelete() {
//     await deletePatient(patient.id);
//     router.replace("/dashboard/patients");
//   }

//   function handleEdit() {
//     router.push(`/dashboard/patients/${patient.id}/edit`);
//   }

//   return (
//     <div >

//       <InfoCardWithActions
//         title={`${patient.firstName} ${patient.lastName}`}
//         subtitle={`ID: ${patient.id}`}
//         details={[
//           { label: "Email", value: patient.email },
//           { label: "Phone", value: patient.phoneNumber },
//           { label: "Date of Birth", value: patient.dob },
//           { label: "Treatment", value: patient.treatment },
//           {
//             label: "Sessions Completed",
//             value: String(patient.sessionsCompleted),
//           },
//         ]}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { Patient } from "@/types/patient";
import { deletePatient } from "@/app/api/nonSimulatedAPI/methods";
import { Button } from "@/components/ui/button";
import { H3, Muted, Small } from "@/components/ui/typography";
import { Edit2, Trash2 } from "lucide-react";
import { ActionDialog } from "@/components/feedback/actionDialog";
import { cn } from "@/lib/utils";

type Props = {
  patient: Patient;
};

export default function PatientInfoPage({ patient }: Props) {
  const router = useRouter();

  async function handleDelete() {
    await deletePatient(patient.id);
    router.replace("/dashboard/patients");
  }

  function handleEdit() {
    router.push(`/dashboard/patients/${patient.id}/edit`);
  }

  return (
    <div className="w-full h-full flex justify-center  py-8">
      <div className="w-full max-w-3xl rounded-xl bg-white p-6 relative">
        {/* Top right actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>

          <ActionDialog
            title="Delete Patient"
            description={`Are you sure you want to delete ${patient.firstName} ${patient.lastName}? This action cannot be undone.`}
            onConfirm={handleDelete}
          >
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </ActionDialog>
        </div>

        {/* Header */}
        <div className="mb-4">
          <H3 className="mb-1">
            {patient.firstName} {patient.lastName}
          </H3>
          <Muted>ID: {patient.id}</Muted>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-10">
          {[
            { label: "Email", value: patient.email },
            { label: "Phone", value: patient.phoneNumber },
            { label: "Date of Birth", value: patient.dob },
            { label: "Treatment", value: patient.treatment },
            {
              label: "Sessions Completed",
              value: String(patient.sessionsCompleted),
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center border-b pb-1 last:border-none"
            >
              <Small className="text-muted-foreground">{item.label}</Small>
              <Small>{item.value}</Small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
