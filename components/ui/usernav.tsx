import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

export async function UserNav() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase.auth.getUser();

  
  console.log(data)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={data.user?.user_metadata.avatar_url} />
              <AvatarFallback>
                {data.user?.user_metadata.name.substring(0,2)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {data.user?.user_metadata.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {data.user?.user_metadata.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {/* <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem> */}

            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form action="/auth/sign-out" method="post">
              <button type="submit">Log out</button>
            </form>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
