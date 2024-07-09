"use client";

import { useParams } from "next/navigation";
import { trpc } from "@/lib/trpc/client";
import { useEffect } from "react";
import { useFormBuilderContext } from "@/context";
import Navbar from "./navbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const params = useParams<{ formSlug: string }>();
  const getFormDataQuery = trpc.builder.getUserForm.useQuery({
    slug: params.formSlug,
  });
  const { loadForm } = useFormBuilderContext();

  useEffect(() => {
    if (getFormDataQuery.data) {
      loadForm(getFormDataQuery.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFormDataQuery.data]);

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar formSlug={params.formSlug} />
      {children}
    </div>
  );
}
