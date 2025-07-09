export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string; // ISO date
  treatment: string;
  sessionsCompleted: number;
  sessions: {
    date: string; // ISO date
    notes: string;
  };
};
