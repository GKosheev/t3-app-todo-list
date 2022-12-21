import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

const TaskStatus = z.enum(["INPROGRESS", "DONE", "CANCELED", "ABANDONED"]);

export const todoRouter = router({
  create: protectedProcedure
    .input(z.object({ title: z.string().min(2) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.task.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number().int(),
        title: z.string().min(2),
        status: TaskStatus,
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          status: input.status,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.task.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
