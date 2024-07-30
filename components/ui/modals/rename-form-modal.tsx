"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "../use-toast";

const renameFormConfig = z.object({
  name: z.string(),
});

export default function RenameFormModal({
  formData,
  open,
  handleModal,
}: {
  formData: { id: string; name: string; slug: string };
  open: boolean;
  handleModal: (value: boolean) => void;
}) {
  const router = useRouter();
  const utils = trpc.useUtils();
  const updateFormMutation = trpc.builder.updateUserForm.useMutation({
    onSuccess: (data) => {
      handleModal(false);
      utils.builder.getUserForms.invalidate();
      toast({
        title: "Form Renamed Successfully",
      });
    },
  });
  const form = useForm<z.infer<typeof renameFormConfig>>();

  useEffect(() => {
    form.setValue("name", formData.name);
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          handleModal(value);
          form.reset();
        }}
      >
        <DialogContent
          showCloseButton={false}
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(({ name }) => {
                updateFormMutation.mutate({ id: formData.id, name });
              })}
            >
              <DialogHeader className="space-y-3 pb-4">
                <DialogTitle>Rename Form</DialogTitle>
                <DialogDescription>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleModal?.(false);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  disabled={
                    !form.formState.isDirty || updateFormMutation.isLoading
                  }
                  type="submit"
                >
                  Rename
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
