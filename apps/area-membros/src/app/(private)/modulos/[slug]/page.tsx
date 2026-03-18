import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@everest/db";
import Link from "next/link";
import { CheckCircle, Play, Clock, FileText, ArrowLeft, BookOpen } from "lucide-react";
import { AltitudeBadge } from "@/components/AltitudeBadge";

type ProgressItem = { completed: boolean };
type LessonItem = { id: string; title: string; slug: string; duration: number | null; pdfUrl: string | null; progress: ProgressItem[] };
type ModuleWithLessons = { emoji: string; campLabel: string; title: string; description: string; lessons: LessonItem[] };

export default async function ModuloPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const module = (await prisma.module.findUnique({
    where: { slug: params.slug, isPublished: true },
    include: {
      lessons: {
        where: { isPublished: true },
        orderBy: { order: "asc" },
        include: {
          progress: { where: { userId: session.user.id } },
        },
      },
    },
  })) as unknown as ModuleWithLessons | null;

  if (!module) notFound();

  const completedCount = module.lessons.filter((l) => l.progress.some((p) => p.completed)).length;
  const total = module.lessons.length;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="p-8 max-w-3xl animate-fade-in">
      {/* Breadcrumb */}
      <Link
        href="/modulos"
        className="inline-flex items-center gap-2 text-everest-stone hover:text-everest-snow text-sm mb-8 transition-colors group"
      >
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        Todos os módulos
      </Link>

      {/* Header */}
      <div className="mb-8 rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #131823 0%, #0E1117 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
        {/* Decorative glow */}
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }} />

        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {module.emoji}
          </div>
          <div className="flex-1">
            <div className="mb-2">
              <AltitudeBadge camp={module.campLabel} />
            </div>
            <h1 className="font-heading font-extrabold text-everest-snow text-2xl leading-tight">
              {module.title}
            </h1>
          </div>
        </div>

        <p className="text-everest-muted mb-4">{module.description}</p>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${percent}%`,
                background: percent === 100
                  ? "linear-gradient(90deg, #14B8A6, #06B6D4)"
                  : "linear-gradient(90deg, #F5C842, #E8A600)",
                boxShadow: percent === 100 ? "0 0 8px rgba(20,184,166,0.4)" : "0 0 8px rgba(245,200,66,0.3)",
              }}
            />
          </div>
          <div className="flex items-center gap-1.5 text-everest-stone text-xs whitespace-nowrap">
            <BookOpen size={12} />
            <span>{completedCount}/{total} aulas</span>
          </div>
        </div>
      </div>

      {/* Lista de aulas */}
      <div className="space-y-2">
        {module.lessons.map((lesson, i) => {
          const isCompleted = lesson.progress.some((p) => p.completed);

          return (
            <Link
              key={lesson.id}
              href={`/aula/${lesson.slug}`}
              className="card-hover flex items-center gap-4 p-4 rounded-xl group"
              style={{
                background: isCompleted
                  ? "linear-gradient(135deg, rgba(20,184,166,0.06), rgba(19,24,35,0.9))"
                  : "linear-gradient(145deg, #131823, #0E1117)",
                border: isCompleted
                  ? "1px solid rgba(20,184,166,0.2)"
                  : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Number / status icon */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm transition-all"
                style={isCompleted ? {
                  background: "rgba(20,184,166,0.15)",
                  border: "1px solid rgba(20,184,166,0.3)",
                } : {
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {isCompleted ? (
                  <CheckCircle size={16} className="text-teal-400" />
                ) : (
                  <span className="text-everest-stone text-xs">{i + 1}</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={`font-semibold truncate transition-colors ${isCompleted ? "text-teal-300 group-hover:text-teal-200" : "text-everest-snow group-hover:text-white"}`}>
                  {lesson.title}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  {lesson.duration && (
                    <span className="flex items-center gap-1 text-everest-stone text-xs">
                      <Clock size={11} />
                      {Math.round(lesson.duration / 60)}min
                    </span>
                  )}
                  {lesson.pdfUrl && (
                    <span className="flex items-center gap-1 text-everest-stone text-xs">
                      <FileText size={11} />
                      PDF disponível
                    </span>
                  )}
                </div>
              </div>

              {/* Play icon */}
              <Play
                size={15}
                className="text-everest-stone group-hover:text-everest-snow flex-shrink-0 transition-colors"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
