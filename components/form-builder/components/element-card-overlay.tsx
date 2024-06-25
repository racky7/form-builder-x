import { FORM_FIELD_CONFIG, FieldType } from "@/lib/form-elements";
import { DragOverlay as DndDragOverlay, useDndContext } from "@dnd-kit/core";
import { useMemo } from "react";

export default function ElementCardOverlay() {
  const { active } = useDndContext();

  const elementType: FieldType | undefined = useMemo(() => {
    return active?.data?.current?.elementType;
  }, [active]);

  return (
    <DndDragOverlay>
      {elementType ? (
        <div className="relative h-fit w-30 flex flex-col p-2 justify-center items-center select-none overflow-hidden rounded-md border text-sm bg-white">
          {FORM_FIELD_CONFIG[elementType].icon}
          {FORM_FIELD_CONFIG[elementType].name}
        </div>
      ) : null}
    </DndDragOverlay>
  );
}
