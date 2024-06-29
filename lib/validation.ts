import { z } from "zod";

export const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/);
