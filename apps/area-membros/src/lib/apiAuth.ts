import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

type AuthenticatedHandler = (
  req: NextRequest,
  userId: string
) => Promise<NextResponse>

export function withAuth(handler: AuthenticatedHandler) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    return handler(req, session.user.id)
  }
}
