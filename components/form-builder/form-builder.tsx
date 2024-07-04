"use client";

import Navbar from "./components/navbar";
import { FormBuilderContextProvider, useFormBuilderContext } from "./context";
import EditorArea from "./components/editor-area";
import ElementsPane from "./components/elements-pane";
import FieldEditorPane from "./components/field-editor-pane";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCallback, useEffect } from "react";
import EditorAreaDroppable from "./components/editor-area-droppable";
import DragOverlay from "./components/drag-overlay";
import { FieldType } from "@/lib/form-elements";
import { collisonDetection } from "@/lib/dnd";
import { TooltipProvider } from "../ui/tooltip";
import { trpc } from "@/lib/trpc/client";
import { useParams } from "next/navigation";

function BuilderArea() {
  const params = useParams<{ formSlug: string }>();
  const getFormDataQuery = trpc.builder.getUserForm.useQuery({
    slug: params.formSlug,
  });

  const { addFieldSchema, fieldsOrder, updateFieldOrder, loadForm } =
    useFormBuilderContext();

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      const activeData = active?.data?.current;
      const overData = over?.data?.current;
      if (
        activeData &&
        activeData.type === "element-card" &&
        overData &&
        overData.type === "field-droppable"
      ) {
        const elementType: FieldType = activeData.elementType;
        const index: number = overData.index;
        addFieldSchema(elementType, index);
      } else if (
        activeData &&
        activeData.type === "sortable-field" &&
        overData &&
        overData.type === "sortable-field"
      ) {
        const activeIndex = activeData.index;
        const overIndex = overData.index;
        updateFieldOrder(activeIndex, overIndex);
      }
    },
    [addFieldSchema, updateFieldOrder]
  );

  useEffect(() => {
    if (getFormDataQuery.data) {
      loadForm(getFormDataQuery.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFormDataQuery.data]);

  return (
    <DndContext
      id="unique-dnd-context-id"
      onDragEnd={handleDragEnd}
      collisionDetection={collisonDetection}
    >
      <div className="w-full h-screen flex flex-col">
        <Navbar formSlug={params.formSlug} />
        <div className="flex-1 flex overflow-y-auto">
          <ElementsPane />
          <SortableContext
            items={fieldsOrder.map((fieldId) => `sortable-field-${fieldId}`)}
            strategy={verticalListSortingStrategy}
          >
            <EditorAreaDroppable
              className="flex-1 flex justify-center bg-primary/10 overflow-y-auto"
              style={{ transform: "translate3d(0, 0, 0)" }}
            >
              <EditorArea
                className="max-w-[660px] h-full"
                isLoading={getFormDataQuery.isLoading}
              />
            </EditorAreaDroppable>
          </SortableContext>
          <FieldEditorPane />
        </div>
      </div>
      <DragOverlay />
    </DndContext>
  );
}

export default function FormBuilder() {
  return (
    <FormBuilderContextProvider>
      <TooltipProvider>
        <BuilderArea />
      </TooltipProvider>
    </FormBuilderContextProvider>
  );
}
