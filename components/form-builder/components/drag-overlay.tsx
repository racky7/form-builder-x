import { FormField } from "@/lib/form";
import { FORM_FIELD_CONFIG, FieldType } from "@/lib/form-elements";
import { DragOverlay as DndDragOverlay, useDndContext } from "@dnd-kit/core";
import { useMemo } from "react";
import { P, match } from "ts-pattern";
import FieldCard from "./field-card";

export default function DragOverlay() {
  const { active } = useDndContext();
  const activeData = useMemo(() => {
    return active?.data?.current;
  }, [active]);

  const activeType: "element-card" | "sortable-field" | undefined =
    activeData?.type;

  return (
    <DndDragOverlay>
      {match(activeType)
        .returnType<React.ReactNode>()
        .with("element-card", () => {
          const elementType: FieldType | undefined = activeData?.elementType;
          return elementType ? (
            <div className="relative h-fit w-30 flex flex-col p-2 justify-center items-center select-none overflow-hidden rounded-md border text-sm bg-white">
              {FORM_FIELD_CONFIG[elementType].icon}
              {FORM_FIELD_CONFIG[elementType].name}
            </div>
          ) : null;
        })
        .with("sortable-field", () => {
          const fieldData: FormField = activeData?.fieldData;
          const isActiveField: boolean = activeData?.isActiveField;

          return fieldData ? (
            <FieldCard
              {...fieldData}
              isActiveField={isActiveField}
              style={{ opacity: 0.7 }}
            />
          ) : null;
        })
        .with(P._, () => null)
        .exhaustive()}
    </DndDragOverlay>
  );
}
