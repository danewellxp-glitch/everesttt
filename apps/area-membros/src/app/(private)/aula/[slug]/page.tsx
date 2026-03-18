import { auth } from "@/lib/auth";
import { prisma } from "@everest/db";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";
import { LessonPlayer } from "@/components/LessonPlayer";
import { MarkCompleteButton } from "@/components/MarkCompleteButton";

interface AulaPageProps {
  params: { slug: string };
}

export default async function LessonPage({ params }: AulaPageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const lesson = await prisma.lesson.findUnique({
    where: { slug: params.slug },
    include: {
      module: {
        include: {
          lessons: {
            where: { isPublished: true },
            orderBy: { order: "asc" },
          },
        },
      },
      progress: {
        where: { userId: session.user.id },
      },
    },
  });

  if (!lesson) notFound();

  const isCompleted = lesson.progress.some((p) => p.completed);

  // Navegação
  const currentIndex = lesson.module.lessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = lesson.module.lessons[currentIndex + 1];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Breadcrumbs / Voltar */}
      <div className="flex flex-wrap items-center gap-2 text-everest-stone text-sm mb-8">
        <Link href="/modulos" className="hover:text-everest-snow">Módulos</Link>
        <span className="opacity-30">/</span>
        <Link href={`/modulos/${lesson.module.slug}`} className="hover:text-everest-snow">{lesson.module.title}</Link>
        <span className="opacity-30">/</span>
        <span className="text-everest-snow font-medium">{lesson.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lado Esquerdo: Player e Info */}
        <div className="lg:col-span-2">
          <LessonPlayer videoUrl={lesson.videoUrl} />

          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-everest-snow font-heading font-extrabold text-2xl mb-2">
                {lesson.title}
              </h1>
              <p className="text-everest-stone text-sm">
                Módulo: <span className="text-everest-snow">{lesson.module.title}</span>
              </p>
            </div>

            <MarkCompleteButton lessonId={lesson.id} isCompleted={isCompleted} />
          </div>

          <div className="mt-8 pt-8 border-t border-everest-gray">
            <p className="text-everest-stone text-base leading-relaxed">
              {lesson.description || "Esta aula ainda não possui descrição detalhada."}
            </p>

            {lesson.pdfUrl && (
              <a
                href={lesson.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-8 p-4 rounded-xl border border-everest-gray bg-everest-dark hover:border-everest-stone/30 transition-all text-everest-snow font-bold group"
              >
                <div className="w-10 h-10 rounded-lg bg-everest-red flex items-center justify-center text-white">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-sm">Material Complementar</p>
                  <p className="text-everest-stone text-xs font-normal">Clique para baixar o PDF</p>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Lado Direito: Próximas Aulas / Playlist */}
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-everest-snow text-lg px-2">Aulas do módulo</h3>
          <div className="space-y-2">
            {lesson.module.lessons.map((l, idx) => {
              const isCurrent = l.id === lesson.id;
              return (
                <Link
                  key={l.id}
                  href={`/aula/${l.slug}`}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                    isCurrent
                      ? "border-everest-red/50 bg-everest-red/10"
                      : "border-everest-gray bg-everest-black/50 hover:bg-everest-gray/50"
                  }`}
                >
                  <span className={`text-xs font-bold ${isCurrent ? "text-everest-red" : "text-everest-stone"}`}>
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <div>
                    <p className={`text-xs font-bold leading-tight ${isCurrent ? "text-everest-snow" : "text-everest-stone"}`}>
                      {l.title}
                    </p>
                    {l.duration && (
                      <p className="text-everest-stone text-[10px] mt-1">{l.duration} min</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {nextLesson && (
            <Link
              href={`/aula/${nextLesson.slug}`}
              className="flex items-center justify-between p-4 rounded-xl bg-everest-red hover:bg-everest-red-dark text-white font-bold transition-all mt-8 group"
            >
              <span>Próxima aula</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
