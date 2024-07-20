import { z } from "zod";
import { objectId } from "@/lib/validation";

export const collectFormSubmissionInput = z.object({
  formId: objectId,
  submission: z.record(
    z.string(),
    z.string().optional().or(z.date().optional()).or(z.array(z.string()))
  ),
});

export const getFormSubmissionsInput = z.object({
  formSlug: z.string(),
});
