import { LoginForm } from "./loginForm";
import { PatientForm } from "./patientForm";
import { MemberForm } from "./memberForm";

type FormType = "patient" | "member" | "auth";

type EntityFormProps = {
  formType: FormType;
};

export function EntityForm({ formType }: EntityFormProps): React.ReactElement {
  switch (formType) {
    case "patient":
      return <PatientForm />;
    case "member":
      return <MemberForm />;
    default:
      return <LoginForm />;
  }
}
