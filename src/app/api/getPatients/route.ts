import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/apiUtils/jwtUtil";

// mocked patients
import { mockPatients } from "@/mocks/patients/patientsMock";

export async function GET() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = verifyJWT(token);
  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

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

  return NextResponse.json(response);
}
