import * as z from "zod";

const roles = ["admin", "employee", "manager"] as const;

type Role = (typeof roles)[number];

export const memberSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, "Must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  role: z.enum(roles),
});

export type MemberFormValues = z.infer<typeof memberSchema>;
export type { Role };
