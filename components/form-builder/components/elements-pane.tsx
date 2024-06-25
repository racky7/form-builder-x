"use client";

import { FORM_FIELD_CONFIG, FORM_FIELD_ITEMS } from "@/lib/form-elements";
import React, { useContext } from "react";
import { useFormBuilderContext } from "../context";
import ElementCard from "./element-card";

export default function ElementsPane() {
  const { addFieldSchema } = useFormBuilderContext();

  return (
    <div className="h-fit w-72 border-r p-4 grid grid-cols-2 gap-4">
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
  );
}
