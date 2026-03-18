export function MetodoSection() {
  const camps = ["Base Camp", "Camp 1", "Camp 2", "Camp 3", "Camp 4", "Cume"]

  return (
    <section
      className="py-24 px-6"
      style={{
        background:   "#0E0E0E",
        borderRadius: "30px 30px 0 0",
        marginTop:    "-20px",
        position:     "relative",
        zIndex:       3,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <span
            className="px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest"
            style={{ background: "#D7C7AB", color: "#101010" }}
          >
            O MÉTODO
          </span>
        </div>

        <h2
          className="font-heading font-extrabold text-center mb-6"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#FFFCEE" }}
        >
          Apresentando o{" "}
          <span style={{ color: "#F92726" }}>EVEREST</span>
        </h2>

        <p className="text-xl text-center max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: "rgba(255,252,238,0.6)" }}>
          Uma estrutura simples que mostra como construir hábitos fortes,
          organizar sua rotina e evoluir com constância — melhorando um pouco
          todos os dias, sem extremos ou fórmulas mágicas.
        </p>

        <blockquote
          className="pl-6 py-2 mb-16 max-w-2xl mx-auto"
          style={{ borderLeft: "4px solid #D7C7AB" }}
        >
          <p className="text-lg italic leading-relaxed" style={{ color: "#FFFCEE" }}>
            "O EVEREST não é sobre chegar ao topo. É sobre se tornar a pessoa
            capaz de chegar lá. Toda grande ascensão começa com um passo… mas
            só quem constrói base chega ao topo."
          </p>
        </blockquote>

        {/* Linha do tempo */}
        <div className="relative">
          <div
            className="hidden md:block absolute top-5 left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(to right, #1A1A1A, #D7C7AB, #1A1A1A)" }}
          />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {camps.map((camp, i) => (
              <div key={i} className="flex flex-col items-center gap-2 relative z-10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2"
                  style={
                    i === camps.length - 1
                      ? { background: "#D7C7AB", borderColor: "#D7C7AB", color: "#101010" }
                      : { background: "#0E0E0E", borderColor: "#333", color: "#FFFCEE" }
                  }
                >
                  {i + 1}
                </div>
                <span className="text-xs font-semibold whitespace-nowrap text-center" style={{ color: "rgba(255,252,238,0.5)" }}>
                  {camp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
