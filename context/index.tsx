"use client";

import { FormField, generateInitialFieldData } from "@/lib/form";
import { FieldType } from "@/lib/form-elements";
import { createContext, useContext, useState } from "react";
import { uid } from "uid";
import invariant from "tiny-invariant";
import { arrayMove } from "@dnd-kit/sortable";
import deepmerge from "deepmerge";
import { Form } from "@prisma/client";

type FormSaveStatus = "DRAFT" | "SAVED";

export type FormBuilderContextType = {
  formId: string | undefined;
  fieldsSchema: Record<string, FormField>;
  addFieldSchema: (type: FieldType, index: number) => void;
  updateFieldSchema: (
    fieldId: string,
    updatedField: Partial<FormField>
  ) => void;

  fieldsOrder: string[];
  updateFieldOrder: (fromIndex: number, toIndex: number) => void;

  activeField: string | undefined;
  setActiveField: (field: string) => void;

  deleteField: (fieldId: string) => void;

  formSaveStatus: FormSaveStatus;
  updateFormSaveStatus: (status: FormSaveStatus) => void;

  loadForm: (data: Form) => void;

  formName: string;
};

export const FormBuilderContext = createContext<
  FormBuilderContextType | undefined
>(undefined);

export const FormBuilderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formId, setFormId] = useState<string | undefined>(undefined);
  const [formName, setFormName] = useState<string>("");
  const [fieldsSchema, setFieldsSchema] = useState<Record<string, FormField>>(
    {}
  );
  const [fieldsOrder, setFieldsOrder] = useState<string[]>([]);
  const [activeField, setActiveField] = useState<string | undefined>(undefined);
  const [formSaveStatus, setFormSaveStatus] = useState<FormSaveStatus>("DRAFT");

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
    setFormSaveStatus("DRAFT");
  };
  const updateFieldSchema = (
    fieldId: string,
    updatedField: Partial<FormField>
  ) => {
    const currentFieldSchema = fieldsSchema[fieldId];
    const updatedFieldSchema = deepmerge(currentFieldSchema, updatedField);
    setFieldsSchema({ ...fieldsSchema, [fieldId]: updatedFieldSchema });
    if (formSaveStatus === "SAVED") {
      setFormSaveStatus("DRAFT");
    }
  };
  const updateFieldOrder = (fromIndex: number, toIndex: number) => {
    setFieldsOrder((prevOrder) => {
      return arrayMove(prevOrder, fromIndex, toIndex);
    });
    setFormSaveStatus("DRAFT");
  };
  const deleteField = (fieldId: string) => {
    const fieldIndex = fieldsOrder.findIndex((id) => id === fieldId);
    if (fieldsOrder.length > 1) {
      const newIndex =
        fieldIndex === 0 ? 1 : fieldIndex === 1 ? 0 : fieldIndex - 1;
      setActiveField(fieldsOrder[newIndex]);
    } else {
      setActiveField(undefined);
    }
    setFieldsOrder((prevOrder) => prevOrder.filter((id) => id !== fieldId));
    const currentFieldSchema = { ...fieldsSchema };
    delete currentFieldSchema[fieldId];
    setFieldsSchema(currentFieldSchema);
  };
  const updateFormSaveStatus = (status: FormSaveStatus) => {
    setFormSaveStatus(status);
  };

  const loadForm = (data: Form) => {
    const fieldsSchema = data.fieldsSchema as Record<string, FormField>;
    const fieldsOrder = data.fieldsOrder as string[];
    setActiveField(fieldsOrder[0] ?? undefined);
    setFormName(data.name);
    setFieldsSchema(fieldsSchema);
    setFieldsOrder(fieldsOrder);
    setFormId(data.id);
    setFormSaveStatus("SAVED");
  };

  return (
    <FormBuilderContext.Provider
      value={{
        formId,
        fieldsSchema,
        updateFieldOrder,
        updateFieldSchema,
        fieldsOrder,
        addFieldSchema,
        activeField,
        setActiveField,
        deleteField,
        formSaveStatus,
        updateFormSaveStatus,
        loadForm,
        formName,
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
