"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

import TimezonesData from "@/data/timezones.json";
import { Timezone } from "@/index";
import React from "react";
import { ScrollArea } from "../scroll-area";

// import { toast } from "@/components/ui/use-toast"

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  name: z.string().min(4, {
    message: "name must be at least 4 characters.",
  }),

  timezone: z.string({
    required_error: "Please select your timezone.",
  }),
});

export function UpdateProfileForm({ data }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //   username: "",
      //   name: ''
    },
  });

  const [open, setOpen] = React.useState(false)

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  // ...

  type user = Database["public"]["Tables"]["profiles"]["Row"];

  const user: any = data.session.user.user_metadata;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>

              <FormControl>
                <Input defaultValue={user?.user_name} {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input
                  defaultValue={user?.full_name}
                  placeholder="full name"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Timezone</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? TimezonesData.find(
                            (timezone) => timezone.value === field.value
                          )?.text
                        : "Select timezone"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full h-[200px] p-0">
                <ScrollArea className="h-72 w-full rounded-md border">
                  <Command>
                    <CommandInput placeholder="Search timezones..." />
                    <CommandEmpty>No timezone found.</CommandEmpty>
                    <CommandGroup>
                      {TimezonesData.map((timezone: Timezone) => (
                        <CommandItem
                          value={timezone.value}
                          key={timezone.text}
                          onSelect={() => {
                            form.setValue("timezone", timezone.value);
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              timezone.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {timezone.text}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the timezone that will be applied to set up your
                meetings
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
