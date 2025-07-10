"use client";

import * as React from "react";
import { CalendarPlusIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Control } from "react-hook-form";
import { PatientFormValues } from "@/lib/schemas/patientSchema";

type Calendar32Props = {
  control: Control<PatientFormValues>;
};

export default function Calendar32(props: Calendar32Props) {
  const { control } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={control}
      name="dob"
      render={({ field }) => {
        const date = field.value ? new Date(field.value) : undefined;

        return (
          <FormItem className="flex flex-col gap-2">
            <FormLabel>Date of birth</FormLabel>
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    id="dob"
                    className="w-48 justify-between font-normal"
                  >
                    {date ? format(date, "PPP") : <span>Select date</span>}
                    <CalendarPlusIcon />
                  </Button>
                </FormControl>
              </DrawerTrigger>
              <DrawerContent className="w-auto overflow-hidden p-0">
                <DrawerHeader className="sr-only">
                  <DrawerTitle>Select date</DrawerTitle>
                  <DrawerDescription>Set your date of birth</DrawerDescription>
                </DrawerHeader>
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(selectedDate) => {
                    if (selectedDate) {
                      field.onChange(selectedDate.toISOString());
                      setOpen(false);
                    }
                  }}
                  className="mx-auto [--cell-size:clamp(0px,calc(100vw/7.5),52px)]"
                />
              </DrawerContent>
            </Drawer>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
