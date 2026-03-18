import { CTAButton } from "../CTAButton"

const beneficios = [
  "Construir disciplina real",
  "Organizar sua rotina",
  "Melhorar seu sono e energia",
  "Desenvolver constância",
  "Estudar com eficiência",
  "Fortalecer sua saúde mental",
]

export function BeneficiosSection() {
  return (
    <section
      className="py-24 px-6"
      style={{
        background:   "#0E0E0E",
        borderRadius: "30px 30px 0 0",
        marginTop:    "-20px",
        position:     "relative",
        zIndex:       5,
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <span
            className="px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest"
            style={{ background: "#D7C7AB", color: "#101010" }}
          >
            BENEFÍCIOS
          </span>
        </div>

        <h2
          className="font-heading font-extrabold mb-12"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#FFFCEE" }}
        >
          Dentro do EVEREST você vai{" "}
          <span style={{ color: "#F92726" }}>aprender a:</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12 text-left">
          {beneficios.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="font-bold text-lg flex-shrink-0" style={{ color: "#D7C7AB" }}>
                ✔
              </span>
              <span className="font-medium" style={{ color: "#FFFCEE" }}>{b}</span>
            </div>
          ))}
        </div>

        <CTAButton text="QUERO APRENDER O MÉTODO EVEREST" size="large" className="w-full max-w-xl" />
      </div>
    </section>
  )
}
