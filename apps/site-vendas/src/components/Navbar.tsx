export function Navbar() {
  const membrosUrl = process.env.NEXT_PUBLIC_AREA_MEMBROS_URL || "http://localhost:3001"

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(255,252,238,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="font-heading font-extrabold text-2xl tracking-tight"
          style={{ color: "#A61919" }}
        >
          ⛰ EVEREST
        </div>
        <a
          href={`${membrosUrl}/login`}
          className="text-sm font-semibold transition-colors duration-200 flex items-center gap-1 px-4 py-2 rounded-full"
          style={{ color: "#101010", border: "1px solid rgba(0,0,0,0.15)" }}
        >
          Já sou aluno →
        </a>
      </div>
    </nav>
  )
}
