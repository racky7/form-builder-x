import z from "zod";
import { FieldType } from "./form-elements";
import { uid } from "uid";

const field = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("input"),
    inputType: z.enum(["short-input", "long-input"]),
    placeholder: z.string(),
  }),
  z.object({
    type: z.literal("checkbox"),
  }),
  z.object({
    type: z.literal("number-input"),
    min: z.number().optional(),
    max: z.number().optional(),
    placeholder: z.string(),
  }),
  z.object({
    type: z.literal("dropdown"),
    options: z.array(z.object({ _id: z.string(), name: z.string() })).min(1),
    placeholder: z.string(),
  }),
  z.object({
    type: z.literal("date"),
    inputType: z.enum(["date", "dateTime", "time"]),
  }),
]);

export const formField = z.object({
  field,
  name: z.string(),
  required: z.boolean(),
});
export type FormField = z.infer<typeof formField>;

const form = formField.array();
export type Form = z.infer<typeof form>;

export const generateValidationSchema = (
  fieldsSchema: Record<string, FormField>
) => {
  let validationSchema = z.object({});

  for (const [id, { field, required }] of Object.entries(fieldsSchema)) {
    let validation;
    if (field.type === "input") {
      validation =
        field.inputType === "short-input" ? z.string().max(255) : z.string();
    } else if (field.type === "checkbox") {
      validation = z.boolean();
    } else if (field.type === "dropdown") {
      const options = field.options.map((item) => item.name) as [
        string,
        ...string[]
      ];
      validation = z.enum(options);
    } else if (field.type === "number-input") {
      validation = z.number();
      if (typeof field.min === "number") {
        validation = validation.min(field.min);
      }
      if (typeof field.max === "number") {
        validation = validation.max(field.max);
      }
    }

    if (validation) {
      validationSchema = validationSchema.extend({
        [id]: required ? validation : validation.optional(),
      });
    }
  }

  return validationSchema;
};

export const generateInitialFieldData = (type: FieldType) => {
  let initialData: FormField;
  switch (type) {
    case "short-input": {
      initialData = {
        name: "<p>Short Text</p>",
        field: {
          type: "input",
          inputType: "short-input",
          placeholder: "Short text response",
        },
        required: false,
      };
      break;
    }
    case "long-input": {
      initialData = {
        name: "Long Text",
        field: {
          type: "input",
          inputType: "long-input",
          placeholder: "Long text response",
        },
        required: false,
      };
      break;
    }
    case "checkbox": {
      initialData = {
        name: "Checkbox",
        field: {
          type: "checkbox",
        },
        required: false,
      };
      break;
    }
    case "number-input": {
      initialData = {
        name: "Number",
        field: {
          type: "number-input",
          placeholder: "1234567890",
        },
        required: false,
      };
      break;
    }
    case "dropdown": {
      initialData = {
        name: "Dropdown",
        field: {
          type: "dropdown",
          options: [
            { _id: uid(), name: "Option 1" },
            { _id: uid(), name: "Option 2" },
          ],
          placeholder: "Please select an option",
        },
        required: false,
      };
      break;
    }
    default:
      throw new Error(`Unsupported field type: ${type}`);
  }

  return initialData;
};

export const submissionsDataConfig = z.array(
  z.object({
    submission: z.record(z.string(), z.string().nullable()),
    // submitted_at: z.date(),
  })
);
