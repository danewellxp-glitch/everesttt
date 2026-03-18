import { prisma } from "@everest/db"
import { ok, err, type Result } from "@/lib/result"
import { logger } from "@/lib/logger"

export async function markLessonComplete(
  userId:   string,
  lessonId: string
): Promise<Result<{ completedAt: Date }>> {
  try {
    const progress = await prisma.progress.upsert({
      where:  { userId_lessonId: { userId, lessonId } },
      update: { completed: true, completedAt: new Date() },
      create: { userId, lessonId, completed: true, completedAt: new Date() },
      select: { completedAt: true },
    })
    return ok({ completedAt: progress.completedAt ?? new Date() })
  } catch (error) {
    logger.error("[PROGRESS] Erro ao marcar aula concluída", { userId, lessonId, error })
    return err(new Error("Não foi possível salvar o progresso."))
  }
}

export async function updateWatchedSecs(
  userId:     string,
  lessonId:   string,
  watchedSecs: number
): Promise<Result<void>> {
  try {
    await prisma.progress.upsert({
      where:  { userId_lessonId: { userId, lessonId } },
      update: { watchedSecs },
      create: { userId, lessonId, watchedSecs, completed: false },
    })
    return ok(undefined)
  } catch (error) {
    logger.error("[PROGRESS] Erro ao salvar tempo assistido", { userId, lessonId, error })
    return err(new Error("Não foi possível salvar o progresso."))
  }
}

export async function getUserProgress(userId: string) {
  return prisma.progress.findMany({
    where: { userId },
    select: {
      lessonId:    true,
      completed:   true,
      completedAt: true,
      watchedSecs: true,
    },
  })
}

export async function getCompletedCount(userId: string): Promise<number> {
  return prisma.progress.count({
    where: { userId, completed: true },
  })
}
