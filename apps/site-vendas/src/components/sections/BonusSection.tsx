const checklistItems = [
  "✅ Acordar no horário certo para o seu ritmo biológico",
  "✅ 20 minutos de movimento físico",
  "✅ Leitura ou aprendizado de 15 minutos",
  "✅ Revisão das prioridades do dia",
  "✅ Registro do progresso antes de dormir",
]

export function BonusSection() {
  return (
    <section
      className="py-24 px-6"
      style={{
        background:   "#EDE3D8",
        borderRadius: "30px 30px 0 0",
        marginTop:    "-20px",
        position:     "relative",
        zIndex:       8,
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <span
            className="px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest"
            style={{ background: "#D7C7AB", color: "#101010" }}
          >
            🎁 BÔNUS EXCLUSIVO
          </span>
        </div>

        <h2
          className="font-heading font-extrabold mb-2"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#101010" }}
        >
          Checklist de Hábitos Diários
        </h2>
        <p className="font-semibold text-xl mb-3" style={{ color: "#A61919" }}>
          Rotina de Alta Performance
        </p>
        <p className="text-lg mb-10" style={{ color: "#555555" }}>
          Sistema simples para acompanhar sua evolução todos os dias.
        </p>

        {/* Mockup do checklist */}
        <div
          className="rounded-2xl p-8 text-left max-w-md mx-auto"
          style={{ background: "#FFFFFF", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
        >
          <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: "1px solid #EDE3D8" }}>
            <span className="text-2xl">⛰</span>
            <div>
              <p className="font-heading font-bold text-sm" style={{ color: "#A61919" }}>EVEREST</p>
              <p className="text-xs" style={{ color: "#555555" }}>Checklist de Alta Performance</p>
            </div>
          </div>
          <ul className="space-y-3">
            {checklistItems.map((item, i) => (
              <li key={i} className="text-sm" style={{ color: "#101010" }}>{item}</li>
            ))}
          </ul>
          <div className="mt-6 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid #EDE3D8" }}>
            <span className="text-xs" style={{ color: "#555555" }}>Progresso hoje</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="w-6 h-2 rounded-full"
                  style={{ background: n <= 3 ? "#A61919" : "#EDE3D8" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
