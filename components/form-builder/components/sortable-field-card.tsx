"use client";

import { useFormBuilderContext } from "../context";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FieldCard from "./field-card";

type SortableFieldCardProps = {
  fieldId: string;
  index: number;
};

export default function SortableFieldCard({
  fieldId,
  index,
}: SortableFieldCardProps) {
  const { activeField, setActiveField, fieldsSchema } = useFormBuilderContext();
  const isActiveField = activeField === fieldId;

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    isDragging,
    transition,
  } = useSortable({
    id: `sortable-field-${fieldId}`,
    data: {
      type: "sortable-field",
      fieldData: fieldsSchema[fieldId],
      isActiveField,
      index,
    },
  });

  const dndStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  const handleMouseDown = () => {
    if (!isDragging) {
      setActiveField(fieldId);
    }
  };

  return (
    <FieldCard
      {...fieldsSchema[fieldId]}
      isActiveField={isActiveField}
      onMouseDown={handleMouseDown}
      style={dndStyle}
      attributes={attributes}
      listeners={listeners}
      setNodeRef={setNodeRef}
      setActivatorNodeRef={setActivatorNodeRef}
    />
  );
}
