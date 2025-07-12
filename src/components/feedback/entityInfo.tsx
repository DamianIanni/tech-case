"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { H3, Muted, Small } from "@/components/ui/typography";
import { User } from "@/types/user";
import { Patient } from "@/types/patient";
import { useAuth } from "../providers/AuthProvider";
import Actions from "../tables/actions";

type Props = {
  data: Partial<User | Patient>;
};

export default function EntityInfo(props: Props) {
  const { data } = props;
  const { user } = useAuth();

  const isPatient = "treatment" in data;
  const canSeeSessions = user?.role === "admin" || user?.role === "manager";

  const commonDetails = isPatient
    ? [
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phoneNumber },
        { label: "Date of Birth", value: data.dob },
      ]
    : [{ label: "Email", value: data.email }];

  const patientDetails = isPatient
    ? [
        { label: "Treatment", value: data.treatment },
        {
          label: "Sessions Completed",
          value: String(data.sessionsCompleted ?? 0),
        },
      ]
    : [];

  return (
    <div className="w-full max-w-2xl h-full flex flex-col rounded-xl p-6 relative">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <H3 className="mb-1 font-bold">
            {data.firstName} {data.lastName}
          </H3>
          <Actions
            route={isPatient ? "patients" : "team"}
            data={data!}
            inInfo
          />
        </div>
        <Muted>ID: {data.id}</Muted>
      </div>

      <div className="flex flex-col gap-6">
        {[...commonDetails, ...patientDetails].map((item) => (
          <div
            key={item.label}
            className="flex flex-wrap md:flex-nowrap justify-between items-center border-b pb-1 last:border-none"
          >
            <Small className="text-muted-foreground min-w-[120px]">
              {item.label}
            </Small>
            <Small className="break-words font-semibold text-right w-full md:w-auto">
              {item.value}
            </Small>
          </div>
        ))}
      </div>

      {isPatient && canSeeSessions && Array.isArray(data.sessions) && (
        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="sessions">
            <AccordionTrigger>Show session notes</AccordionTrigger>
            <AccordionContent>
              {data.sessions.map((session, idx) => (
                <div key={idx} className="mb-4 space-y-1">
                  <Small className="font-semibold text-muted-foreground">
                    {session.date}
                  </Small>
                  <p className="text-sm leading-5">{session.notes}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
