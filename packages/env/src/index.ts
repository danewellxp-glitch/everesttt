import { z } from "zod"

const serverEnvSchema = z.object({
  DATABASE_URL:          z.string().url(),
  NEXTAUTH_SECRET:       z.string().min(32),
  NEXTAUTH_URL:          z.string().url(),
  HOTMART_WEBHOOK_TOKEN: z.string().min(16),
  RESEND_API_KEY:        z.string().startsWith("re_"),
  EMAIL_FROM:            z.string().email(),
  NODE_ENV:              z.enum(["development", "production", "test"]).default("development"),
})

const clientEnvSchema = z.object({
  NEXT_PUBLIC_HOTMART_CHECKOUT_URL: z.string().url(),
  NEXT_PUBLIC_SITE_VENDAS_URL:      z.string().url(),
  NEXT_PUBLIC_AREA_MEMBROS_URL:     z.string().url(),
})

function validateServerEnv() {
  const parsed = serverEnvSchema.safeParse(process.env)
  if (!parsed.success) {
    console.error("❌ Variáveis de ambiente inválidas ou ausentes:")
    console.error(parsed.error.flatten().fieldErrors)
    throw new Error("Configuração de ambiente inválida. Veja os erros acima.")
  }
  return parsed.data
}

function validateClientEnv() {
  const parsed = clientEnvSchema.safeParse({
    NEXT_PUBLIC_HOTMART_CHECKOUT_URL: process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_URL,
    NEXT_PUBLIC_SITE_VENDAS_URL:      process.env.NEXT_PUBLIC_SITE_VENDAS_URL,
    NEXT_PUBLIC_AREA_MEMBROS_URL:     process.env.NEXT_PUBLIC_AREA_MEMBROS_URL,
  })
  if (!parsed.success) {
    console.error("❌ Variáveis públicas inválidas:")
    console.error(parsed.error.flatten().fieldErrors)
    throw new Error("Configuração de ambiente público inválida.")
  }
  return parsed.data
}

export const serverEnv =
  typeof window === "undefined" ? validateServerEnv() : ({} as ReturnType<typeof validateServerEnv>)

export const clientEnv = validateClientEnv()
