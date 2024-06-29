import { createTRPCReact, httpBatchLink, loggerLink } from "@trpc/react-query";
import { QueryClient } from "@tanstack/react-query";
import SuperJSON from "superjson";
import { AppRouter } from "@/server/api/router";
import { getUrl } from "../utils";

export const trpc = createTRPCReact<AppRouter>({});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: getUrl("/api/trpc"),
    }),
    loggerLink({
      enabled: (opts) =>
        opts.direction === "down" && opts.result instanceof Error,
    }),
  ],
  transformer: SuperJSON,
});
