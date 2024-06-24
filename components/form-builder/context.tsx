"use client";

import { FormField, generateInitialFieldData } from "@/lib/form";
import { FieldType } from "@/lib/form-elements";
import { createContext, Dispatch, useContext, useState } from "react";
import { uid } from "uid";
import invariant from "tiny-invariant";

export type FormBuilderContextType = {
  fieldsSchema: Record<string, FormField>;
  addFieldSchema: (type: FieldType) => void;

  fieldsOrder: string[];

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

  const addFieldSchema = (type: FieldType) => {
    const fieldId = uid();
    setFieldsSchema((prev) => ({
      ...prev,
      [fieldId]: generateInitialFieldData(type),
    }));
    setFieldsOrder((prev) => [...prev, fieldId]);
    setActiveField(fieldId);
  };
  const updateFieldSchema = () => {};
  const updateFieldOrder = () => {};

  return (
    <FormBuilderContext.Provider
      value={{
        fieldsSchema,
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
