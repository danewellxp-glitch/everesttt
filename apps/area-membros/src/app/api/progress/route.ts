import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { withAuth } from "@/lib/apiAuth"
import { markLessonComplete, updateWatchedSecs, getUserProgress } from "@/services/progress.service"

const ProgressSchema = z.object({
  lessonId:    z.string().min(1),
  completed:   z.boolean().optional(),
  watchedSecs: z.number().int().min(0).optional(),
})

export const POST = withAuth(async (req: NextRequest, userId: string) => {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = ProgressSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos", details: parsed.error.flatten() }, { status: 400 })
  }

  const { lessonId, completed, watchedSecs } = parsed.data

  if (completed === true) {
    const result = await markLessonComplete(userId, lessonId)
    if (!result.ok) {
      return NextResponse.json({ error: result.error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true, completedAt: result.data.completedAt })
  }

  if (watchedSecs !== undefined) {
    const result = await updateWatchedSecs(userId, lessonId, watchedSecs)
    if (!result.ok) {
      return NextResponse.json({ error: result.error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
})

export const GET = withAuth(async (_req: NextRequest, userId: string) => {
  const progress = await getUserProgress(userId)
  return NextResponse.json({ progress })
})
