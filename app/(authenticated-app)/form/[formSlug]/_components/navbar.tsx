"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import {
  ArrowLeftIcon,
  BlocksIcon,
  ExternalLinkIcon,
  Table2Icon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useFormBuilderContext } from "@/context";
import { usePathname } from "next/navigation";
import { useState } from "react";
import RenameFormModal from "@/components/ui/modals/rename-form-modal";

type NavbarProps = {
  formSlug: string;
};

export default function Navbar({ formSlug }: NavbarProps) {
  const pathname = usePathname();
  const { toast } = useToast();
  const { fieldsOrder, fieldsSchema, formSaveStatus } = useFormBuilderContext();
  const [renameFormOpen, setRenameFormOpen] = useState(false);
  const updateFormMutation = trpc.builder.updateUserForm.useMutation({
    onSuccess: () => {
      toast({
        title: "Form saved successfully",
      });
    },
  });

  const utils = trpc.useUtils();
  const formData = utils.builder.getUserForm.getData({ slug: formSlug });

  const saveText = updateFormMutation.isLoading
    ? "Saving..."
    : formSaveStatus === "SAVED"
    ? "Saved"
    : "Save";

  return (
    <>
      <nav className="grid grid-cols-12 bg-white text-gray-700 items-center p-4 border-b border-slate-200">
        <div className="col-span-4 flex items-center">
          <Link
            href="/dashboard"
            className="p-2 block text-primary transition ease-in-out delay-150 hover:-translate-x-1"
          >
            <ArrowLeftIcon />
          </Link>
          <button
            className="block pl-2 border-l border-gray-200"
            onClick={() => {
              setRenameFormOpen(true);
            }}
          >
            <h1
              className={cn(
                "font-semibold truncate cursor-pointer text-gray-600 hover:border-b hover:border-gray-300",
                formData?.name ? null : "animate-pulse h-5 w-20 bg-gray-100"
              )}
            >
              {formData?.name}
            </h1>
          </button>
        </div>
        <div className="col-span-4 grid grid-cols-2 content-center space-x-2 font-medium p-1 rounded-lg bg-slate-50">
          <Link
            href="edit"
            className={cn(
              "inline-block text-xs text-center cursor-pointer hover:bg-slate-200 font-semibold px-2 py-1 rounded-lg transition-all",
              pathname.includes("edit") ? "text-blue-600 bg-white" : null
            )}
          >
            <BlocksIcon className="h-4 w-4 mx-auto text-blue-600" />
            <span className="pt-1">Builder</span>
          </Link>
          <Link
            href="submissions"
            className={cn(
              "inline-block text-xs text-center cursor-pointer hover:bg-slate-200 font-semibold px-2 py-1 rounded-lg transition-all",
              pathname.includes("submissions")
                ? "text-green-600 bg-white"
                : null
            )}
          >
            <Table2Icon className="h-4 w-4 mx-auto text-green-600" />
            Submissions
          </Link>
        </div>
        <div className="col-span-4 flex space-x-2 justify-end items-center">
          <Link href={`/forms/${formData?.slug}`} target="_blank">
            <Button variant="ghost">
              <ExternalLinkIcon className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            disabled={
              formSaveStatus === "SAVED" || updateFormMutation.isLoading
            }
            onClick={() => {
              updateFormMutation.mutate({
                id: formData?.id!,
                fieldsOrder: fieldsOrder,
                fieldsSchema: fieldsSchema,
              });
            }}
          >
            {saveText}
          </Button>
        </div>
      </nav>
      <RenameFormModal
        open={renameFormOpen}
        handleModal={setRenameFormOpen}
        formData={{
          id: formData?.id ?? "",
          name: formData?.name ?? "",
        }}
      />
    </>
  );
}
