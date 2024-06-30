import { z } from "zod";
import { createFormInput } from "./builder.input";
import { prisma } from "@/server/db";
import { Session } from "next-auth";
import { uid } from "uid";

export function getUserForms(session: Session) {
  return prisma.form.findMany({
    where: {
      userId: session.user.id,
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

export function deleteUserForm() {}

export function getForm() {}
