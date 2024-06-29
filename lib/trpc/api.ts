import { experimental_createTRPCNextAppDirServer as createTRPCNextAppDirServer } from "@trpc/next/app-dir/server";
import { experimental_nextHttpLink as nextHttpLink } from "@trpc/next/app-dir/links/nextHttp";
import SuperJSON from "superjson";
import { loggerLink } from "@trpc/client";
import { cookies } from "next/headers";
import { AppRouter } from "@/server/api/router";
import { getUrl } from "../utils";

/**
 * api can be used in the server components to run query or mutation such as
 *
 * ```tsx
 * const user = await api.user.getCurrentUser.query()
 * ```
 *
 * If you are using `api` in any page with dynamic path, make sure to add correct `dynamic` param
 * to make the page render dyanmically at request time, el
 *
 * ```
 * const dynamic = 'force-dynamic'
 * ```
 */

export const api = createTRPCNextAppDirServer<AppRouter>({
  config() {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            opts.direction === "down" && opts.result instanceof Error,
        }),
        nextHttpLink({
          revalidate: 0,
          url: getUrl("/api/trpc"),
          batch: true,
          headers: {
            cookie: cookies().toString(),
            "x-trpc-source": "rsc-invoke",
          },
        }),
      ],
      transformer: SuperJSON,
    };
  },
});
