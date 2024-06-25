import { FORM_FIELD_CONFIG, FieldType } from "@/lib/form-elements";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useId } from "react";

type ElementCardProps = {
  className?: string;
  elementType: FieldType;
};

export default function ElementCard({
  className,
  elementType,
}: ElementCardProps) {
  const id = useId();
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: `element-card-${id}`,
    data: {
      type: "element-card",
      elementType,
    },
  });

  return (
    <button
      ref={setNodeRef}
      className={cn(
        "relative h-20 w-full select-none overflow-hidden rounded-md border",
        className
      )}
      {...listeners}
      {...attributes}
    >
      {FORM_FIELD_CONFIG[elementType].icon}
      {FORM_FIELD_CONFIG[elementType].name}
    </button>
  );
}
