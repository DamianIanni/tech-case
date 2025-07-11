"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Info, Trash2 } from "lucide-react";

export const adminTeamColumns: ColumnDef<User>[] = [
  {
    header: "Full name",
    accessorFn: (row) => `${row.name} ${row.surname}`,
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue() as string}</span>
    ),
    id: "fullName", // necesitas un id si no usás accessorKey
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "organization", header: "Organization" },
  {
    id: "actions",
    header: () => <div className="text-right min-w-[100px]">Actions</div>,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex justify-end gap-6 min-w-[100px]">
          <Button variant="outline" size="sm">
            <Info />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              // TODO: Implement delete action
              console.log("Delete patient", user.id);
            }}
          >
            <Trash2 />
          </Button>
        </div>
      );
    },
    size: 100,
    minSize: 100,
    maxSize: 100,
    enableSorting: false,
  },
];
