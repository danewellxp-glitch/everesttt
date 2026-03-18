import { prisma } from "@everest/db"
import { ok, err, type Result } from "@/lib/result"
import { logger } from "@/lib/logger"
import type { PlanType } from "@everest/types"

export async function createPurchase(data: {
  userId:      string
  hotmartTxId: string
  plan:        PlanType
  expiresAt:   Date
}): Promise<Result<{ id: string }>> {
  try {
    const purchase = await prisma.purchase.create({
      data: {
        userId:      data.userId,
        hotmartTxId: data.hotmartTxId,
        status:      "approved",
        plan:        data.plan,
        expiresAt:   data.expiresAt,
      },
      select: { id: true },
    })
    return ok(purchase)
  } catch (error) {
    logger.error("[PURCHASE] Erro ao registrar compra", { hotmartTxId: data.hotmartTxId, error })
    return err(new Error("Não foi possível registrar a compra."))
  }
}

export async function isDuplicateTransaction(hotmartTxId: string): Promise<boolean> {
  const existing = await prisma.purchase.findUnique({
    where: { hotmartTxId },
    select: { id: true },
  })
  return existing !== null
}

export function calculateExpiresAt(plan: PlanType): Date {
  const date = new Date()
  date.setDate(date.getDate() + (plan === "annual" ? 365 : 30))
  return date
}

export function derivePlan(offerCode: string): PlanType {
  const lower = offerCode.toLowerCase()
  return lower.includes("annual") || lower.includes("anual") ? "annual" : "monthly"
}
