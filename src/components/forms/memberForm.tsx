"use client";

import React from "react";
import { Button } from "@/components/ui/button";

import { memberSchema, MemberFormValues } from "@/lib/schemas/memberSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SelectField } from "./fields/selectField";

import { AlertMessage } from "../feedback/AlertMessage";

import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";

import { TextField } from "./fields/textField";

const selectOptionList = [
  { label: "Manager", value: "manager" },
  { label: "Employee", value: "employee" },
];

export function MemberForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      firstName: "",
      email: "",
    },
  });

  // const invalidCredentials = {
  //   title: "Unable to login",
  //   description: "Please check your credentials and try again.",
  //   data: ["Check your email", "Check your password"],
  // };

  async function onSubmit(values: MemberFormValues) {
    console.log(values);
  }

  return (
    <div className="grid items-center justify-center bg-muted px-4 py-8">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight">
          Add new team member
        </h2>
        <p className="text-muted-foreground text-sm">
          Fill out the form below to invite a new member.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <TextField control={form.control} name="firstName" label="Name" />
            <TextField
              control={form.control}
              name="email"
              label="Email"
              type="email"
            />
            <SelectField
              control={form.control}
              name="role"
              label="Role"
              options={selectOptionList}
            />
            <Button type="submit" className="w-full">
              Inivite
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
