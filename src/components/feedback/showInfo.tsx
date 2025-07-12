"use client";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { H3, Muted, Small } from "@/components/ui/typography";
import { ActionDialog } from "./actionDialog";
import { cn } from "@/lib/utils";

type InfoCardWithActionsProps = {
  title: string;
  subtitle?: string;
  details: { label: string; value: string }[];
  onEdit?: () => void;
  onDelete?: () => void;
};

export function InfoCardWithActions({
  title,
  subtitle,
  details,
  onEdit,
  onDelete,
}: InfoCardWithActionsProps) {
  return (
    <div className={cn("w-full rounded-xl  bg-white p-6 relative")}>
      {/* Top right action buttons */}
      {(onEdit || onDelete) && (
        <div className="absolute top-4 right-4 flex gap-2">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              className="hover:cursor-pointer"
              onClick={onEdit}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <ActionDialog
              title="Delete"
              description={`Are you sure you want to delete ${title}? This action cannot be undone.`}
              onConfirm={onDelete}
            >
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </ActionDialog>
          )}
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <H3 className="mb-1">{title}</H3>
        {subtitle && <Muted>{subtitle}</Muted>}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8 ">
        {details.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between border-b pb-1 last:border-none"
          >
            <Small className="text-muted-foreground">{item.label}</Small>
            <Small className="text-right">{item.value}</Small>
          </div>
        ))}
      </div>
    </div>
  );
}
