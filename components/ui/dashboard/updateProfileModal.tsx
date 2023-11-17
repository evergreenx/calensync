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
import { Profiles } from "@/global";

interface ModalType {
  openState: boolean | never[];
  session: Profiles;
}

export function UpdateProfileModal({ openState, session }: ModalType) {
  const [open, setOpen] = useState<any>(openState);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update your profile?</AlertDialogTitle>
        </AlertDialogHeader>

        <UpdateProfileForm setOpenModal={setOpen} session={session} />
    
      </AlertDialogContent>
    </AlertDialog>
  );
}
