import { publicProcedure, protectedProcedure, router } from "@/server/trpc";
import { createFormInput } from "./builder.input";
import { createForm, getUserForms } from "./builder.service";

export const builderRouter = router({
  getUserForms: protectedProcedure.query(({ ctx: { session } }) =>
    getUserForms(session)
  ),
  createForm: protectedProcedure
    .input(createFormInput)
    .mutation(({ input, ctx: { session } }) => createForm(input, session)),
});
