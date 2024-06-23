import z from "zod";

const field = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("input"),
    inputType: z.enum(["short-input", "long-input"]),
  }),
  z.object({
    type: z.literal("checkbox"),
  }),
  z.object({
    type: z.literal("number-input"),
    min: z.number().optional(),
    max: z.number().optional(),
  }),
  z.object({
    type: z.literal("select"),
    options: z.array(z.object({ _id: z.string(), name: z.string() })).min(1),
  }),
  z.object({
    type: z.literal("date"),
    inputType: z.enum(["date", "dateTime", "time"]),
  }),
]);

const form = z
  .object({
    field,
    name: z.string(),
    required: z.boolean(),
    placeholder: z.string().optional(),
  })
  .array();

export type Form = z.infer<typeof form>;

export const generateValidationSchema = (formSchema: Form) => {
  let validationSchema = z.object({});

  for (const { field, name, required } of formSchema) {
    let validation;
    if (field.type === "input") {
      validation =
        field.inputType === "short-input" ? z.string().max(255) : z.string();
    } else if (field.type === "checkbox") {
      validation = z.boolean();
    } else if (field.type === "select") {
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
        [name]: required ? validation : validation.optional(),
      });
    }
  }

  return validationSchema;
};
