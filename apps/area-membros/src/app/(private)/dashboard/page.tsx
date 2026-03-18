import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@everest/db";
import { ModuleCard } from "@/components/ModuleCard";
import { ProgressBar } from "@/components/ProgressBar";
import { AltitudeBadge } from "@/components/AltitudeBadge";
import Link from "next/link";

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
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-everest-snow text-3xl mb-1">
          Bem-vindo de volta, {session.user.name?.split(" ")[0]}! ⛰
        </h1>
        <p className="text-everest-stone">Continue sua escalada</p>
      </div>

      {/* Progresso geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Card progresso */}
        <div className="col-span-2 p-6 rounded-xl border border-everest-gray bg-everest-dark">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-everest-stone text-sm font-medium">
                Progresso total
              </p>
              <p className="font-heading font-bold text-everest-snow text-2xl">
                {completedLessons} de {totalLessons} aulas
              </p>
            </div>
            <span className="font-heading font-bold text-everest-gold text-3xl">
              {progressPercent}%
            </span>
          </div>
          <ProgressBar value={completedLessons} max={totalLessons} />
        </div>

        {/* Badge altitude */}
        <div className="p-6 rounded-xl border border-everest-gray bg-everest-dark flex flex-col items-center justify-center text-center">
          <p className="text-everest-stone text-xs font-bold uppercase tracking-wider mb-2">
            Altitude atual
          </p>
          <AltitudeBadge camp={currentCamp} size="lg" />
        </div>
      </div>

      {/* Próxima aula */}
      {nextLesson && (
        <div
          className="p-6 rounded-xl mb-8"
          style={{
            border: "1px solid #E03E3E30",
            background: "linear-gradient(135deg, #1a0a0a 0%, #111318 100%)",
          }}
        >
          <p className="text-everest-red text-xs font-bold uppercase tracking-widest mb-2">
            ▶ Continue daqui
          </p>
          <h3 className="font-heading font-bold text-everest-snow text-xl mb-1">
            {nextLesson.title}
          </h3>
          <p className="text-everest-stone text-sm mb-4">
            {nextLesson.moduleTitle}
          </p>
          <Link
            href={`/aula/${nextLesson.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-everest-red hover:bg-everest-red-dark text-white font-bold rounded-lg transition-colors duration-200"
          >
            Assistir aula
          </Link>
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
