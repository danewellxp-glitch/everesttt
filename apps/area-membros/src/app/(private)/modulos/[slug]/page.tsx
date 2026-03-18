import { auth } from "@/lib/auth";
import { prisma } from "@everest/db";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, PlayCircle, CheckCircle } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";

interface ModulePageProps {
  params: { slug: string };
}

export default async function ModuleDetailPage({ params }: ModulePageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const mod = await prisma.module.findUnique({
    where: { slug: params.slug },
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
  });

  if (!mod) notFound();

  const totalLessons = mod.lessons.length;
  const completedLessons = mod.lessons.filter((l) =>
    l.progress.some((p) => p.completed)
  ).length;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Voltar */}
      <Link
        href="/modulos"
        className="inline-flex items-center gap-2 text-everest-stone hover:text-everest-snow transition-colors mb-8"
      >
        <ChevronLeft size={20} />
        Voltar para Módulos
      </Link>

      {/* Header do Módulo */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{mod.emoji}</span>
          <div>
            <h1 className="font-heading font-extrabold text-everest-snow text-3xl">
              {mod.title}
            </h1>
            <p className="text-everest-stone">{mod.description}</p>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-everest-gray bg-everest-dark">
          <div className="flex items-center justify-between mb-2">
            <p className="text-everest-stone text-sm">Progresso do módulo</p>
            <p className="text-everest-snow font-bold text-sm">
              {completedLessons}/{totalLessons} concluídas
            </p>
          </div>
          <ProgressBar value={completedLessons} max={totalLessons} />
        </div>
      </div>

      {/* Lista de Aulas */}
      <div className="space-y-3">
        {mod.lessons.map((lesson, idx) => {
          const isCompleted = lesson.progress.some((p) => p.completed);

          return (
            <Link
              key={lesson.id}
              href={`/aula/${lesson.slug}`}
              className="flex items-center justify-between p-4 rounded-xl border border-everest-gray bg-everest-dark hover:border-everest-stone/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-everest-stone font-bold text-sm w-5">
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-everest-snow font-bold text-base group-hover:text-everest-red transition-colors">
                    {lesson.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    {lesson.duration && (
                      <span className="text-everest-stone text-[10px] uppercase font-bold tracking-widest">
                        {lesson.duration} min
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {isCompleted ? (
                <CheckCircle size={20} className="text-green-500" />
              ) : (
                <PlayCircle size={20} className="text-everest-stone group-hover:text-everest-snow transition-colors" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
