"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Hero from "@/components/hero"

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (


    <>
    
    <Hero />
    
    </>

  )
}
