"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";

export const employeeTeamColumns: ColumnDef<User>[] = [
  {
    header: "Full name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue() as string}</span>
    ),
    id: "fullName",
  },
  { accessorKey: "surname", header: "Surname" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "organization", header: "Organization" },
];
