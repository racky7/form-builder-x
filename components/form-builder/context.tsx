"use client";

import { FormField, generateInitialFieldData } from "@/lib/form";
import { FieldType } from "@/lib/form-elements";
import { createContext, useContext, useState } from "react";
import { uid } from "uid";
import invariant from "tiny-invariant";
import { arrayMove } from "@dnd-kit/sortable";

export type FormBuilderContextType = {
  fieldsSchema: Record<string, FormField>;
  addFieldSchema: (type: FieldType, index: number) => void;

  fieldsOrder: string[];
  updateFieldOrder: (fromIndex: number, toIndex: number) => void;

  activeField: string | undefined;
  setActiveField: (field: string) => void;
};

export const FormBuilderContext = createContext<
  FormBuilderContextType | undefined
>(undefined);

export const FormBuilderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fieldsSchema, setFieldsSchema] = useState<Record<string, FormField>>(
    {}
  );
  const [fieldsOrder, setFieldsOrder] = useState<string[]>([]);
  const [activeField, setActiveField] = useState<string | undefined>(undefined);

  const addFieldSchema = (type: FieldType, index: number) => {
    const fieldId = uid();
    setFieldsSchema((prev) => ({
      ...prev,
      [fieldId]: generateInitialFieldData(type),
    }));
    setFieldsOrder((prev) => {
      const currentOrder = [...prev];
      currentOrder.splice(index, 0, fieldId);
      return currentOrder;
    });
    setActiveField(fieldId);
  };
  const updateFieldSchema = () => {};
  const updateFieldOrder = (fromIndex: number, toIndex: number) => {
    setFieldsOrder((prevOrder) => {
      return arrayMove(prevOrder, fromIndex, toIndex);
    });
  };

  return (
    <FormBuilderContext.Provider
      value={{
        fieldsSchema,
        updateFieldOrder,
        fieldsOrder,
        addFieldSchema,
        activeField,
        setActiveField,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};

export function useFormBuilderContext() {
  const builderContext = useContext(FormBuilderContext);
  invariant(
    builderContext,
    "useFormBuilderContext must be used within a FormBuilderContext"
  );
  return builderContext;
}
