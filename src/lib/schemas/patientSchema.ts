// lib/schemas/patient.ts
import * as z from "zod";

export const patientSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, "Must be at least 2 characters"),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(2, "Must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phoneNumber: z.string().min(8, "Must be at least 8 digits"),
  dob: z
    .string()
    .refine((date) => new Date(date) < new Date(), {
      message: "Date must be in the past",
    }),
});

export type PatientFormValues = z.infer<typeof patientSchema>;
