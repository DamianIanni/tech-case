"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";

export const employeeTeamColumns: ColumnDef<User>[] = [
  {
    header: "Full name",
    accessorFn: (row) => `${row.name} ${row.surname}`,
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue() as string}</span>
    ),
    id: "fullName", // necesitas un id si no usás accessorKey
  },
  { accessorKey: "surname", header: "Surname" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "organization", header: "Organization" },
];
