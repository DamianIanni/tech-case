"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Info, Trash2 } from "lucide-react";
import Link from "next/link";

export const managerTeamColumns: ColumnDef<User>[] = [
  {
    header: "Full name",
    accessorFn: (row) => `${row.name} ${row.surname}`,
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue() as string}</span>
    ),
    id: "fullName", // necesitas un id si no usás accessorKey
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "organization", header: "Organization" },
  {
    id: "actions",
    header: () => <div className="text-right min-w-[100px]">Actions</div>,
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <div className="flex justify-end gap-6 min-w-[100px]">
          <Link href={`/dashboard/patients/${patient.id}`}>
            <Button variant="outline" size="sm">
              <Info className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              console.log("Delete patient", patient.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    size: 100,
    minSize: 100,
    maxSize: 100,
    enableSorting: false,
    enableResizing: false,
  },
];
