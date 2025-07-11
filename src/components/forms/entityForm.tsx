import { LoginForm } from "./loginForm";
import { PatientForm } from "./patientForm";
import { MemberForm } from "./memberForm";
import { CenterForm } from "./centerForm";

import { Center } from "@/types/center";
import { User } from "@/types/user";
import { Patient } from "@/types/patient";

type FormType = "patient" | "member" | "auth" | "center";

type EntityFormProps = {
  formType: FormType;
  mode?: "create" | "edit";
  data?: Partial<Patient | User | Center>;
};

export function EntityForm({
  formType,
  mode,
  data,
}: EntityFormProps): React.ReactElement {
  switch (formType) {
    case "patient":
      return <PatientForm mode={mode} data={data} />;
    case "member":
      return <MemberForm mode={mode} data={data} />;
    case "center":
      return <CenterForm />;
    default:
      return <LoginForm />;
  }
}
