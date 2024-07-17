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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function Page() {
  const params = useParams<{ formSlug: string }>();
  const { data: formData, status } = trpc.builder.getForm.useQuery({
    slug: params.formSlug,
  });

  const collectFormDataMutation =
    trpc.formSubmission.collectFormSubmission.useMutation({
      onSuccess: () => {},
    });

  const form = useForm<any>({
    mode: "all",
    defaultValues: useMemo(() => {
      let defaultValuesObject: Record<string, string> = {};

      if (formData) {
        const fieldsOrder = formData.fieldsOrder as string[];
        fieldsOrder.forEach((fieldId) => {
          defaultValuesObject[fieldId] = "";
        });
      }
      return defaultValuesObject;
    }, [formData]),
    resolver: zodResolver(
      useMemo(() => {
        let validationSchema = z.object({});
        if (formData) {
          console.log(formData);
          const fieldsSchema = formData.fieldsSchema as Record<
            string,
            FormFieldType
          >;
          validationSchema = generateValidationSchema(fieldsSchema);
        }
        return validationSchema;
      }, [formData])
    ),
  });

  const onSubmit = (values: any) => {
    console.log(values);
    collectFormDataMutation.mutate({
      formId: formData?.id!,
      submission: values,
    });
  };

  return match({ status })
    .returnType<React.ReactNode>()
    .with({ status: "loading" }, () => {
      return (
        <div className="w-full h-full flex justify-center items-center bg-primary/10">
          <h1 className="text-xl text-gray-600 font-light text-center">
            Loading...
          </h1>
        </div>
      );
    })
    .with({ status: "error" }, () => {
      return <div />;
    })
    .with({ status: "success" }, () => {
      if (!formData) {
        return (
          <div className="w-full h-full flex flex-col justify-center items-center bg-primary/10">
            <h1 className="text-xl text-gray-600 font-light text-center">
              The form you are looking for is not found.
            </h1>
            <Link href="/" className="mt-6">
              <Button size="lg">Create your own form</Button>
            </Link>
          </div>
        );
      }
      const fieldsOrder = formData.fieldsOrder as string[];
      const fieldsSchema = formData.fieldsSchema as Record<
        string,
        FormFieldType
      >;

      return (
        <div className="bg-primary/10 w-full min-h-screen flex flex-col items-center px-4 md:px-0">
          {collectFormDataMutation.isSuccess ? (
            <div className="w-full max-w-[640px] mt-3 p-4 bg-white rounded-lg border-gray-300 border-t-8 border-primary space-y-4">
              <div className="text-2xl">{formData.name}</div>
              <div className="text-sm">Thanks for responding!</div>
            </div>
          ) : (
            <Form {...form}>
              <div className="w-full max-w-[640px] mt-3 p-4 bg-white rounded-lg border border-gray-300 border-t-8 border-t-primary">
                <div className="text-2xl">{formData.name}</div>
              </div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-3 max-w-[640px] w-full h-full pt-3"
              >
                {fieldsOrder?.map((fieldId) => {
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
                                          <span className="text-red-500">
                                            *
                                          </span>
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
                                          <span className="text-red-500">
                                            *
                                          </span>
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
                    .with("dropdown", () => {
                      invariant(formField.type === "dropdown");
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
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue
                                        placeholder={formField.placeholder}
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {formField.options.map((option) => (
                                      <SelectItem
                                        key={option._id}
                                        value={option.name}
                                      >
                                        {option.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            </div>
                          )}
                        />
                      );
                    })
                    .with(P._, () => null)
                    .exhaustive();
                })}
                <div>
                  <Button
                    disabled={collectFormDataMutation.isLoading}
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      );
    })
    .exhaustive();
}
