"use client";

import { FORM_FIELD_CONFIG, FORM_FIELD_ITEMS } from "@/lib/form-elements";
import React, { useContext } from "react";
import ElementCard from "./element-card";
import { useFormBuilderContext } from "@/context";

export default function ElementsPane() {
  const { addFieldSchema } = useFormBuilderContext();

  return (
    <div className="h-full w-72 border-r">
      <div className="p-4 grid grid-cols-2 gap-4">
        {FORM_FIELD_ITEMS.map((type) => {
          return (
            <ElementCard
              key={`field-${type}`}
              className="col-span-1 flex flex-col items-center h-fit w-full border p-2 cursor-pointer text-sm"
              elementType={type}
            />
          );
        })}
      </div>
    </div>
  );
}
