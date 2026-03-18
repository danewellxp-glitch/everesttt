interface AltitudeBadgeProps {
  camp: string;
  size?: "sm" | "md" | "lg";
}

const campConfig: Record<string, { color: string; glow: string; label: string }> = {
  "BASE CAMP": { color: "#7A8899", glow: "rgba(122,136,153,0.2)", label: "BASE CAMP" },
  "CAMP 1":    { color: "#3B82F6", glow: "rgba(59,130,246,0.25)",  label: "CAMP 1"    },
  "CAMP 2":    { color: "#F97316", glow: "rgba(249,115,22,0.25)",  label: "CAMP 2"    },
  "CAMP 3":    { color: "#F5C842", glow: "rgba(245,200,66,0.25)",  label: "CAMP 3"    },
  "CAMP 4":    { color: "#A855F7", glow: "rgba(168,85,247,0.25)",  label: "CAMP 4"    },
  "CUME":      { color: "#F5C842", glow: "rgba(245,200,66,0.35)",  label: "⛰ CUME"   },
};

export function AltitudeBadge({ camp, size = "md" }: AltitudeBadgeProps) {
  const config = campConfig[camp] ?? campConfig["BASE CAMP"];

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center font-bold uppercase tracking-widest rounded-lg font-heading ${sizes[size]}`}
      style={{
        color: config.color,
        background: `${config.glow}`,
        border: `1px solid ${config.color}35`,
      }}
    >
      {config.label}
    </span>
  );
}
