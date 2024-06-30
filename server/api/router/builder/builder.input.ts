import { z } from "zod";

export const createFormInput = z.object({
  name: z.string(),
});
