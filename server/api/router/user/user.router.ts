import { protectedProcedure, publicProcedure, router } from "../../trpc";
import { getUserInput, logInUserInput, signUpUserInput } from "./user.input";
import { getCurrentUser, getUser, logInUser, signUpUser } from "./user.service";

export const userRouter = router({
  getUser: protectedProcedure
    .input(getUserInput)
    .query(({ input }) => getUser(input)),
  getCurrentUser: protectedProcedure.query(({ ctx: { session } }) =>
    getCurrentUser(session)
  ),
  logInUser: publicProcedure
    .input(logInUserInput)
    .mutation(({ input }) => logInUser(input)),
  signUpUser: publicProcedure
    .input(signUpUserInput)
    .mutation(({ input }) => signUpUser(input)),
});
