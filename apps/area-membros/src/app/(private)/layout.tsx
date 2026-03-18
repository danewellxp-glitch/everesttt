import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/Sidebar"
import { hasActiveAccess, } from "@/services/user.service"
import { getCompletedCount } from "@/services/progress.service"
import { CAMP_CONFIG, getCampFromProgress } from "@everest/types"

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  // Verifica se o plano está ativo
  const activeAccess = await hasActiveAccess(session.user.id)
  if (!activeAccess) redirect("/login?error=access_expired")

  // Progresso do aluno
  const completedLessons = await getCompletedCount(session.user.id)
  const campLevel        = getCampFromProgress(completedLessons)
  const campInfo         = CAMP_CONFIG[campLevel]
  const totalLessons     = 30 // 6 módulos × 5 aulas
  const progressPercent  = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="flex min-h-screen bg-everest-black">
      <Sidebar
        currentCamp={campInfo.label}
        progressPercent={progressPercent}
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
