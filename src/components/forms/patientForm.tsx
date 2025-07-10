"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const invalidCredentials = {
    title: "Unable to login",
    description: "Please check your credentials and try again.",
    data: ["Check your email", "Check your password"],
  };

  async function onSubmit(values: PatientFormValues) {
    console.log(values);
  }

  return (
    <div className="grid items-center justify-center bg-muted px-4 py-8">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight">
          Add new patient
        </h2>
        <p className="text-muted-foreground text-sm">
          Fill out the form below to register a new patient.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <TextField
              control={form.control}
              name="firstName"
              label="First name"
            />
            <TextField
              control={form.control}
              name="lastName"
              label="Last name"
            />
            <TextField
              control={form.control}
              name="email"
              label="Email"
              type="email"
            />
            <TextField
              control={form.control}
              name="phoneNumber"
              label="Phone number"
            />
            <Calendar22 control={form.control} />
            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
