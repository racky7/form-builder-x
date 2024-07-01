import { publicProcedure, protectedProcedure, router } from "@/server/trpc";
import { createFormInput, restoreOrDeleteFormInput } from "./builder.input";
import {
  createForm,
  deleteUserForm,
  getUserForms,
  restoreUserForm,
} from "./builder.service";

export const builderRouter = router({
  getUserForms: protectedProcedure.query(({ ctx: { session } }) =>
    getUserForms(session)
  ),
  createForm: protectedProcedure
    .input(createFormInput)
    .mutation(({ input, ctx: { session } }) => createForm(input, session)),
  deleteForm: protectedProcedure
    .input(restoreOrDeleteFormInput)
    .mutation(({ input, ctx: { session } }) => deleteUserForm(input, session)),
  restoreForm: protectedProcedure
    .input(restoreOrDeleteFormInput)
    .mutation(({ input, ctx: { session } }) => restoreUserForm(input, session)),
});
