interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  color,
  className = "",
}: ProgressBarProps) {
  const percent = Math.min(Math.round((value / max) * 100), 100);
  const bgColor = color || "#F5C842";

  return (
    <div
      className={`h-1.5 rounded-full overflow-hidden ${className}`}
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{
          width: `${percent}%`,
          background: bgColor === "#14B8A6"
            ? "linear-gradient(90deg, #14B8A6, #06B6D4)"
            : bgColor === "#263040"
            ? "#263040"
            : "linear-gradient(90deg, #F5C842, #E8A600)",
          boxShadow: bgColor === "#263040"
            ? "none"
            : bgColor === "#14B8A6"
            ? "0 0 6px rgba(20,184,166,0.5)"
            : "0 0 6px rgba(245,200,66,0.4)",
        }}
      />
    </div>
  );
}
