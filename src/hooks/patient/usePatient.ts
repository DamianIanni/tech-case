"use client";

import { useMutation } from "@tanstack/react-query";
import { ToastFeedback } from "@/components/feedback/toastFeedback";
import { Patient } from "@/types/patient";
import {
  createPatient,
  updatePatient,
  deletePatient,
} from "@/app/api/simulatedAPI/patientMethods";

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
