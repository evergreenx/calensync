"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UpdateProfileForm } from "./updateProfileForm";
import { Database } from "@/lib/database.types";

interface ModalType {
  openState: boolean | never[];
  data: any
}

export function UpdateProfileModal({ openState , data }: ModalType) {
  const [open, setOpen] = useState<any>(openState);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update your profile?</AlertDialogTitle>
        </AlertDialogHeader>

        <UpdateProfileForm data={data} />
        {/* <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
