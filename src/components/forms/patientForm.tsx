"use client";

import React from "react";
import { Button } from "@/components/ui/button";

// import { loginSchema, LoginSchemaType } from "@/lib/schemas/authSchema";
import { patientSchema, PatientFormValues } from "@/lib/schemas/patientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Calendar22 from "../calendars/calendar-22";

import { AlertMessage } from "../feedback/AlertMessage";

import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ButtonLoading } from "../ui/ButtonLoading";
import { cn } from "@/lib/utils";
import { TextField } from "./fields/textField";

export function PatientForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dob: "",
    },
  });

  async function onSubmit(values: PatientFormValues) {
    console.log(values);
  }

  return (
    <div
      className={cn(
        "w-full max-w-2xl h-full flex flex-col rounded-xl p-6 ",
        className
      )}
      {...props}
    >
      <h2 className="text-2xl font-semibold tracking-tight mb-2">
        Add new patient
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Fill out the form below to register a new patient.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-grow justify-between gap-6"
        >
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <TextField
                  control={form.control}
                  name="firstName"
                  label="First name"
                />
              </div>
              <div className="flex-1">
                <TextField
                  control={form.control}
                  name="lastName"
                  label="Last name"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <TextField
                  control={form.control}
                  name="email"
                  label="Email"
                  type="email"
                />
              </div>
              <div className="flex-1">
                <TextField
                  control={form.control}
                  name="phoneNumber"
                  label="Phone number"
                />
              </div>
            </div>

            <Calendar22 control={form.control} />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
