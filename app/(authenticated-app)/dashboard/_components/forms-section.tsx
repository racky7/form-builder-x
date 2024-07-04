"use client";

import { trpc } from "@/lib/trpc/client";
import { match } from "ts-pattern";
import FormCard from "./form-card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function FormsSection({
  handleModal,
}: {
  handleModal: (value: boolean) => void;
}) {
  const getUserFormsQuery = trpc.builder.getUserForms.useQuery();

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      {match(getUserFormsQuery)
        .returnType<React.ReactNode>()
        .with({ status: "loading" }, () => {
          return (
            <div className="grid grid-cols-12 mt-7 py-1 gap-6">
              {Array.from({ length: 5 }).map((_, index) => {
                return (
                  <div
                    key={index}
                    className="animate-pulse col-span-12 md:col-span-6 lg:col-span-2 h-44"
                    style={{
                      opacity: 1 - index * 0.1,
                    }}
                  >
                    <div className="h-56 rounded-xl border bg-muted" />
                  </div>
                );
              })}
            </div>
          );
        })
        .with({ status: "error" }, () => {
          return <div>Error</div>;
        })
        .with({ status: "success" }, ({ data }) => {
          return (
            <>
              <div className="grid grid-cols-12 mt-7 py-1 gap-6">
                {data?.map((form) => (
                  <FormCard
                    key={form.id}
                    id={form.id}
                    name={form.name}
                    slug={form.slug}
                    className="col-span-12 md:col-span-6 lg:col-span-2"
                  />
                ))}
              </div>
              {data.length === 0 ? (
                <div className="bg-white w-full rounded-lg px-4 sm:px-6">
                  <p className="py-10 text-center text-sm text-gray-500">
                    No forms created yet.{" "}
                    <Button
                      variant="link"
                      className="p-0 h-auto"
                      onClick={() => {
                        handleModal(true);
                      }}
                    >
                      Create one now
                    </Button>
                  </p>
                </div>
              ) : null}
            </>
          );
        })
        .exhaustive()}
    </div>
  );
}
