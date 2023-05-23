// "use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import { UpdateProfileModal } from "@/components/ui/dashboard/updateProfileModal";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from("profiles").select();

  

  const handleNewUser  = (profiles:any ) => {
    if (!profiles || !Array.isArray(profiles)) {
      // Handle the case where profiles is not available or not an array
      return [];
    }

    return profiles.some((profile) => profile && profile.is_new_user === true);
  };

  console.log(handleNewUser(data));

  return (
    <section className="my-20">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt autem
      error eum quae aperiam? Quidem corporis, quasi similique amet aut
      inventore debitis, dolore tempore dignissimos suscipit facilis? Debitis,
      earum possimus.
      {handleNewUser(data) && (
        <UpdateProfileModal
          openState={handleNewUser(data)}
        ></UpdateProfileModal>
      )}
    </section>
  );
}
