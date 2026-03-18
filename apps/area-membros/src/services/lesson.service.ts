import { prisma } from "@everest/db"

export async function getLessonWithContext(slug: string, userId: string) {
  return prisma.lesson.findUnique({
    where: { slug, isPublished: true },
    include: {
      module: {
        include: {
          lessons: {
            where:   { isPublished: true },
            orderBy: { order: "asc" },
            select: { id: true, title: true, slug: true, order: true },
          },
        },
      },
      progress: { where: { userId } },
    },
  })
}
