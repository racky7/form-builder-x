"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

type CardWrapperProps = {
  headerLabel: string;
  backbuttonhref: string;
  backbuttonlabel: string;
  children: React.ReactNode;
};

export default function CardWrapper({
  children,
  headerLabel,
  backbuttonhref,
  backbuttonlabel,
}: CardWrapperProps) {
  return (
    <>
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            {/* <h1 className="text-3xl font-semibold">Login</h1> */}
            {headerLabel}
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={() => {
              signIn("google", {
                callbackUrl: DEFAULT_LOGIN_REDIRECT,
              });
            }}
          >
            <FcGoogle className="h-5 w-5" />
          </Button>
        </CardFooter>
        <CardFooter>
          <Button className="font-normal w-full" variant="link" asChild>
            <Link href={backbuttonhref}>{backbuttonlabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
