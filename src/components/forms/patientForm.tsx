// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";

// import { patientSchema, PatientFormValues } from "@/lib/schemas/patientSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useCreatePatient, useUpdatePatient } from "@/hooks/patient/usePatient";
// import Calendar22 from "../calendars/calendar-22";
// import { Patient } from "@/types/patient";
// import { useRouter } from "next/navigation";
// import { Form } from "@/components/ui/form";
// import { cn } from "@/lib/utils";
// import { TextField } from "./fields/textField";

// type PatientFormProps = {
//   mode?: "create" | "edit";
//   data?: Partial<Patient>;
// };

// export function PatientForm(props: PatientFormProps): React.ReactElement {
//   const { mode, data } = props;
//   const createPatient = useCreatePatient();
//   const updatePatient = useUpdatePatient();
//   const router = useRouter();
//   const form = useForm<PatientFormValues>({
//     resolver: zodResolver(patientSchema),
//     defaultValues: {
//       firstName: data?.firstName || "",
//       lastName: data?.lastName || "",
//       email: data?.email || "",
//       phoneNumber: data?.phoneNumber || "",
//       treatment: data?.treatment || "",
//       dob: data?.dob || "",
//     },
//   });

//   async function onSubmit(values: PatientFormValues) {
//     if (mode === "edit" && data?.id) {
//       updatePatient.mutate({
//         id: data.id,
//         updated: { ...values },
//       });
//     } else {
//       createPatient.mutate({
//         ...values,
//         sessions: [],
//         sessionsCompleted: 0,
//       });
//     }
//     router.replace("/dashboard/patients");
//     console.log(values);
//   }

//   return (
//     <div
//       className={cn("w-full max-w-2xl h-full flex flex-col rounded-xl p-6 ")}
//       {...props}
//     >
//       <h2 className="text-2xl font-semibold tracking-tight mb-2">
//         {mode === "edit" ? "Edit patient" : "Add new patient"}
//       </h2>
//       <p className="text-muted-foreground text-sm mb-6">
//         {mode === "edit"
//           ? "Update the patient's information below."
//           : "Fill out the form below to register a new patient."}
//       </p>
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="flex flex-col flex-grow justify-between gap-6"
//         >
//           <div className="space-y-6">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex-1">
//                 <TextField
//                   control={form.control}
//                   name="firstName"
//                   label="First name"
//                 />
//               </div>
//               <div className="flex-1">
//                 <TextField
//                   control={form.control}
//                   name="lastName"
//                   label="Last name"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex-1">
//                 <TextField
//                   control={form.control}
//                   name="email"
//                   label="Email"
//                   type="email"
//                 />
//               </div>
//               <div className="flex-1">
//                 <TextField
//                   control={form.control}
//                   name="phoneNumber"
//                   label="Phone number"
//                 />
//               </div>
//             </div>
//             <div className="flex-1">
//               <TextField
//                 control={form.control}
//                 name="treatment"
//                 label="Treatment"
//               />
//             </div>
//             <div className="flex w-sm">
//               <Calendar22 control={form.control} />
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <Button className="hover:cursor-pointer" type="submit">
//               {mode === "edit" ? "Save changes" : "Create"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }

"use client";

import React from "react";
import { Button } from "@/components/ui/button";

import { patientSchema, PatientFormValues } from "@/lib/schemas/patientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreatePatient, useUpdatePatient } from "@/hooks/patient/usePatient";
import Calendar22 from "../calendars/calendar-22";
import { Patient } from "@/types/patient";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { TextField } from "./fields/textField";
import { OverlayLoader } from "../loaders/loader";

type PatientFormProps = {
  mode?: "create" | "edit";
  data?: Partial<Patient>;
};

export function PatientForm(props: PatientFormProps): React.ReactElement {
  const { mode, data } = props;
  const createPatient = useCreatePatient();
  const updatePatient = useUpdatePatient();
  const router = useRouter();
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      email: data?.email || "",
      phoneNumber: data?.phoneNumber || "",
      treatment: data?.treatment || "",
      dob: data?.dob || "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: PatientFormValues) {
    if (mode === "edit" && data?.id) {
      await updatePatient.mutateAsync({
        id: data.id,
        updated: { ...values },
      });
    } else {
      await createPatient.mutateAsync({
        ...values,
        sessions: [],
        sessionsCompleted: 0,
      });
    }
    router.replace("/dashboard/patients");
  }

  return (
    <div
      className={cn(
        "w-full max-w-2xl h-full flex flex-col rounded-xl p-6 relative"
      )}
      {...props}
    >
      <h2 className="text-2xl font-semibold tracking-tight mb-2">
        {mode === "edit" ? "Edit patient" : "Add new patient"}
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        {mode === "edit"
          ? "Update the patient's information below."
          : "Fill out the form below to register a new patient."}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-grow justify-between gap-6"
        >
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <TextField
                  control={form.control}
                  name="firstName"
                  label="First name"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex-1">
                <TextField
                  control={form.control}
                  name="lastName"
                  label="Last name"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <TextField
                  control={form.control}
                  name="email"
                  label="Email"
                  type="email"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex-1">
                <TextField
                  control={form.control}
                  name="phoneNumber"
                  label="Phone number"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="flex-1">
              <TextField
                control={form.control}
                name="treatment"
                label="Treatment"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex w-sm">
              <Calendar22 control={form.control} disabled={isSubmitting} />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              className="hover:cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : mode === "edit"
                ? "Save changes"
                : "Create"}
            </Button>
          </div>
        </form>
      </Form>
      {isSubmitting && <OverlayLoader />}
    </div>
  );
}
