import { publicProcedure, protectedProcedure, router } from "@/server/trpc";
import {
  createFormInput,
  getUserFormInput,
  restoreOrDeleteFormInput,
  updateFormInput,
} from "./builder.input";
import {
  createForm,
  deleteUserForm,
  getForm,
  getUserForm,
  getUserForms,
  restoreUserForm,
  updateUserForm,
} from "./builder.service";

export const builderRouter = router({
  getForm: publicProcedure
    .input(getUserFormInput)
    .query(({ input }) => getForm(input)),
  getUserForms: protectedProcedure.query(({ ctx: { session } }) =>
    getUserForms(session)
  ),
  getUserForm: protectedProcedure
    .input(getUserFormInput)
    .query(({ input, ctx: { session } }) => getUserForm(input, session)),
  createForm: protectedProcedure
    .input(createFormInput)
    .mutation(({ input, ctx: { session } }) => createForm(input, session)),
  deleteForm: protectedProcedure
    .input(restoreOrDeleteFormInput)
    .mutation(({ input, ctx: { session } }) => deleteUserForm(input, session)),
  restoreForm: protectedProcedure
    .input(restoreOrDeleteFormInput)
    .mutation(({ input, ctx: { session } }) => restoreUserForm(input, session)),
  updateUserForm: protectedProcedure
    .input(updateFormInput)
    .mutation(({ input, ctx: { session } }) => updateUserForm(input, session)),
});
