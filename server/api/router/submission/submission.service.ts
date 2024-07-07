import { z } from "zod";
import {
  collectFormSubmissionInput,
  getFormSubmissionsInput,
} from "./submission.input";
import { prisma } from "@/server/db";
import { Session } from "next-auth";
import { TRPCError } from "@trpc/server";

export function collectFormSubmission(
  input: z.infer<typeof collectFormSubmissionInput>
) {
  return prisma.formSubmission.create({
    data: {
      formId: input.formId,
      submission: input.submission,
      submitted_at: new Date(),
    },
  });
}

export async function getFormSubmissions(
  input: z.infer<typeof getFormSubmissionsInput>,
  session: Session
) {
  const formExist = await prisma.form.findUnique({
    where: {
      id: input.formId,
      userId: session.user.id,
    },
  });
  if (!formExist) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Form does not exist for this user",
    });
  }
  return prisma.formSubmission.findMany({
    where: {
      formId: input.formId,
    },
  });
}
