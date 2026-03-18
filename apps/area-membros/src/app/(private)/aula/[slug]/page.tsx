import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@everest/db";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, ChevronRight } from "lucide-react";
import { LessonPlayer } from "@/components/LessonPlayer";
import { MarkCompleteButton } from "@/components/MarkCompleteButton";

type SiblingLesson = { id: string; title: string; slug: string };
type ProgressItem = { completed: boolean };
type LessonFull = {
  id: string; title: string; slug: string;
  description: string | null; videoUrl: string | null; pdfUrl: string | null;
  module: { title: string; slug: string; lessons: SiblingLesson[] };
  progress: ProgressItem[];
};

export default async function AulaPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const lesson = (await prisma.lesson.findUnique({
    where: { slug: params.slug, isPublished: true },
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
  })) as unknown as LessonFull | null;

  if (!lesson) notFound();

  const moduleSlug = lesson.module.slug;
  const allLessons = lesson.module.lessons;
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isCompleted = lesson.progress.some((p) => p.completed);

  return (
    <div className="p-8 max-w-4xl animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-everest-stone mb-8">
        <Link href="/dashboard" className="hover:text-everest-snow transition-colors">
          Dashboard
        </Link>
        <ChevronRight size={12} className="opacity-40" />
        <Link
          href={`/modulos/${moduleSlug}`}
          className="hover:text-everest-snow transition-colors"
        >
          {lesson.module.title}
        </Link>
        <ChevronRight size={12} className="opacity-40" />
        <span className="text-everest-muted truncate max-w-[200px]">{lesson.title}</span>
      </div>

      {/* Player */}
      <LessonPlayer videoUrl={lesson.videoUrl} />

      {/* Title + actions */}
      <div className="mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-everest-snow text-2xl mb-2">
            {lesson.title}
          </h1>
          {lesson.description && (
            <p className="text-everest-muted leading-relaxed">{lesson.description}</p>
          )}
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          {lesson.pdfUrl && (
            <a
              href={lesson.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-everest-snow text-sm font-medium transition-all hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Download size={15} />
              PDF
            </a>
          )}
          <MarkCompleteButton lessonId={lesson.id} isCompleted={isCompleted} />
        </div>
      </div>

      {/* Navigation between lessons */}
      <div className="flex items-center justify-between mt-10 pt-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {prevLesson ? (
          <Link
            href={`/aula/${prevLesson.slug}`}
            className="group flex items-center gap-2 text-sm font-medium transition-colors text-everest-stone hover:text-everest-snow"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="max-w-[200px] truncate">{prevLesson.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/aula/${nextLesson.slug}`}
            className="group flex items-center gap-2 text-sm font-semibold transition-all hover:scale-[1.02] px-4 py-2 rounded-xl"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(29,78,216,0.08))",
              border: "1px solid rgba(59,130,246,0.2)",
              color: "#60A5FA",
            }}
          >
            <span className="max-w-[200px] truncate">{nextLesson.title}</span>
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
