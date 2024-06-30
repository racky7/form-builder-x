import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";

type FormCardProps = {
  name: string;
  slug: string;
  className: string;
};

export default function FormCard({ name, slug, className }: FormCardProps) {
  return (
    <div
      className={cn(
        "relative bg-white rounded-lg mx-4 md:mx-0 shadow-md hover:shadow-lg ",
        className
      )}
    >
      <Link
        href={`/forms/${slug}/edit`}
        className="h-40 text-center flex items-center justify-center"
      >
        <h1 className="text-xl font-light px-2 line-clamp-4">{name}</h1>
      </Link>
      <div className="border-t border-gray-200 flex items-center justify-between py-4 px-1">
        <div>
          <span className="text-xs mx-2 py-1 px-2 text-gray-400 cursor-default inline-block">
            No responses
          </span>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontalIcon className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
