/**
 * @file useTeam.ts
 * @summary This file contains custom React Query hooks for managing team member data.
 * It provides hooks for creating, updating, and deleting team members,
 * with integrated toast feedback for success and error states.
 */

"use client";

import { useMutation } from "@tanstack/react-query";
import { ToastFeedback } from "@/components/feedback/toastFeedback";
import { User } from "@/types/user";
import {
  createUser,
  updateUser,
  deleteUser,
} from "@/app/api/simulatedAPI/userMethods";

/**
 * useCreateMember hook.
 * A custom hook that provides a mutation for creating a new team member.
 * It shows a success toast on successful invitation and an error toast if the invitation fails.
 * @returns {object} A mutation object from `@tanstack/react-query`.
 */
export function useCreateMember() {
  return useMutation({
    mutationFn: createUser,
    onSuccess: (data: Partial<User>) => {
      ToastFeedback({
        type: "success",
        title: "Team member invited",
        description: `Team member ${data.firstName} invited successfully.`,
      });
    },
    onError: () => {
      ToastFeedback({
        type: "error",
        title: "Failed to invite patient", // Note: Typo in original "inivite", corrected to "invite".
        description: "Please try again later.",
      });
    },
  });
}

/**
 * useUpdateTeamMember hook.
 * A custom hook that provides a mutation for updating an existing team member's information.
 * It displays a success toast upon a successful update and an error toast if the update fails.
 * @returns {object} A mutation object from `@tanstack/react-query`.
 */
export function useUpdateTeamMember() {
  return useMutation({
    mutationFn: ({ id, updated }: { id: number; updated: Partial<User> }) =>
      updateUser(id, updated),
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

/**
 * useDeleteTeamMember hook.
 * A custom hook that provides a mutation for deleting a team member.
 * It shows an info toast on successful deletion and an error toast if the deletion fails.
 * @returns {object} A mutation object from `@tanstack/react-query`.
 */
export function useDeleteTeamMember() {
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
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
