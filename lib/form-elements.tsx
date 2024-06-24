import z from "zod";
import { TypeIcon, TextIcon, SquareCheckIcon, HashIcon } from "lucide-react";
import { FormField } from "./form";

export const fieldType = z.enum([
  "short-input",
  "long-input",
  "checkbox",
  "number-input",
  //   "select",
  //   "date",
  //   "dateTime",
  //   "time",
]);
export type FieldType = z.infer<typeof fieldType>;

export type FieldConfig = {
  type: FieldType;
  icon: React.ReactElement;
  name: String;
};

export const FORM_FIELD_ITEMS: FieldType[] = [
  "short-input",
  "long-input",
  "checkbox",
  "number-input",
];

export const FORM_FIELD_CONFIG: Record<FieldType, FieldConfig> = {
  "short-input": {
    type: "short-input",
    icon: <TypeIcon className="h-6 w-6" />,
    name: "Short Text",
  },
  "long-input": {
    type: "long-input",
    icon: <TextIcon className="h-6 w-6" />,
    name: "Paragraph",
  },
  checkbox: {
    type: "checkbox",
    icon: <SquareCheckIcon className="h-6 w-6" />,
    name: "Checkbox",
  },
  "number-input": {
    type: "number-input",
    icon: <HashIcon className="h-6 w-6" />,
    name: "Number",
  },
};
