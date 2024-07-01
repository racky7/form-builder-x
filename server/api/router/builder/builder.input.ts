import { objectId } from "@/lib/validation";
import { z } from "zod";

export const createFormInput = z.object({
  name: z.string(),
});

export const restoreOrDeleteFormInput = z.object({
  id: objectId,
});
