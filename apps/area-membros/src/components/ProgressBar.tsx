interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  color = "#E3B341",
  className = "",
}: ProgressBarProps) {
  const percent = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div
      className={`h-2 bg-everest-gray rounded-full overflow-hidden ${className}`}
    >
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${percent}%`, background: color }}
      />
    </div>
  );
}
