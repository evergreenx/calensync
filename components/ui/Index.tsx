import React from "react";
import HeaderClient from "./header";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
// import { Database } from "@/lib/db.types";

const links = ["Find Talent", "For Designers", "Learn Design", "Go Pro"];

export const dynamic = "force-dynamic";

async function Index() {
  const supabase = createServerComponentClient<any>({ cookies });

  const { data } = await supabase.auth.getSession();

  console.log(data)


  return (
    <div>
      {" "}
      {/* <HeaderClient data={data} /> */}

      <HeaderClient/>
    </div>
  );
}

export default Index;
