"use client";

import { FORM_FIELD_CONFIG, FORM_FIELD_ITEMS } from "@/lib/form-elements";
import React, { useContext } from "react";
import {
  FormBuilderContext,
  FormBuilderContextType,
  useFormBuilderContext,
} from "../context";

export default function ElementsPane() {
  const { addFieldSchema } = useFormBuilderContext();

  return (
    <div className="h-fit w-72 border-r p-4 grid grid-cols-2 gap-4">
      {FORM_FIELD_ITEMS.map((type) => {
        return (
          <div
            key={`field-${type}`}
            className="col-span-1 flex flex-col items-center h-fit w-full border p-2 cursor-pointer text-sm"
            onClick={() => {
              addFieldSchema(type);
            }}
          >
            {FORM_FIELD_CONFIG[type].icon}
            {FORM_FIELD_CONFIG[type].name}
          </div>
        );
      })}
    </div>
  );
}
