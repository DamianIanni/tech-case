import { LoginForm } from "./loginForm";
import { PatientForm } from "./patientForm";
import { MemberForm } from "./memberForm";
import { CenterForm } from "./centerForm";

type FormType = "patient" | "member" | "auth" | "center";

type EntityFormProps = {
  formType: FormType;
};

export function EntityForm({ formType }: EntityFormProps): React.ReactElement {
  switch (formType) {
    case "patient":
      return <PatientForm />;
    case "member":
      return <MemberForm />;
    case "center":
      return <CenterForm />;
    default:
      return <LoginForm />;
  }
}
