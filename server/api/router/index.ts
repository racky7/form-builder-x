import { router } from "../../trpc";
import { builderRouter } from "./builder/builder.router";
import { userRouter } from "./user/user.router";
import { formSubmissionRouter } from "./submission/submission.router";

export const appRouter = router({
  user: userRouter,
  builder: builderRouter,
  formSubmission: formSubmissionRouter,
});

export type AppRouter = typeof appRouter;
