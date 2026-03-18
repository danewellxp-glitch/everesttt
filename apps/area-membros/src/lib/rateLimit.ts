import { NextRequest, NextResponse } from "next/server"

interface AttemptEntry {
  count:   number
  resetAt: number
}

const attempts = new Map<string, AttemptEntry>()

interface RateLimitOptions {
  max:      number
  windowMs: number
}

interface RateLimitResult {
  success:   boolean
  response?: NextResponse
}

export function rateLimit(
  req: NextRequest,
  options: RateLimitOptions = { max: 5, windowMs: 15 * 60 * 1000 }
): RateLimitResult {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"

  const now   = Date.now()
  const entry = attempts.get(ip)

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + options.windowMs })
    return { success: true }
  }

  if (entry.count >= options.max) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Muitas tentativas. Tente novamente mais tarde." },
        {
          status: 429,
          headers: {
            "Retry-After":       String(Math.ceil((entry.resetAt - now) / 1000)),
            "X-RateLimit-Limit": String(options.max),
            "X-RateLimit-Remaining": "0",
          },
        }
      ),
    }
  }

  entry.count++
  return { success: true }
}
