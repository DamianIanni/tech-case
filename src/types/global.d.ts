import type { Patient } from "@/types/patient";

declare global {
  var __mockPatients: Patient[]; // 👈 le decimos a TypeScript que existe
}

export {};
