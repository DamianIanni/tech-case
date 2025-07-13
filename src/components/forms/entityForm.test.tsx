import { screen } from "@testing-library/react";
import { EntityForm } from "./entityForm";
import { renderWithClient } from "@/lib/test-utils";

// Mocks para cada formulario
jest.mock("./patientForm", () => ({
  PatientForm: () => <div data-testid="patient-form">PatientForm</div>,
}));

jest.mock("./memberForm", () => ({
  MemberForm: () => <div data-testid="member-form">MemberForm</div>,
}));

jest.mock("./centerForm", () => ({
  CenterForm: () => <div data-testid="center-form">CenterForm</div>,
}));

jest.mock("./loginForm", () => ({
  LoginForm: () => <div data-testid="login-form">LoginForm</div>,
}));

describe("EntityForm", () => {
  it("renders PatientForm when formType is 'patient'", () => {
    renderWithClient(<EntityForm formType="patient" />);
    expect(screen.getByTestId("patient-form")).toBeInTheDocument();
  });

  it("renders MemberForm when formType is 'member'", () => {
    renderWithClient(<EntityForm formType="member" />);
    expect(screen.getByTestId("member-form")).toBeInTheDocument();
  });

  it("renders CenterForm when formType is 'center'", () => {
    renderWithClient(<EntityForm formType="center" />);
    expect(screen.getByTestId("center-form")).toBeInTheDocument();
  });

  it("renders LoginForm when formType is unknown", () => {
    // @ts-expect-error: test fallback to default
    renderWithClient(<EntityForm formType="unknown" />);
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });
});
