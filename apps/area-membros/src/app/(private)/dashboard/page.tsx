import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@everest/db";
import { ModuleCard } from "@/components/ModuleCard";
import { ProgressBar } from "@/components/ProgressBar";
import { AltitudeBadge } from "@/components/AltitudeBadge";
import Link from "next/link";
import { PlayCircle, ChevronRight } from "lucide-react";

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
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-heading font-extrabold text-everest-snow text-3xl mb-2 tracking-tight">
          Bem-vindo de volta, {session.user.name?.split(" ")[0]}
        </h1>
        <div className="flex items-center gap-2 text-everest-stone text-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Sua jornada rumo ao topo continua
        </div>
      </div>

      {/* Progresso geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Card progresso */}
        <div className="col-span-2 p-8 rounded-2xl border border-everest-gray bg-everest-dark shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-everest-stone text-xs font-bold uppercase tracking-widest mb-1">
                Progresso da Escalada
              </p>
              <p className="font-heading font-extrabold text-everest-snow text-3xl">
                {completedLessons} <span className="text-everest-stone text-lg font-normal">/ {totalLessons} aulas</span>
              </p>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-everest-gray flex items-center justify-center relative">
              <span className="font-heading font-bold text-everest-gold text-xl">
                {progressPercent}%
              </span>
            </div>
          </div>
          <ProgressBar value={completedLessons} max={totalLessons} className="h-2.5" />
        </div>

        {/* Badge altitude */}
        <div className="p-8 rounded-2xl border border-everest-gray bg-everest-dark flex flex-col items-center justify-center text-center shadow-xl">
          <p className="text-everest-stone text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Altitude Atual
          </p>
          <AltitudeBadge camp={currentCamp} size="lg" />
        </div>
      </div>

      {/* Próxima aula */}
      {nextLesson && (
        <div
          className="p-8 rounded-2xl mb-12 shadow-2xl relative overflow-hidden group"
          style={{
            border: "1px solid rgba(224, 62, 62, 0.2)",
            background: "linear-gradient(135deg, #150808 0%, #0D0E12 100%)",
          }}
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-everest-red/10 border border-everest-red/20 text-everest-red text-[10px] font-bold uppercase tracking-widest mb-4">
              <PlayCircle size={12} />
              Próximo Passo
            </div>
            <h3 className="font-heading font-extrabold text-everest-snow text-2xl mb-2 group-hover:text-everest-red transition-colors">
              {nextLesson.title}
            </h3>
            <p className="text-everest-stone text-sm mb-8 max-w-xl">
              Módulo: <span className="text-everest-snow/80">{nextLesson.moduleTitle}</span>
            </p>
            <Link
              href={`/aula/${nextLesson.slug}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-everest-red hover:bg-everest-red-dark text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-everest-red/20"
            >
              Retomar Estudo
              <ChevronRight size={18} />
            </Link>
          </div>
          {/* Decorative element */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-everest-red/5 blur-[100px] rounded-full" />
        </div>
      )}

      {/* Grid de módulos */}
      <h2 className="font-heading font-bold text-everest-snow text-xl mb-4">
        Seus módulos
      </h2>
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
