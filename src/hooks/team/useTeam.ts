"use client";

import { useMutation } from "@tanstack/react-query";
import { ToastFeedback } from "@/components/feedback/toastFeedback";
import { User } from "@/types/user";

export function useCreatePatient() {
  return useMutation({
    mutationFn: inviteTeamMember,
    onSuccess: (data: Partial<User>) => {
      ToastFeedback({
        type: "success",
        title: "Team member inivited",
        description: `Team member ${data.firstName} inivited successfully.`,
      });
    },
    onError: () => {
      ToastFeedback({
        type: "error",
        title: "Failed to inivite patient",
        description: "Please try again later.",
      });
    },
  });
}

export function useUpdateTeamMember() {
  return useMutation({
    mutationFn: ({ id, updated }: { id: number; updated: Partial<User> }) =>
      updateteamMember(id, updated),
    onSuccess: (data: Partial<User>) => {
      ToastFeedback({
        type: "success",
        title: "Team member updated",
        description: `Team member ${data.firstName} updated successfully.`,
      });
    },
    onError: () => {
      ToastFeedback({
        type: "error",
        title: "Failed to update team member",
        description: "Please try again later.",
      });
    },
  });
}

export function useDeleteTeamMember() {
  return useMutation({
    mutationFn: (id: number) => deleteTeamMember(id),
    onSuccess: () => {
      ToastFeedback({
        type: "info",
        title: "Deleted",
        description: `Team member deleted successfully.`,
      });
    },
    onError: () => {
      ToastFeedback({
        type: "error",
        title: "Failed to delete team member",
        description: "Please try again later.",
      });
    },
  });
}
