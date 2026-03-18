import { CircleAlert } from "lucide-react"

export function DorSection() {
  const cards = [
    { emoji: "🔥", title: "Motivação inicial", desc: "Você começa com energia total" },
    { emoji: "📉", title: "Queda",             desc: "Alguns dias depois a rotina antiga volta" },
    { emoji: "🔄", title: "Reset",             desc: "Você volta à estaca zero, frustrado" },
  ]

  return (
    <section
      className="py-24 px-6"
      style={{
        background:   "#EDE3D8",
        borderRadius: "30px 30px 0 0",
        marginTop:    "-20px",
        position:     "relative",
        zIndex:       2,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-heading font-extrabold text-center mb-8"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#101010" }}
        >
          Você já tentou mudar sua vida{" "}
          <span style={{ color: "#A61919" }}>várias vezes…</span>
        </h2>

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4" style={{ color: "#555555", fontSize: "18px", lineHeight: "1.7" }}>
          <p>
            No começo parece que vai dar certo — organizar sua rotina, estudar com constância,
            acordar mais cedo ou criar hábitos melhores. Mas depois de alguns dias tudo volta
            ao mesmo padrão e os hábitos antigos retornam.
          </p>
          <p>
            A maioria das pessoas tenta mudar a própria vida sem uma estrutura clara de evolução,
            sem entender como criar e sustentar novos hábitos.
          </p>
          <p className="font-semibold" style={{ color: "#101010" }}>
            O problema não é falta de disciplina. É um padrão mental invisível.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl text-center"
              style={{ background: "#FFFFFF", boxShadow: "0 6px 16px rgba(0,0,0,0.09)" }}
            >
              {i < cards.length - 1 && (
                <div
                  className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 z-10 text-xl font-bold"
                  style={{ color: "#A61919" }}
                >
                  →
                </div>
              )}
              <div className="w-4/5 h-4/5 bg-white rounded-[40px] flex items-center justify-center shadow-2xl rotate-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-ev-red/5" />
                <CircleAlert size={80} className="text-ev-red filter drop-shadow-[0_10px_15px_rgba(249,39,38,0.2)]" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2" style={{ color: "#101010" }}>
                {card.title}
              </h3>
              <p className="text-sm" style={{ color: "#555555" }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
