import { z } from "zod";
import {
  collectFormSubmissionInput,
  getFormSubmissionsInput,
} from "./submission.input";
import { prisma } from "@/server/db";
import { Session } from "next-auth";
import { TRPCError } from "@trpc/server";
import { Form } from "@prisma/client";

export async function collectFormSubmission(
  input: z.infer<typeof collectFormSubmissionInput>
) {
  const currentForm = await prisma.form.findUnique({
    where: {
      id: input.formId,
    },
  });
  if (!currentForm) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Form does not exist for this user",
    });
  }
  const formFields = currentForm.fieldsOrder as string[];
  const submissionData = formFields.reduce((acc, fieldId) => {
    return { ...acc, [fieldId]: input.submission[fieldId] ?? null };
  }, {} as { [fieldId: string]: string | string[] | Date | null });
  return prisma.formSubmission.create({
    data: {
      formId: input.formId,
      submission: submissionData,
      submitted_at: new Date(),
    },
  });
}

export async function getFormSubmissions(
  input: z.infer<typeof getFormSubmissionsInput>,
  session: Session
) {
  const currentForm = await prisma.form.findUnique({
    where: {
      slug: input.formSlug,
      userId: session.user.id,
    },
  });
  if (!currentForm) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Form does not exist for this user",
    });
  }
  return prisma.formSubmission.findMany({
    where: {
      formId: currentForm.id,
    },
  });
}
