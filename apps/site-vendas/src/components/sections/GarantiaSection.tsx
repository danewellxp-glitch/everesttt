import { CTAButton } from "../CTAButton"
import { Shield } from "lucide-react"

export function GarantiaSection() {
  return (
    <section
      className="py-24 px-6"
      style={{
        background:   "#FFFCEE",
        borderRadius: "30px 30px 0 0",
        marginTop:    "-20px",
        position:     "relative",
        zIndex:       9,
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div
          className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8"
          style={{ background: "#EDE3D8" }}
        >
          <Shield size={40} style={{ color: "#A61919" }} />
        </div>

        <h2
          className="font-heading font-extrabold mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#101010" }}
        >
          Garantia de{" "}
          <span style={{ color: "#A61919" }}>7 dias</span>
        </h2>

        <p className="text-xl leading-relaxed mb-10" style={{ color: "#555555" }}>
          Se dentro de 7 dias você sentir que o EVEREST não é para você, basta
          solicitar o reembolso. Sem perguntas, sem burocracia.
        </p>

        <CTAButton text="QUERO CONSTRUIR DISCIPLINA DE VERDADE" size="large" className="w-full max-w-xl" />
      </div>
    </section>
  )
}
