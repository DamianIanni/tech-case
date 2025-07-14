/**
 * @file usePatient.ts
 * @summary This file contains custom React Query hooks for managing patient data.
 * It provides hooks for creating, updating, and deleting patient records,
 * with integrated toast feedback for success and error states.
 */

"use client";

import { useMutation } from "@tanstack/react-query";
import { ToastFeedback } from "@/components/feedback/toastFeedback";
import { Patient } from "@/types/patient";
import {
  createPatient,
  updatePatient,
  deletePatient,
} from "@/app/api/simulatedAPI/patientMethods";

/**
 * useCreatePatient hook.
 * A custom hook that provides a mutation for creating a new patient record.
 * It shows a success toast on successful creation and an error toast if the creation fails.
 * @returns {object} A mutation object from `@tanstack/react-query`.
 */
export function useCreatePatient() {
  return useMutation({
    mutationFn: createPatient,
    onSuccess: (data: Partial<Patient>) => {
      ToastFeedback({
        type: "success",
        title: "Patient created",
        description: `Patient ${data.firstName} added successfully.`,
      });
    },
    onError: () => {
      ToastFeedback({
        type: "error",
        title: "Failed to create patient",
        description: "Please try again later.",
      });
    },
  });
}

/**
 * useUpdatePatient hook.
 * A custom hook that provides a mutation for updating an existing patient's information.
 * It displays a success toast upon a successful update and an error toast if the update fails.
 * @returns {object} A mutation object from `@tanstack/react-query`.
 */
export function useUpdatePatient() {
  return useMutation({
    mutationFn: ({ id, updated }: { id: number; updated: Partial<Patient> }) =>
      updatePatient(id, updated),
    onSuccess: (data: Partial<Patient>) => {
      ToastFeedback({
        type: "success",
        title: "Patient updated",
        description: `Patient ${data.firstName} updated successfully.`,
      });
    },
    onError: () => {
      ToastFeedback({
        type: "error",
        title: "Failed to update patient",
        description: "Please try again later.",
      });
    },
  });
}

/**
 * useDeletePatient hook.
 * A custom hook that provides a mutation for deleting a patient record.
 * It shows an info toast on successful deletion and an error toast if the deletion fails.
 * @returns {object} A mutation object from `@tanstack/react-query`.
 */
export function useDeletePatient() {
  return useMutation({
    mutationFn: (id: number) => deletePatient(id),
    onSuccess: () => {
      ToastFeedback({
        type: "info",
        title: "Patient Deleted",
        description: `Patient deleted successfully.`,
      });
    },
    onError: () => {
      ToastFeedback({
        type: "error",
        title: "Failed to delete patient",
        description: "Please try again later.",
      });
    },
  });
}
