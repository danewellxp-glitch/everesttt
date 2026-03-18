import Link from "next/link";
import { ProgressBar } from "./ProgressBar";
import { AltitudeBadge } from "./AltitudeBadge";
import { BookOpen, CheckCircle2 } from "lucide-react";

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
  const isComplete = percent === 100;

  return (
    <div className="card-hover rounded-2xl flex flex-col overflow-hidden relative group" style={{
      background: "linear-gradient(145deg, #131823 0%, #0E1117 100%)",
      border: "1px solid rgba(255,255,255,0.06)",
    }}>
      {/* Top accent bar */}
      <div className="h-0.5 w-full" style={{
        background: isComplete
          ? "linear-gradient(90deg, #14B8A6, #3B82F6)"
          : hasStarted
          ? "linear-gradient(90deg, #F5C842, #E8A600)"
          : "linear-gradient(90deg, #263040, #1E2636)",
      }} />

      <div className="p-5 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {emoji}
          </div>
          <AltitudeBadge camp={campLabel} size="sm" />
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-everest-snow text-base mb-1 leading-tight group-hover:text-white transition-colors">
          {title}
        </h3>

        {/* Lesson count */}
        <div className="flex items-center gap-1.5 text-everest-stone text-xs mb-4">
          <BookOpen size={12} />
          <span>{completedLessons}/{totalLessons} aulas</span>
          {isComplete && <CheckCircle2 size={12} className="text-teal-400 ml-1" />}
        </div>

        {/* Progress */}
        <ProgressBar
          value={completedLessons}
          max={totalLessons}
          color={isComplete ? "#14B8A6" : hasStarted ? "#F5C842" : "#263040"}
          className="mb-5"
        />

        {/* CTA */}
        <Link
          href={`/modulos/${slug}`}
          className="mt-auto block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={isComplete ? {
            background: "linear-gradient(135deg, rgba(20,184,166,0.15), rgba(59,130,246,0.1))",
            border: "1px solid rgba(20,184,166,0.3)",
            color: "#5EEAD4",
          } : hasStarted ? {
            background: "linear-gradient(135deg, rgba(245,200,66,0.15), rgba(232,166,0,0.08))",
            border: "1px solid rgba(245,200,66,0.25)",
            color: "#F5C842",
          } : {
            background: "rgba(59,130,246,0.12)",
            border: "1px solid rgba(59,130,246,0.25)",
            color: "#60A5FA",
          }}
        >
          {isComplete ? "✓ Revisitar" : hasStarted ? "▶ Continuar" : "→ Começar"}
        </Link>
      </div>
    </div>
  );
}
