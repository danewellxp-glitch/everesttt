"use client"

const camps = [
  {
    emoji: "🏕", label: "BASE CAMP",
    title: "Nenhuma grande ascensão começa sem uma base sólida.",
    topics: ["Sono estratégico", "Energia física", "Exercício físico", "Saúde mental", "Ritmo biológico"],
    accent: "#8B949E",
  },
  {
    emoji: "🧠", label: "CAMP 1 — Clareza Mental",
    title: "Quem controla a própria mente controla a própria vida.",
    topics: ["Controle da atenção", "Redução de distrações", "Organização mental", "Controle de dopamina"],
    accent: "#1F6FEB",
  },
  {
    emoji: "🔁", label: "CAMP 2 — Reprogramação",
    title: "A trivialidade da excelência.",
    topics: ["Quebra de padrões sabotadores", "Motivação x Disciplina", "Arquitetura comportamental"],
    accent: "#E57B3B",
  },
  {
    emoji: "⚙️", label: "CAMP 3 — Constância",
    title: "O topo pertence a quem continua subindo.",
    topics: ["Rotina inteligente", "Produtividade", "Gestão de energia", "Persistência"],
    accent: "#D7C7AB",
  },
  {
    emoji: "🚀", label: "CAMP 4 — Expansão",
    title: "Quem aprende mais rápido sobe mais alto.",
    topics: ["Estudo eficiente", "Aprendizado acelerado", "Desenvolvimento pessoal", "Growth Mindset"],
    accent: "#8B5CF6",
  },
  {
    emoji: "🏔", label: "CUME — Autodomínio",
    title: "O verdadeiro topo é o domínio de si mesmo.",
    topics: ["Autoconhecimento profundo", "Liderança pessoal", "Direção de vida", "Alta performance"],
    accent: "#D7C7AB",
    glow: true,
  },
]

export function FrameworkSection() {
  return (
    <section
      className="py-24 px-6"
      style={{
        background:   "#EDE3D8",
        borderRadius: "30px 30px 0 0",
        marginTop:    "-20px",
        position:     "relative",
        zIndex:       4,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-6">
          <span
            className="px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest"
            style={{ background: "#D7C7AB", color: "#101010" }}
          >
            O FRAMEWORK
          </span>
        </div>

        <h2
          className="font-heading font-extrabold text-center mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#101010" }}
        >
          Cada camp é um{" "}
          <span style={{ color: "#A61919" }}>nível de evolução</span>
        </h2>
        <p className="text-center mb-14 text-lg" style={{ color: "#555555" }}>
          Do Base Camp ao Cume — seis estágios de transformação real
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {camps.map((camp, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{
                background:  "#FFFFFF",
                boxShadow:   camp.glow
                  ? `0 8px 32px rgba(0,0,0,0.12), 0 0 0 2px ${camp.accent}`
                  : "0 6px 16px rgba(0,0,0,0.09)",
              }}
            >
              <div className="text-4xl mb-3">{camp.emoji}</div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: camp.accent }}>
                {camp.label}
              </p>
              <h3 className="font-heading font-bold text-lg mb-4 leading-tight" style={{ color: "#101010" }}>
                {camp.title}
              </h3>
              <ul className="space-y-1.5">
                {camp.topics.map((topic) => (
                  <li key={topic} className="flex items-center gap-2 text-sm" style={{ color: "#555555" }}>
                    <span style={{ color: camp.accent }} className="text-xs">▸</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
