"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { queryClient, trpc, trpcClient } from "@/lib/trpc/client";

type ProviderProps = {
  session?: Session | null;
  children: React.ReactNode;
};

export default function Provider({ session, children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </trpc.Provider>
    </QueryClientProvider>
  );
}
