"use server";

import { Patient } from "@/types/patient";
import { getUserFromCookies } from "@/lib/api/auth/user";
import { readPatients, writePatients } from "@/lib/data/store";

const WAIT = 1500;
function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function getPatientById(id: number): Promise<Patient | null> {
  const patients = await readPatients();
  return patients.find((p) => p.id === id) || null;
}

export async function getPatients(): Promise<Patient[]> {
  await wait(WAIT);
  const user = await getUserFromCookies();
  const allPatients = await readPatients();

  if (!user) throw new Error("Unauthorized");

  if (user.role === "admin") {
    return allPatients;
  }

  if (user.role === "manager") {
    return allPatients.map(({ sessions, ...rest }) => ({
      ...rest,
      sessionsCompleted: sessions.length,
      treatment: rest.treatment,
    }));
  }

  // employee
  return allPatients.map(({ id, firstName, lastName, dob }) => ({
    id,
    firstName,
    lastName,
    dob,
  }));
}

export async function createPatient(
  newPatient: Omit<Patient, "id">
): Promise<Patient> {
  await wait(WAIT);
  const user = await getUserFromCookies();
  if (!user || (user.role !== "admin" && user.role !== "manager")) {
    throw new Error("Unauthorized");
  }

  const patients = await readPatients();
  const id = Date.now();

  const newEntry: Patient = {
    ...newPatient,
    id,
    treatment: "treatment",
    sessionsCompleted: 3,
    sessions: [
      {
        date: "2025-01-01",
        notes: "notes",
      },
    ],
  };

  patients.push(newEntry);
  await writePatients(patients);
  return newEntry;
}

export async function updatePatient(
  id: number,
  updated: Partial<Patient>
): Promise<Patient> {
  await wait(WAIT);
  const user = await getUserFromCookies();
  if (!user || (user.role !== "admin" && user.role !== "manager")) {
    throw new Error("Unauthorized");
  }

  const patients = await readPatients();
  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Patient not found");

  patients[index] = { ...patients[index], ...updated };
  await writePatients(patients);
  return patients[index];
}

export async function deletePatient(id: number): Promise<Patient> {
  await wait(WAIT);
  const user = await getUserFromCookies();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const patients = await readPatients();
  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Patient not found");

  const removed = patients[index];
  patients.splice(index, 1);
  await writePatients(patients);
  return removed;
}
