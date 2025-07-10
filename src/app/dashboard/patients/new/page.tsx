import { EntityForm } from "@/components/forms/entityForm";

export default function NewPatientPage() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <EntityForm formType="patient" />
      </div>
    </div>
  );
}
