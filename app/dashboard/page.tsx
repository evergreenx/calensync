"use client";

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

export default function Page() {
  const [date, setDate] = React.useState<Date>();

  return (
    <section className="my-20">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt autem
      error eum quae aperiam? Quidem corporis, quasi similique amet aut
      inventore debitis, dolore tempore dignissimos suscipit facilis? Debitis,
      earum possimus.
    </section>
  );
}
