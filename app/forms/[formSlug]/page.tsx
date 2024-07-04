"use client";

import { trpc } from "@/lib/trpc/client";
import { useParams } from "next/navigation";
import { match } from "ts-pattern";

export default function Page() {
  const params = useParams<{ formSlug: string }>();
  const getFormQuery = trpc.builder.getForm.useQuery({ slug: params.formSlug });
  return (
    <div>
      {match(getFormQuery)
        .returnType<React.ReactNode>()
        .with({ status: "loading" }, () => {
          return <div />;
        })
        .with({ status: "error" }, () => {
          return <div />;
        })
        .with({ status: "success" }, () => {
          return <div>Form Renderer</div>;
        })
        .exhaustive()}
    </div>
  );
}
