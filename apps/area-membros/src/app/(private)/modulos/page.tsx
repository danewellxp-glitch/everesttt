import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@everest/db";
import { ModuleCard } from "@/components/ModuleCard";

type ProgressItem = { completed: boolean };
type LessonItem = { progress: ProgressItem[] };
type ModuleItem = { id: string; title: string; slug: string; emoji: string; campLabel: string; lessons: LessonItem[] };

export default async function ModulosPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const modules = (await prisma.module.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
    include: {
      lessons: {
        where: { isPublished: true },
        include: {
          progress: { where: { userId: session.user.id } },
        },
      },
    },
  })) as unknown as ModuleItem[];

  return (
    <div className="p-8 max-w-6xl animate-fade-in">
      <div className="mb-10">
        <p className="text-everest-stone text-xs font-bold uppercase tracking-widest mb-1">Trilha de aprendizado</p>
        <h1 className="font-heading font-extrabold text-everest-snow text-3xl md:text-4xl mb-2">
          Meus Módulos
        </h1>
        <p className="text-everest-muted">
          {modules.length} módulos · Do Base Camp ao Cume
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((mod) => {
          const completed = mod.lessons.filter((l) =>
            l.progress.some((p) => p.completed)
          ).length;

          return (
            <ModuleCard
              key={mod.id}
              title={mod.title}
              slug={mod.slug}
              emoji={mod.emoji}
              campLabel={mod.campLabel}
              completedLessons={completed}
              totalLessons={mod.lessons.length}
              hasStarted={completed > 0}
            />
          );
        })}
      </div>
    </div>
  );
}
