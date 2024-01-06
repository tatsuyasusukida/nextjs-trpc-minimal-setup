import { initTRPC } from "@trpc/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { z } from "zod";

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;
const appRouter = router({
  greeting: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query((opt) => {
      return {
        text: `Hello ${opt.input.name}`,
      };
    }),
});

export type AppRouter = typeof appRouter;
export default createNextApiHandler({ router: appRouter });
