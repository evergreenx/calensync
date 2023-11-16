// "use client";

import * as React from "react";

import {
  Session,
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import { UpdateProfileModal } from "@/components/ui/dashboard/updateProfileModal";
import { Profiles } from "@/global";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user: Session | any = session;
  const { data } = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.user.id)
    .single();

  return (
    <section className="my-20">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt autem
      error eum quae aperiam? Quidem corporis, quasi similique amet aut
      inventore debitis, dolore tempore dignissimos suscipit facilis? Debitis,
      earum possimus.
      {data?.is_new_user && (
        <UpdateProfileModal
          session={data}
          openState={data.is_new_user}
        ></UpdateProfileModal>
      )}
    </section>
  );
}
