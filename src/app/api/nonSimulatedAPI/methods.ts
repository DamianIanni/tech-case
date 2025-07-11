/* eslint-disable @typescript-eslint/no-unused-vars */
// src/lib/api/patients.ts
import { mockPatients } from "@/mocks/patients/patientsMock";
import { Patient } from "@/types/patient";
import { getUserFromCookies } from "@/lib/api/auth/user";

function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function getPatients(): Promise<Patient[]> {
  await wait(2000);
  const user = await getUserFromCookies();
  let response;
  if (user.role === "admin") {
    response = mockPatients;
  } else if (user.role === "manager") {
    response = mockPatients.map(({ sessions, ...rest }) => ({
      ...rest,
      sessionsCompleted: sessions.length,
      treatment: rest.treatment,
    }));
  } else {
    // employee
    response = mockPatients.map(({ id, firstName, lastName, dob }) => ({
      id,
      firstName,
      lastName,
      dob,
    }));
  }
  return mockPatients;
}

export async function createPatient(
  newPatient: Omit<Patient, "id">
): Promise<Patient> {
  await wait(2000);
  const user = await getUserFromCookies();
  console.log("Se llamo?", user);
  if (!user || (user.role !== "admin" && user.role !== "manager")) {
    throw new Error("Unauthorized");
  }
  const id = Date.now();
  const treatment = "treatment";
  const sessionsCompleted = 3;
  const sessions = [
    {
      date: "2025-01-01",
      notes: "notes",
    },
  ];
  const created = { ...newPatient, id, treatment, sessionsCompleted, sessions };
  mockPatients.push(created);
  console.log(mockPatients);

  return created;
}

export async function updatePatient(
  id: number,
  updated: Partial<Patient>
): Promise<Patient> {
  await wait(2000);
  const user = await getUserFromCookies();
  if (!user || (user.role !== "admin" && user.role !== "manager")) {
    throw new Error("Unauthorized");
  }
  const index = mockPatients.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Patient not found");
  mockPatients[index] = { ...mockPatients[index], ...updated };
  return mockPatients[index];
}

export async function deletePatient(id: number): Promise<Patient> {
  await wait(2000);
  const user = await getUserFromCookies();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  const index = mockPatients.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Patient not found");
  const removed = mockPatients[index];
  mockPatients.splice(index, 1);
  return removed;
}
