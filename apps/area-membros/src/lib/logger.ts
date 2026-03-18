type LogLevel = "info" | "warn" | "error"

const SENSITIVE_KEYS = [
  "password",
  "passwordhash",
  "token",
  "secret",
  "apikey",
  "authorization",
  "cookie",
  "resend",
]

function sanitize(data: unknown): unknown {
  if (data === null || data === undefined) return data
  if (typeof data !== "object") return data
  if (Array.isArray(data)) return data.map(sanitize)

  return Object.fromEntries(
    Object.entries(data as Record<string, unknown>).map(([k, v]) =>
      SENSITIVE_KEYS.some((s) => k.toLowerCase().includes(s))
        ? [k, "[REDACTED]"]
        : [k, sanitize(v)]
    )
  )
}

function log(level: LogLevel, msg: string, data?: unknown): void {
  const timestamp = new Date().toISOString()
  const prefix    = `[${timestamp}] [${level.toUpperCase()}]`
  const sanitized = data !== undefined ? sanitize(data) : undefined

  if (level === "error") {
    console.error(prefix, msg, sanitized ?? "")
  } else if (level === "warn") {
    console.warn(prefix, msg, sanitized ?? "")
  } else {
    console.info(prefix, msg, sanitized ?? "")
  }
}

export const logger = {
  info:  (msg: string, data?: unknown) => log("info",  msg, data),
  warn:  (msg: string, data?: unknown) => log("warn",  msg, data),
  error: (msg: string, data?: unknown) => log("error", msg, data),
}
