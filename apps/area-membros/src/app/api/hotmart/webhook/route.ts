import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { z } from "zod"
import { prisma } from "@everest/db"
import { sendWelcomeEmail } from "@/lib/email"
import { logger } from "@/lib/logger"
import { rateLimit } from "@/lib/rateLimit"

const hotmartPayloadSchema = z.object({
  event: z.string(),
  data: z.object({
    buyer: z.object({
      email: z.string().email(),
      name:  z.string(),
    }),
    purchase: z.object({
      transaction: z.string(),
      status:      z.string(),
      offer: z
        .object({ code: z.string() })
        .optional(),
    }),
    product: z
      .object({ id: z.union([z.string(), z.number()]) })
      .optional(),
  }),
})

const APPROVED_EVENTS = [
  "PURCHASE_COMPLETE",
  "PURCHASE_APPROVED",
  "PURCHASE_OUT_OF_SHOPPING_CART",
]

function generateTempPassword(): string {
  const chars =
    "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#"
  return Array.from(
    { length: 12 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("")
}

function derivePlan(offerCode: string): "monthly" | "annual" {
  const lower = offerCode.toLowerCase()
  return lower.includes("annual") || lower.includes("anual")
    ? "annual"
    : "monthly"
}

function calculateExpiresAt(plan: "monthly" | "annual"): Date {
  const date = new Date()
  date.setDate(date.getDate() + (plan === "annual" ? 365 : 30))
  return date
}

export async function POST(req: NextRequest) {
  // 1. Rate limiting
  const limit = rateLimit(req, { max: 200, windowMs: 60 * 1000 })
  if (!limit.success) return limit.response!

  // 2. Valida token do webhook
  const token = req.headers.get("x-hotmart-webhook-token")
  const expectedToken = process.env.HOTMART_WEBHOOK_TOKEN

  if (!token || !expectedToken || token !== expectedToken) {
    logger.warn("[WEBHOOK] Token inválido recebido")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // 3. Parse e validação do body
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = hotmartPayloadSchema.safeParse(body)
  if (!parsed.success) {
    logger.warn("[WEBHOOK] Payload inválido", { errors: parsed.error.flatten() })
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const { event, data } = parsed.data

  // 4. Filtra apenas eventos de compra aprovada
  if (!APPROVED_EVENTS.includes(event)) {
    return NextResponse.json({ received: true, processed: false })
  }

  const transactionId = data.purchase.transaction
  const offerCode     = data.purchase.offer?.code ?? ""
  const plan          = derivePlan(offerCode)
  const expiresAt     = calculateExpiresAt(plan)
  const { email, name } = data.buyer

  // 5. Idempotência — não processa a mesma transação duas vezes
  const existing = await prisma.purchase.findUnique({
    where:  { hotmartTxId: transactionId },
    select: { id: true },
  })
  if (existing) {
    logger.info("[WEBHOOK] Transação duplicada ignorada", { transactionId })
    return NextResponse.json({ received: true, processed: false, reason: "duplicate" })
  }

  // 6. Cria ou ativa usuário
  let userId: string
  let tempPassword: string | null = null

  const existingUser = await prisma.user.findUnique({
    where:  { email },
    select: { id: true },
  })

  if (!existingUser) {
    tempPassword = generateTempPassword()
    const passwordHash = await hash(tempPassword, 12)
    const newUser = await prisma.user.create({
      data:   { email, name, passwordHash, isActive: true },
      select: { id: true },
    })
    userId = newUser.id
    logger.info("[WEBHOOK] Novo usuário criado", { email })
  } else {
    await prisma.user.update({
      where: { id: existingUser.id },
      data:  { isActive: true },
    })
    userId = existingUser.id
    logger.info("[WEBHOOK] Usuário existente ativado", { email })
  }

  // 7. Registra compra
  await prisma.purchase.create({
    data: { userId, hotmartTxId: transactionId, status: "approved", plan, expiresAt },
  })

  // 8. Dispara email (fire-and-forget com log de erro)
  sendWelcomeEmail({ to: email, name, password: tempPassword ?? "—" }).catch((error: unknown) => {
    logger.error("[WEBHOOK] Falha ao enviar email de boas-vindas", { email, error })
  })

  return NextResponse.json({ received: true, processed: true })
}
