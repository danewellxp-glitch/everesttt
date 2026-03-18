import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

const PUBLIC_ROUTES = [
  "/login",
  "/esqueci-senha",
  "/api/auth",
  "/api/hotmart",
]

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isPublic   = PUBLIC_ROUTES.some((route) => pathname.startsWith(route))
  const isLoggedIn = !!req.auth?.user?.id

  if (!isLoggedIn && !isPublic) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico).*)",
  ],
}
