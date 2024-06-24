"use client";

import TiptapEditor from "@/components/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GripHorizontal } from "lucide-react";
import { useFormBuilderContext } from "../context";
import { cn } from "@/lib/utils";

type FieldCardProps = {
  children: React.ReactNode;
  fieldId: string;
};

export default function FieldCard({ children, fieldId }: FieldCardProps) {
  const { activeField, setActiveField } = useFormBuilderContext();
  const isActiveField = activeField === fieldId;

  return (
    <div
      className={cn(
        "w-full bg-white rounded-lg border pt-1 border-gray-300 group",
        isActiveField ? "border-r-8 border-r-primary" : null
      )}
    >
      <div className="w-full h-4 flex group-hover:hidden"></div>
      <div className="w-full justify-center cursor-move group-hover:flex hidden">
        <GripHorizontal className="h-4 w-4 text-gray-400" />
      </div>
      <div
        className="space-y-2 px-6 pb-6"
        onMouseDown={() => {
          setActiveField(fieldId);
        }}
      >
        <Label className="select-none">Field Name</Label>
        {children}
      </div>
    </div>
  );
}
