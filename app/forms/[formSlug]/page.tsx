"use client";

import { trpc } from "@/lib/trpc/client";
import { useParams } from "next/navigation";
import { P, match } from "ts-pattern";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FormField as FormFieldType,
  generateValidationSchema,
} from "@/lib/form";
import { useMemo } from "react";
import invariant from "tiny-invariant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const params = useParams<{ formSlug: string }>();
  const getFormQuery = trpc.builder.getForm.useQuery({ slug: params.formSlug });

  const form = useForm<any>({
    mode: "all",
    defaultValues: useMemo(() => {
      let defaultValuesObject: Record<string, string> = {};

      if (getFormQuery.data) {
        const fieldsOrder = getFormQuery.data.fieldsOrder as string[];
        fieldsOrder.forEach((fieldId) => {
          defaultValuesObject[fieldId] = "";
        });
      }
      return defaultValuesObject;
    }, [getFormQuery.data]),
    resolver: zodResolver(
      useMemo(() => {
        let validationSchema = z.object({});
        if (getFormQuery.data) {
          const fieldsSchema = getFormQuery.data.fieldsSchema as Record<
            string,
            FormFieldType
          >;
          validationSchema = generateValidationSchema(fieldsSchema);
        }
        return validationSchema;
      }, [getFormQuery.data])
    ),
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-3 max-w-[640px] w-full h-full pt-3"
            >
              {fieldsOrder.map((fieldId) => {
                const {
                  name,
                  field: formField,
                  required,
                } = fieldsSchema[fieldId];
                return match(formField.type)
                  .returnType<React.ReactNode>()
                  .with("input", () => {
                    invariant(formField.type === "input");
                    return match(formField.inputType)
                      .returnType<React.ReactNode>()
                      .with("short-input", () => {
                        return (
                          <FormField
                            control={form.control}
                            key={fieldId}
                            name={fieldId}
                            render={({ field }) => (
                              <div
                                className={cn(
                                  "w-full bg-white rounded-lg border pt-1 border-gray-300",
                                  form.formState.errors[fieldId] !== undefined
                                    ? "border-red-500"
                                    : null
                                )}
                              >
                                <div className="w-full h-4 flex"></div>
                                <FormItem className="space-y-3 px-6 pb-6">
                                  <FormLabel asChild>
                                    <div className="text-sm flex space-x-1">
                                      <div
                                        className="text-gray-700"
                                        dangerouslySetInnerHTML={{
                                          __html: name,
                                        }}
                                      />
                                      {required ? (
                                        <span className="text-red-500">*</span>
                                      ) : null}
                                    </div>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder={formField.placeholder}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              </div>
                            )}
                          />
                        );
                      })
                      .with("long-input", () => {
                        return (
                          <FormField
                            control={form.control}
                            key={fieldId}
                            name={fieldId}
                            render={({ field }) => (
                              <div
                                className={cn(
                                  "w-full bg-white rounded-lg border pt-1 border-gray-300",
                                  form.formState.errors[fieldId] !== undefined
                                    ? "border-red-500"
                                    : null
                                )}
                              >
                                <div className="w-full h-4 flex"></div>
                                <FormItem className="space-y-3 px-6 pb-6">
                                  <FormLabel asChild>
                                    <div className="text-sm flex space-x-1">
                                      <div
                                        className="text-gray-700"
                                        dangerouslySetInnerHTML={{
                                          __html: name,
                                        }}
                                      />
                                      {required ? (
                                        <span className="text-red-500">*</span>
                                      ) : null}
                                    </div>
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      placeholder={formField.placeholder}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              </div>
                            )}
                          />
                        );
                      })
                      .with(P._, () => null)
                      .exhaustive();
                  })
                  .with(P._, () => null)
                  .exhaustive();
              })}
              <div>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      );
    })
    .exhaustive();
}
