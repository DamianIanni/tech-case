// src/components/tables/table-cell-fallback.tsx
import { cn } from "@/lib/utils";

type TableCellFallbackProps = {
  value: string | null | undefined;
  fallback?: string;
  className?: string;
};

export function TableCellFallback({
  value,
  fallback = "No information provided",
  className,
}: TableCellFallbackProps) {
  const display = value?.trim() ? value : fallback;

  return (
    <span className={cn("text-sm text-muted-foreground", className)}>
      {display}
    </span>
  );
}
