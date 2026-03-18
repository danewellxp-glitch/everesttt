import { CTAButton } from "../CTAButton"

const itens = [
  { emoji: "🏔", text: "O método EVEREST completo" },
  { emoji: "🎥", text: "Aulas práticas e objetivas" },
  { emoji: "📈", text: "Sistema de evolução pessoal em 6 níveis" },
  { emoji: "👥", text: "Comunidade de pessoas evoluindo juntas" },
]

export function OfertaSection() {
  return (
    <section
      className="py-24 px-6"
      style={{
        background:   "#0E0E0E",
        borderRadius: "30px 30px 0 0",
        marginTop:    "-20px",
        position:     "relative",
        zIndex:       7,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <span
            className="px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest"
            style={{ background: "#D7C7AB", color: "#101010" }}
          >
            A OFERTA
          </span>
        </div>

        <h2
          className="font-heading font-extrabold text-center mb-10"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#FFFCEE" }}
        >
          Ao entrar no EVEREST você terá{" "}
          <span style={{ color: "#D7C7AB" }}>acesso a:</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
          {itens.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-5 rounded-2xl transition-colors duration-300"
              style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="font-semibold" style={{ color: "#FFFCEE" }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Planos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Mensal */}
          <div
            className="p-6 rounded-2xl text-center"
            style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,252,238,0.5)" }}>
              Plano Mensal
            </p>
            <p className="font-heading font-extrabold text-4xl mb-1" style={{ color: "#FFFCEE" }}>
              R$ 39,90
            </p>
            <p className="text-sm" style={{ color: "rgba(255,252,238,0.4)" }}>/mês</p>
          </div>

          {/* Anual — destaque */}
          <div
            className="p-6 rounded-2xl text-center relative overflow-hidden"
            style={{
              background:  "linear-gradient(135deg, #1a0a00 0%, #1A1A1A 100%)",
              border:      "2px solid #D7C7AB",
              boxShadow:   "0 0 40px rgba(215,199,171,0.15)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 flex justify-center">
              <span
                className="text-xs font-extrabold px-6 py-1 rounded-b-lg uppercase tracking-widest"
                style={{ background: "#D7C7AB", color: "#101010" }}
              >
                MAIS POPULAR
              </span>
            </div>
            <div className="mt-5">
              <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "#D7C7AB" }}>
                Plano Anual
              </p>
              <p className="font-heading font-extrabold text-4xl mb-1" style={{ color: "#FFFCEE" }}>
                R$ 397,00
              </p>
              <p className="text-sm" style={{ color: "rgba(255,252,238,0.4)" }}>/ano</p>
              <p className="text-xs mt-2 font-semibold" style={{ color: "#D7C7AB" }}>
                Economize R$ 81,80
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <CTAButton text="COMEÇAR A MINHA TRANSFORMAÇÃO" size="large" className="w-full max-w-xl" />
        </div>
      </div>
    </section>
  )
}
