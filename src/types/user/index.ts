export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: "admin" | "employee" | "manager";
  organization: string;
};
