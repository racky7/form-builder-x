import { router } from "../../trpc";
import { builderRouter } from "./builder/builder.router";
import { userRouter } from "./user/user.router";

export const appRouter = router({
  user: userRouter,
  builder: builderRouter,
});

export type AppRouter = typeof appRouter;
