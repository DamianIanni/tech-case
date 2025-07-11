"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Patient } from "@/types/patient";

export const employeePatientsColumns: ColumnDef<Patient>[] = [
  {
    header: "Full name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue() as string}</span>
    ),
    id: "fullName", // necesitas un id si no usás accessorKey
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
];
