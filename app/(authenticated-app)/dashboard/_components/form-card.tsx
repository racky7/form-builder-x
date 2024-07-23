import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { trpc } from "@/lib/trpc/client";
import { useToast } from "@/components/ui/use-toast";

type FormCardProps = {
  id: string;
  name: string;
  slug: string;
  responses: number;
  className: string;
};

export default function FormCard({
  id,
  name,
  slug,
  responses,
  className,
}: FormCardProps) {
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const deleteFormMutation = trpc.builder.deleteForm.useMutation({
    onSuccess: () => {
      utils.builder.getUserForms.invalidate();
      toast({
        title: "Form Deleted Successfully",
      });
    },
  });

  return (
    <div
      className={cn(
        "relative bg-white rounded-lg mx-4 md:mx-0 shadow-md hover:shadow-lg ",
        className
      )}
    >
      <Link
        href={`/form/${slug}/edit`}
        className="h-40 text-center flex items-center justify-center"
      >
        <h1 className="text-xl font-light px-2 line-clamp-4">{name}</h1>
      </Link>
      <div className="border-t border-gray-200 flex items-center justify-between py-4 px-1">
        <div>
          {responses === 0 ? (
            <span className="text-xs mx-2 py-1 px-2 text-gray-400 cursor-default inline-block">
              No responses
            </span>
          ) : (
            <Link
              href={`/form/${slug}/submissions`}
              className="text-gray-500 inline-block mx-2 text-xs py-1 px-2 hover:bg-gray-200 rounded"
            >
              {responses} responses
            </Link>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontalIcon className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              disabled={deleteFormMutation.isLoading}
              onClick={() => {
                deleteFormMutation.mutate({ id });
              }}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/forms/${slug}`} target="_blank">
                Open Form Page
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Copy Form Link</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
