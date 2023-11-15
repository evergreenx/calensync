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
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
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

export function UpdateProfileForm({ session , setOpenModal }: { session: Session | null , setOpenModal:any }) {
  // ge user timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const supabase = createClientComponentClient<Database>();

  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //   username: "",
      //   name: ''

      timezone: userTimezone,
    },
  });

  const [open, setOpen] = React.useState(false);

  const sessionData: any = session?.user;

  async function updateProfile(username: any, timezone: string, name: string) {
    try {
      setLoading(true);

      const { error } = await supabase
        .from("profiles")
        .update({
          id: session?.user.id,
          username,
          name: name,
          is_new_user: false,
          timezone: timezone,
        })
        .eq("id", sessionData.id);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      // alert("Error updating the data!");

      console.log(error);
    } finally {

      setOpenModal
      setLoading(false);

      setOpenModal(false)


    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    updateProfile(values.username, values.timezone, values.name);
  }
  // ...

  type user = Database["public"]["Tables"]["profiles"]["Row"];

  const user = session?.user.user_metadata;

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

        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 space-y-2 flex flex-col"
          htmlFor=":rb:-form-item"
        >
          Email
          <input
            type="email"
            placeholder="email"
            defaultValue={user?.email}
            disabled
            className="flex mt-3 h-10 w-full rounded-md disabled:border disabled:border-input disabled:bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed "
          />
        </label>

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
                  <Command
                    defaultValue={"Europe/Dublin"}
                    value={"Europe/Dublin"}
                  >
                    <CommandInput placeholder="Search timezones..." />

                    <ScrollArea className="h-full w-full rounded-md border">
                      <CommandEmpty>No timezone found.</CommandEmpty>
                      <CommandGroup>
                        {TimezonesData.map((timezone: Timezone) => (
                          <CommandItem
                            value={timezone.value}
                            key={timezone.text}
                            onSelect={() => {
                              form.setValue("timezone", timezone.value);
                              setOpen(false);
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
                    </ScrollArea>
                  </Command>
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
        <Button type="submit">{loading ? "Update" : "please wait"}</Button>
      </form>
    </Form>
  );
}
