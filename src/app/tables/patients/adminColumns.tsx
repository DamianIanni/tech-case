// app/dashboard/patients/columns.ts
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Patient } from "@/types/patient";

import Actions from "@/components/tables/actions";

export const adminPatientsColumns: ColumnDef<Patient>[] = [
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
  {
    accessorKey: "treatment",
    header: "Treatment",
  },
  {
    id: "actions",
    header: () => <div className="text-right min-w-[100px]"></div>,
    cell: ({ row }) => {
      const patient = row.original;
      const id = patient.id;

      return <Actions id={id} route="patients" />;
    },
    size: 100,
    minSize: 100,
    maxSize: 100,
    enableSorting: false,
    enableResizing: false,
  },
];
