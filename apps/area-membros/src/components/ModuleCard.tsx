import Link from "next/link";
import { ProgressBar } from "./ProgressBar";
import { AltitudeBadge } from "./AltitudeBadge";

interface ModuleCardProps {
  title: string;
  slug: string;
  emoji: string;
  campLabel: string;
  completedLessons: number;
  totalLessons: number;
  hasStarted: boolean;
}

export function ModuleCard({
  title,
  slug,
  emoji,
  campLabel,
  completedLessons,
  totalLessons,
  hasStarted,
}: ModuleCardProps) {
  const percent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="p-5 rounded-xl border border-everest-gray bg-everest-dark hover:border-everest-stone/30 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{emoji}</span>
        <AltitudeBadge camp={campLabel} size="sm" />
      </div>

      <h3 className="font-heading font-bold text-everest-snow text-lg mb-1 leading-tight">
        {title}
      </h3>

      <p className="text-everest-stone text-xs mb-4">
        {completedLessons}/{totalLessons} aulas concluídas
      </p>

      <ProgressBar value={completedLessons} max={totalLessons} className="mb-4" />

      <Link
        href={`/modulos/${slug}`}
        className="block w-full text-center py-2.5 rounded-lg border border-everest-gray text-everest-snow text-sm font-semibold hover:bg-everest-gray transition-colors duration-200"
      >
        {percent === 100 ? "Revisitar" : hasStarted ? "Continuar" : "Começar"}
      </Link>
    </div>
  );
}
