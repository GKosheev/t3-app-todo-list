import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const todoRouter = router({
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ctx, input}) => {
      return await ctx.prisma.task.create({
        data: {
          title: ctx.session.user.id,
          userId: input.title
        }
      })

    }),
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      where: { 
        userId: ctx.session.user.id 
      }
    });
  }),
 update: protectedProcedure
 .input(z.object({id: z.number().int(), title: z.string()}))
 .mutation(async ({ctx, input}) => {
    return await ctx.prisma.task.update({
      where: {
        id: input.id
      },
      data: {
        title: input.title
      }
    })
 }),
 delete: protectedProcedure
 .input(z.object({id: z.number().int(), title: z.string()}))
 .mutation(async ({ctx, input}) => {
    return await ctx.prisma.task.delete({
      where: {
        id: input.id,
      }
    })
 })
});
