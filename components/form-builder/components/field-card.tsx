import { P, match } from "ts-pattern";
import invariant from "tiny-invariant";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/lib/form";
import { GripHorizontalIcon, Trash2Icon, TrashIcon } from "lucide-react";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

type DndDraggableProps = {
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap | undefined;
  setNodeRef?: (node: HTMLElement | null) => void;
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
};

type FieldRendererProps = FormField &
  DndDraggableProps & {
    isActiveField: boolean;
    onMouseDown?: () => void;
    style?: React.CSSProperties;
    onDelete?: () => void;
    fieldId?: string;
  };

export default function FieldCard({
  field,
  name,
  required,
  isActiveField,
  onMouseDown,
  style,
  attributes,
  listeners,
  setNodeRef,
  setActivatorNodeRef,
  onDelete,
  fieldId,
}: FieldRendererProps) {
  invariant(field, "Field not found");

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "w-full bg-white rounded-lg border pt-1 border-gray-300 group",
        isActiveField ? "border-r-8 border-r-primary" : null
      )}
      style={style}
      onMouseDown={() => {
        onMouseDown?.();
      }}
    >
      <div className="w-full h-4 flex group-hover:hidden"></div>
      <div
        className="w-full justify-center cursor-move group-hover:flex hidden"
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
      >
        <GripHorizontalIcon className="h-4 w-4 text-gray-400" />
      </div>
      <div className="space-y-2 px-6 pb-6 cursor-auto">
        <div className="text-sm flex space-x-1">
          <div dangerouslySetInnerHTML={{ __html: name }} />
          {required ? <span className="text-red-500">*</span> : null}
        </div>
        {match(field.type)
          .returnType<React.ReactNode>()
          .with("input", () => {
            invariant(field.type === "input");
            return match(field.inputType)
              .returnType<React.ReactNode>()
              .with("short-input", () => {
                return (
                  <Input
                    placeholder={field.placeholder}
                    readOnly
                    required={required}
                    className="select-none pointer-events-none"
                  />
                );
              })
              .with("long-input", () => {
                return (
                  <Textarea
                    placeholder={field.placeholder}
                    readOnly
                    required={required}
                    className="select-none pointer-events-none"
                  />
                );
              })
              .exhaustive();
          })
          .with("dropdown", () => {
            invariant(field.type === "dropdown");
            return (
              <Select>
                <SelectTrigger className="w-full select-none pointer-events-none text-muted-foreground">
                  <SelectValue
                    placeholder={field.placeholder}
                    className="text-opacity-50"
                  />
                </SelectTrigger>
              </Select>
            );
          })
          .with(P._, () => null)
          .exhaustive()}
      </div>
      {isActiveField ? (
        <>
          <Separator />
          <div className="flex justify-end py-2 px-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={() => {
                    onDelete?.();
                  }}
                >
                  <Trash2Icon className="h-4 w-4 text-gray-700" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Delete</TooltipContent>
            </Tooltip>
          </div>
        </>
      ) : null}
    </div>
  );
}
