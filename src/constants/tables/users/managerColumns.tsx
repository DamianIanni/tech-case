"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import Actions from "@/components/tables/actions";

export const managerTeamColumns: ColumnDef<User>[] = [
  {
    header: "Full name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue() as string}</span>
    ),
    id: "fullName",
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "organization", header: "Organization" },
  {
    id: "actions",
    header: () => <div className="text-right min-w-[100px]"></div>,
    cell: ({ row }) => {
      const member = row.original;

      return <Actions data={member} route="team" />;
    },
    size: 100,
    minSize: 100,
    maxSize: 100,
    enableSorting: false,
    enableResizing: false,
  },
];
