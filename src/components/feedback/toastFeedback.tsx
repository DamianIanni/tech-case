"use client";

import { toast } from "sonner";
import { CheckCircle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface AppToastOptions {
  title?: string;
  description?: string;
  type?: ToastType;
}

export function ToastFeedback({
  title,
  description,
  type = "info",
}: AppToastOptions) {
  const iconMap = {
    success: <CheckCircle className="text-green-600" />,
    error: <XCircle className="text-red-600" />,
    info: <Info className="text-blue-600" />,
  };

  const backgroundMap = {
    success: "bg-green-100",
    error: "bg-red-100",
    info: "bg-blue-100",
  };

  toast.custom(
    () => (
      <div
        className={cn(
          "flex items-start gap-3 rounded-lg border px-4 py-3 shadow-md",
          "w-[90vw] max-w-sm",
          backgroundMap[type]
        )}
      >
        {iconMap[type]}
        <div className="flex-1 space-y-1">
          {title && <p className="font-semibold text-sm">{title}</p>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    ),
    {
      position: "bottom-center",
    }
  );
}
