"use client";

import { Button } from "@/components/ui/button";
import Avatar from "boring-avatars";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export default function Navbar({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-semibold text-primary">
            FormBuilderX
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full p-[2px]">
              <Avatar
                size={32}
                name={name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-normal">
                {email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form> */}
        </div>
      </div>
    </nav>
  );
}
