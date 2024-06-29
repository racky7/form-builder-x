import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/api/router";
import { createTRPCContext } from "@/server/api/context";

function handler(req: Request) {
  return fetchRequestHandler({
    req,
    endpoint: "/api/trpc",
    router: appRouter,
    createContext: createTRPCContext,
  });
}

export { handler as GET, handler as POST };
