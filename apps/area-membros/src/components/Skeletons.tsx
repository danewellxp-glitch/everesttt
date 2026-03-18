const skeletonBase = "rounded-2xl shimmer-bg animate-pulse";
const cardBg = { background: "#131823", border: "1px solid rgba(255,255,255,0.05)" };

export function ProgressSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className={`col-span-2 h-36 ${skeletonBase}`} style={cardBg} />
      <div className={`h-36 ${skeletonBase}`} style={cardBg} />
    </div>
  );
}

export function ModulesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={`h-52 ${skeletonBase}`} style={cardBg} />
      ))}
    </div>
  );
}

export function LessonListSkeleton() {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={`h-14 ${skeletonBase}`} style={cardBg} />
      ))}
    </div>
  );
}

export function PlayerSkeleton() {
  return (
    <div
      className={`w-full ${skeletonBase}`}
      style={{ paddingBottom: "56.25%", position: "relative", ...cardBg }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
      </div>
    </div>
  );
}
