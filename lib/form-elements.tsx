import z from "zod";
import {
  TypeIcon,
  TextIcon,
  SquareCheckIcon,
  HashIcon,
  ListIcon,
  CalendarDaysIcon,
} from "lucide-react";
import { FormField } from "./form";

export const fieldType = z.enum([
  "short-input",
  "long-input",
  "checkbox",
  "dropdown",
  "date",
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
  "dropdown",
  "date",
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
    name: "Checkboxes",
  },
  dropdown: {
    type: "dropdown",
    icon: <ListIcon className="h-6 w-6" />,
    name: "Dropdown",
  },
  date: {
    type: "date",
    icon: <CalendarDaysIcon className="h-6 w-6" />,
    name: "Date",
  },
};
