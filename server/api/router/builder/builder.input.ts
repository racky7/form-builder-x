import { objectId } from "@/lib/validation";
import { z } from "zod";

export const getUserFormInput = z.object({
  slug: z.string(),
});

export const createFormInput = z.object({
  name: z.string(),
});

export const restoreOrDeleteFormInput = z.object({
  id: objectId,
});
