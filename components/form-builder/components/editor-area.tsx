"use client";

import { cn } from "@/lib/utils";
import { useFormBuilderContext } from "../context";

import { Fragment } from "react";
import FieldDroppable from "./field-droppable";
import SortableFieldCard from "./sortable-field-card";

type EditorAreaProps = {
  className?: string;
};

export default function EditorArea({ className }: EditorAreaProps) {
  const { fieldsOrder, fieldsSchema } = useFormBuilderContext();

  return (
    <div
      className={cn(className, "flex flex-col space-y-3 w-3/4 lg:w-full pt-3")}
    >
      {fieldsOrder.map((fieldId, index) => {
        const { field, required } = fieldsSchema[fieldId];
        return (
          <Fragment key={fieldId}>
            <FieldDroppable size="slot" index={index} className="rounded-lg" />
            <SortableFieldCard key={fieldId} fieldId={fieldId} index={index} />
          </Fragment>
        );
      })}
      {fieldsOrder.length === 0 ? (
        <FieldDroppable size="full-size" index={0} />
      ) : (
        <FieldDroppable size="slot" index={fieldsOrder.length} />
      )}
      <div className="p-1"></div>
    </div>
  );
}
