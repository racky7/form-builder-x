"use client"

import { useRouter } from "next/navigation";

type LoginButtonProps = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

export default function LoginButton({
  children,
  mode = "redirect",
}: LoginButtonProps) {

    const router = useRouter()

  if (mode === "modal") {
    return <div>Show Modal</div>;
  }

  const login = () => {
    router.push('/auth/login')
  }

  return <span onClick={login}>{children}</span>;
}
