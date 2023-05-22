// "use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Hero from "@/components/hero";
import Header from "@/components/ui/header";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase.from("profiles").select();

  console.log(data);

  const handleNewUser = (profiles: any) => {
    if (!profiles || !Array.isArray(profiles)) {
      // Handle the case where profiles is not available or not an array
      return [];
    }

    return profiles.map((profile) => {
      if (profile && profile.is_new_user !== undefined) {
        return profile.is_new_user;
      } else {
        // Handle the case where the profile or is_new_user field is not available
        return false; // Default value or handle accordingly
      }
    });
  };

  console.log(handleNewUser(data));

  return (
    <section className="my-20">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt autem
      error eum quae aperiam? Quidem corporis, quasi similique amet aut
      inventore debitis, dolore tempore dignissimos suscipit facilis? Debitis,
      earum possimus.
    </section>
  );
}
