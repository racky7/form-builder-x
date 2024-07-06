"use client";

import { trpc } from "@/lib/trpc/client";
import { useParams } from "next/navigation";
import { match } from "ts-pattern";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  FormField as FormFieldType,
  generateValidationSchema,
} from "@/lib/form";
import { useEffect, useRef } from "react";
import { Form as FormType } from "@prisma/client";

export default function Page() {
  const params = useParams<{ formSlug: string }>();
  const getFormQuery = trpc.builder.getForm.useQuery({ slug: params.formSlug });
  const fieldRefs = useRef<{ [key: string]: string }>({});

  useEffect(() => {
    if (getFormQuery.data) {
    }
  }, [getFormQuery.data]);

  return match(getFormQuery)
    .returnType<React.ReactNode>()
    .with({ status: "loading" }, () => {
      return <div />;
    })
    .with({ status: "error" }, () => {
      return <div />;
    })
    .with({ status: "success" }, () => {
      const fieldsOrder = getFormQuery.data?.fieldsOrder as string[];
      const fieldsSchema = getFormQuery.data?.fieldsSchema as Record<
        string,
        FormFieldType
      >;

      return (
        <div className="bg-primary/10 w-full min-h-screen flex justify-center">
          <form className="flex flex-col space-y-3 max-w-[640px] w-full h-full pt-3">
            {fieldsOrder.map((fieldId) => {
              const { name } = fieldsSchema[fieldId];
              return (
                <div
                  key={fieldId}
                  className="w-full bg-white rounded-lg border pt-1 border-gray-300 h-28"
                >
                  <div className="w-full h-4 flex"></div>
                  <div className="space-y-2 px-6 pb-6">
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{ __html: name }}
                    />
                  </div>
                </div>
              );
            })}
          </form>
        </div>
      );
    })
    .exhaustive();
}
