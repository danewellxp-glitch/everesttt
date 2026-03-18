import { auth } from "@/lib/auth";
import { prisma } from "@everest/db";
import { redirect } from "next/navigation";
import { ModuleCard } from "@/components/ModuleCard";
import { Mountain } from "lucide-react";

type ProgressItem = { completed: boolean };
type LessonItem = { id: string; title: string; slug: string; duration: number | null; pdfUrl: string | null; progress: ProgressItem[] };
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
        orderBy: { order: "asc" },
        include: {
          progress: {
            where: { userId: session.user.id },
          },
        },
      },
    },
  })) as unknown as ModuleItem[];

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-everest-gray flex items-center justify-center text-everest-snow">
          <Mountain size={24} />
        </div>
        <div>
          <h1 className="font-heading font-extrabold text-everest-snow text-3xl">
            Módulos
          </h1>
          <p className="text-everest-stone">Explorar conteúdo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
