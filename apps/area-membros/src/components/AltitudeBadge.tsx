interface AltitudeBadgeProps {
  camp: string;
  size?: "sm" | "md" | "lg";
}

const campColors: Record<string, string> = {
  "BASE CAMP": "#8B949E",
  "CAMP 1": "#1F6FEB",
  "CAMP 2": "#E57B3B",
  "CAMP 3": "#E3B341",
  "CAMP 4": "#9B59B6",
  CUME: "#E3B341",
};

export function AltitudeBadge({ camp, size = "md" }: AltitudeBadgeProps) {
  const color = campColors[camp] || "#8B949E";

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={`inline-flex items-center font-bold uppercase tracking-widest rounded-full ${sizes[size]}`}
      style={{
        color,
        background: `${color}15`,
        border: `1px solid ${color}40`,
      }}
    >
      {camp}
    </span>
  );
}
