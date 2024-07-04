import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useFormBuilderContext } from "../context";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

type NavbarProps = {
  formSlug: string;
};

export default function Navbar({ formSlug }: NavbarProps) {
  const { toast } = useToast();
  const { formId, formName, fieldsOrder, fieldsSchema, formSaveStatus } =
    useFormBuilderContext();
  const updateFormMutation = trpc.builder.updateUserForm.useMutation({
    onSuccess: () => {
      toast({
        title: "Form saved successfully",
      });
    },
  });

  const saveText = updateFormMutation.isLoading
    ? "Saving..."
    : formSaveStatus === "SAVED"
    ? "Saved"
    : "Save";

  return (
    <nav className="grid grid-cols-12 bg-white text-gray-700 items-center p-4 border-b border-slate-200">
      <div className="col-span-8 flex items-center">
        <Link
          href="/dashboard"
          className="p-2 block text-primary transition ease-in-out delay-150 hover:-translate-x-1"
        >
          <ArrowLeftIcon />
        </Link>
        <div className="block pl-2 border-l border-gray-200">
          <h1
            className={cn(
              "font-semibold truncate cursor-pointer text-gray-600 hover:border-b hover:border-gray-300",
              formName ? null : "animate-pulse h-5 w-20 bg-gray-100"
            )}
          >
            {formName}
          </h1>
        </div>
      </div>
      <div className="col-span-4 flex space-x-2 justify-end items-center">
        <Link href={`/forms/${formSlug}`} target="_blank">
          <Button variant="ghost">
            <ExternalLinkIcon className="h-4 w-4" />
          </Button>
        </Link>
        <Button
          disabled={formSaveStatus === "SAVED" || updateFormMutation.isLoading}
          onClick={() => {
            updateFormMutation.mutate({
              id: formId!,
              fieldsOrder: fieldsOrder,
              fieldsSchema: fieldsSchema,
            });
          }}
        >
          {saveText}
        </Button>
      </div>
    </nav>
  );
}
