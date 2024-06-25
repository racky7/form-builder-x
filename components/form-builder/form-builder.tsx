"use client";

import Navbar from "./components/navbar";
import { FormBuilderContextProvider, useFormBuilderContext } from "./context";
import EditorArea from "./components/editor-area";
import ElementsPane from "./components/elements-pane";
import FieldEditorPane from "./components/field-editor-pane";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useCallback } from "react";
import EditorAreaDroppable from "./components/editor-area-droppable";
import ElementCardOverlay from "./components/element-card-overlay";
import { FieldType } from "@/lib/form-elements";

function BuilderArea() {
  const { addFieldSchema } = useFormBuilderContext();

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
      }
    },
    [addFieldSchema]
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="w-full h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex overflow-y-auto">
          <ElementsPane />
          <EditorAreaDroppable
            className="flex-1 flex justify-center bg-primary/10 overflow-y-auto"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            <EditorArea className="max-w-[660px] h-full" />
          </EditorAreaDroppable>
          <FieldEditorPane />
        </div>
      </div>
      <ElementCardOverlay />
    </DndContext>
  );
}

export default function FormBuilder() {
  return (
    <FormBuilderContextProvider>
      <BuilderArea />
    </FormBuilderContextProvider>
  );
}
