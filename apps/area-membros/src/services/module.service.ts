import { prisma } from "@everest/db"

export async function getPublishedModules() {
  return prisma.module.findMany({
    where:   { isPublished: true },
    orderBy: { order: "asc" },
    select: {
      id:          true,
      title:       true,
      slug:        true,
      description: true,
      emoji:       true,
      campLabel:   true,
      order:       true,
    },
  })
}

export async function getModuleWithLessons(slug: string, userId: string) {
  return prisma.module.findUnique({
    where: { slug, isPublished: true },
    include: {
      lessons: {
        where:   { isPublished: true },
        orderBy: { order: "asc" },
        include: {
          progress: { where: { userId } },
        },
      },
    },
  })
}
