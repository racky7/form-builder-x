import { formField } from "@/lib/form";
import { objectId } from "@/lib/validation";
import { z } from "zod";

export const getUserFormInput = z.object({
  slug: z.string(),
});

export const createFormInput = z.object({
  name: z.string(),
});

export const updateFormInput = z.object({
  id: objectId,
  name: z.string().optional(),
  fieldsSchema: z.record(z.string(), formField).optional(),
  fieldsOrder: z.array(z.string()).optional(),
  saveStatus: z.enum(["SAVED", "DRAFT"]).optional(),
});

export const restoreOrDeleteFormInput = z.object({
  id: objectId,
});
