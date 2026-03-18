const objecoes = [
  {
    pergunta: "Eu já tentei mudar hábitos antes.",
    resposta: "Eu também já passei por isso. Já estava cansado de fórmulas mágicas, achava que nada iria me ajudar. Até perceber algo: a diferença agora é que você vai entender como o cérebro realmente constrói padrões comportamentais.",
  },
  {
    pergunta: "Em quanto tempo começo a ver resultados?",
    resposta: "Muitas pessoas começam a perceber mudanças nas primeiras semanas. Mas o objetivo do método não é transformação instantânea. É construir uma evolução consistente e sustentável.",
  },
]

export function ObjecoesSection() {
  return (
    <section
      className="py-24 px-6"
      style={{
        background:   "#FFFCEE",
        borderRadius: "30px 30px 0 0",
        marginTop:    "-20px",
        position:     "relative",
        zIndex:       6,
      }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="font-heading font-extrabold text-center mb-12"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#101010" }}
        >
          Talvez você esteja{" "}
          <span style={{ color: "#555555" }}>pensando:</span>
        </h2>

        <div className="space-y-6">
          {objecoes.map((obj, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 6px 16px rgba(0,0,0,0.09)" }}
            >
              <div className="p-6" style={{ background: "#101010" }}>
                <p className="font-heading font-bold text-xl flex items-start gap-3" style={{ color: "#FFFCEE" }}>
                  <span style={{ color: "#F92726" }} className="mt-0.5 flex-shrink-0">"</span>
                  {obj.pergunta}
                </p>
              </div>
              <div className="p-6" style={{ background: "#FFFFFF" }}>
                <p className="leading-relaxed text-lg" style={{ color: "#555555" }}>
                  {obj.resposta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
