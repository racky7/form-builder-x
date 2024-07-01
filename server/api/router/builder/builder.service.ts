import { z } from "zod";
import { createFormInput, restoreOrDeleteFormInput } from "./builder.input";
import { prisma } from "@/server/db";
import { Session } from "next-auth";
import { uid } from "uid";

export function getUserForms(session: Session) {
  return prisma.form.findMany({
    where: {
      userId: session.user.id,
      isDeleted: {
        not: true,
      },
    },
  });
}

export function createForm(
  input: z.infer<typeof createFormInput>,
  session: Session
) {
  return prisma.form.create({
    data: {
      name: input.name,
      slug: uid(),
      userId: session.user.id!,
    },
  });
}

export function getUserForm() {}

export function updateUserForm() {}

export function deleteUserForm(
  input: z.infer<typeof restoreOrDeleteFormInput>,
  session: Session
) {
  return prisma.form.update({
    where: {
      id: input.id,
      userId: session.user.id!,
    },
    data: {
      isDeleted: true,
    },
  });
}

export function restoreUserForm(
  input: z.infer<typeof restoreOrDeleteFormInput>,
  session: Session
) {
  return prisma.form.update({
    where: {
      id: input.id,
      userId: session.user.id!,
    },
    data: {
      isDeleted: false,
    },
  });
}

export function getForm() {}
