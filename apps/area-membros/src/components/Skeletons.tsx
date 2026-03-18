export function ProgressSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-pulse">
      <div className="col-span-2 p-6 rounded-xl border border-everest-gray bg-everest-dark h-32" />
      <div className="p-6 rounded-xl border border-everest-gray bg-everest-dark h-32" />
    </div>
  )
}

export function ModulesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="p-5 rounded-xl border border-everest-gray bg-everest-dark h-48"
        />
      ))}
    </div>
  )
}

export function LessonListSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-16 rounded-xl border border-everest-gray bg-everest-dark"
        />
      ))}
    </div>
  )
}

export function PlayerSkeleton() {
  return (
    <div
      className="w-full rounded-xl bg-everest-dark animate-pulse"
      style={{ paddingBottom: "56.25%", position: "relative" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-everest-gray" />
      </div>
    </div>
  )
}
