import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@everest/db";
import { ModuleCard } from "@/components/ModuleCard";
import { ProgressBar } from "@/components/ProgressBar";
import { AltitudeBadge } from "@/components/AltitudeBadge";
import Link from "next/link";
import { PlayCircle, Zap, Trophy, TrendingUp } from "lucide-react";

type ProgressItem = { completed: boolean };
type LessonItem = { id: string; title: string; slug: string; duration: number | null; pdfUrl: string | null; progress: ProgressItem[] };
type ModuleItem = { id: string; title: string; slug: string; emoji: string; campLabel: string; lessons: LessonItem[] };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const modules = (await prisma.module.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
    include: {
      lessons: {
        where: { isPublished: true },
        orderBy: { order: "asc" },
        include: {
          progress: {
            where: { userId: session.user.id },
          },
        },
      },
    },
  })) as unknown as ModuleItem[];

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = modules.reduce(
    (sum, m) =>
      sum + m.lessons.filter((l) => l.progress.some((p) => p.completed)).length,
    0
  );

  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const getCamp = (percent: number): string => {
    if (percent === 100) return "CUME";
    if (percent >= 80) return "CAMP 4";
    if (percent >= 60) return "CAMP 3";
    if (percent >= 40) return "CAMP 2";
    if (percent >= 20) return "CAMP 1";
    return "BASE CAMP";
  };

  const currentCamp = getCamp(progressPercent);
  const firstName = session.user.name?.split(" ")[0] ?? "Alpinista";

  // Próxima aula sugerida
  let nextLesson: { title: string; slug: string; moduleTitle: string } | null = null;
  for (const mod of modules) {
    const next = mod.lessons.find((l) => !l.progress.some((p) => p.completed));
    if (next) {
      nextLesson = { title: next.title, slug: next.slug, moduleTitle: mod.title };
      break;
    }
  }

  return (
    <div className="p-8 max-w-6xl animate-fade-in">

      {/* ── Header ── */}
      <div className="mb-10">
        <p className="text-everest-stone text-sm font-medium mb-1 uppercase tracking-widest">
          Bem-vindo de volta
        </p>
        <h1 className="font-heading font-extrabold text-everest-snow text-3xl md:text-4xl mb-2">
          {firstName}
          <span className="ml-2 inline-block">⛰</span>
        </h1>
        <p className="text-everest-muted text-base">Continue sua escalada rumo ao cume.</p>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        {/* Progress card — spans 2 cols */}
        <div className="col-span-2 rounded-2xl p-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #131823 0%, #0E1117 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
          {/* Decorative glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }} />

          <div className="flex items-start justify-between mb-5 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={15} className="text-blue-400" />
                <p className="text-everest-stone text-xs font-semibold uppercase tracking-widest">
                  Progresso total
                </p>
              </div>
              <p className="font-heading font-bold text-everest-snow text-2xl">
                {completedLessons}
                <span className="text-everest-stone font-normal text-lg"> / {totalLessons} aulas</span>
              </p>
            </div>
            <div className="text-right">
              <p className="font-heading font-extrabold text-4xl text-gradient-gold">
                {progressPercent}%
              </p>
            </div>
          </div>
          <ProgressBar value={completedLessons} max={totalLessons} className="relative z-10" />
        </div>

        {/* Altitude badge card */}
        <div className="rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #131823 0%, #0E1117 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
          <div className="absolute inset-0 opacity-5"
            style={{ background: "radial-gradient(circle at center, #F5C842 0%, transparent 70%)" }} />
          <div className="flex items-center gap-1.5 mb-3">
            <Trophy size={14} className="text-everest-gold" />
            <p className="text-everest-stone text-[10px] font-bold uppercase tracking-widest">
              Altitude atual
            </p>
          </div>
          <AltitudeBadge camp={currentCamp} size="lg" />
          <p className="text-everest-stone text-xs mt-3 opacity-70">
            {progressPercent === 100
              ? "Você conquistou o cume! 🏆"
              : `${100 - progressPercent}% para o próximo nível`}
          </p>
        </div>
      </div>

      {/* ── Próxima Aula ── */}
      {nextLesson && (
        <div className="rounded-2xl mb-10 p-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0f0a1a 0%, #10111a 50%, #0a0f1a 100%)",
            border: "1px solid rgba(168,85,247,0.2)",
          }}>
          {/* Glow */}
          <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #A855F7 0%, transparent 70%)" }} />
          <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }} />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={14} className="text-purple-400" />
                <p className="text-purple-400 text-xs font-bold uppercase tracking-widest">
                  Continue daqui
                </p>
              </div>
              <h3 className="font-heading font-bold text-everest-snow text-xl mb-1">
                {nextLesson.title}
              </h3>
              <p className="text-everest-stone text-sm">{nextLesson.moduleTitle}</p>
            </div>

            <Link
              href={`/aula/${nextLesson.slug}`}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm shrink-0 transition-all hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #A855F7, #7C3AED)",
                boxShadow: "0 0 20px rgba(168,85,247,0.3)",
                color: "white",
              }}
            >
              <PlayCircle size={18} />
              Assistir aula
            </Link>
          </div>
        </div>
      )}

      {/* ── Módulos ── */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading font-bold text-everest-snow text-xl">
          Seus módulos
        </h2>
        <span className="text-everest-stone text-sm">{modules.length} módulos</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((mod) => {
          const completed = mod.lessons.filter((l) =>
            l.progress.some((p) => p.completed)
          ).length;
          const hasStarted = completed > 0;

          return (
            <ModuleCard
              key={mod.id}
              title={mod.title}
              slug={mod.slug}
              emoji={mod.emoji}
              campLabel={mod.campLabel}
              completedLessons={completed}
              totalLessons={mod.lessons.length}
              hasStarted={hasStarted}
            />
          );
        })}
      </div>
    </div>
  );
}
