import { prisma } from "@everest/db"
import { hash } from "bcryptjs"
import { ok, err, type Result } from "@/lib/result"
import { logger } from "@/lib/logger"
import type { UserPublic } from "@everest/types"

export async function getUserByEmail(email: string): Promise<UserPublic | null> {
  return prisma.user.findUnique({
    where: { email },
    select: { id: true, name: true, email: true },
  })
}

export async function createUserFromPurchase(data: {
  email:        string
  name:         string
  tempPassword: string
}): Promise<Result<UserPublic>> {
  try {
    const passwordHash = await hash(data.tempPassword, 12)
    const user = await prisma.user.create({
      data: {
        email:        data.email,
        name:         data.name,
        passwordHash,
        isActive:     true,
      },
      select: { id: true, email: true, name: true },
    })
    return ok(user)
  } catch (error) {
    logger.error("[USER] Erro ao criar usuário", { email: data.email, error })
    return err(new Error("Não foi possível criar o usuário."))
  }
}

export async function activateUser(id: string): Promise<Result<void>> {
  try {
    await prisma.user.update({
      where: { id },
      data:  { isActive: true },
    })
    return ok(undefined)
  } catch (error) {
    logger.error("[USER] Erro ao ativar usuário", { id, error })
    return err(new Error("Não foi possível ativar o usuário."))
  }
}

export async function hasActiveAccess(userId: string): Promise<boolean> {
  const purchase = await prisma.purchase.findFirst({
    where: {
      userId,
      status: "approved",
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
    },
  })
  return purchase !== null
}
