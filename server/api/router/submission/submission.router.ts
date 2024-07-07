import { protectedProcedure, publicProcedure, router } from "@/server/trpc";
import {
  collectFormSubmission,
  getFormSubmissions,
} from "./submission.service";
import {
  collectFormSubmissionInput,
  getFormSubmissionsInput,
} from "./submission.input";

export const formSubmissionRouter = router({
  getFormSubmissions: protectedProcedure
    .input(getFormSubmissionsInput)
    .query(({ input, ctx: { session } }) => getFormSubmissions(input, session)),
  collectFormSubmission: publicProcedure
    .input(collectFormSubmissionInput)
    .mutation(({ input }) => collectFormSubmission(input)),
});
