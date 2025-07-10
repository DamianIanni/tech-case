import { EntityForm } from "@/components/forms/entityForm";

export default function NewCenterPage() {
  return (
    <div className="flex flex-grow h-full flex-col items-center px-2 py-8 md:px-4">
      <EntityForm formType="center" />
    </div>
  );
}
