import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { VariantProps, cva } from "class-variance-authority";
import { RectangleHorizontalIcon } from "lucide-react";
import { useId } from "react";

const droppableVariant = cva(
  'relative z-20 flex items-center justify-center space-x-2 border border-none text-xs text-muted-foreground data-[is-over="true"]:border-dashed data-[is-over="true"]:bg-primary/50 data-[is-over="true"]:px-8 data-[is-over="true"]:py-12 data-[is-over="true"]:text-primary-foreground data-[is-over="true"]:shadow-inner',
  {
    variants: {
      size: {
        "full-size": "h-full",
        slot: "h-0",
      },
    },
    defaultVariants: {
      size: "slot",
    },
  }
);

type FieldDroppableProps = VariantProps<typeof droppableVariant> & {
  index: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function FieldDroppable({
  size,
  index,
  className,
  style,
}: FieldDroppableProps) {
  const id = useId();

  const { setNodeRef, isOver } = useDroppable({
    id: `field-id-${id}`,
    data: { type: "field-droppable", index },
  });
  return (
    <div
      ref={setNodeRef}
      data-is-over={isOver}
      className={cn(droppableVariant({ size }), className)}
      style={style}
    >
      {isOver ? (
        <>
          <RectangleHorizontalIcon className="h-6 w-6" />
          <div>Drop here to add an field</div>
        </>
      ) : null}
    </div>
  );
}
