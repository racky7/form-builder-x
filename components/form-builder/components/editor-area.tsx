"use client";

import { cn } from "@/lib/utils";

import { Fragment } from "react";
import FieldDroppable from "./field-droppable";
import SortableFieldCard from "./sortable-field-card";
import { useFormBuilderContext } from "@/context";

type EditorAreaProps = {
  className?: string;
  isLoading?: boolean;
};

export default function EditorArea({ className, isLoading }: EditorAreaProps) {
  const { fieldsOrder } = useFormBuilderContext();

  return (
    <div
      className={cn(className, "flex flex-col space-y-3 w-3/4 lg:w-full pt-3")}
    >
      {isLoading ? (
        <div />
      ) : (
        fieldsOrder.map((fieldId, index) => {
          return (
            <Fragment key={fieldId}>
              <FieldDroppable
                size="slot"
                index={index}
                className="rounded-lg"
              />
              <SortableFieldCard
                key={fieldId}
                fieldId={fieldId}
                index={index}
              />
            </Fragment>
          );
        })
      )}
      {fieldsOrder.length === 0 ? (
        <FieldDroppable size="full-size" index={0} />
      ) : (
        <FieldDroppable size="slot" index={fieldsOrder.length} />
      )}
      <div className="p-1"></div>
    </div>
  );
}
