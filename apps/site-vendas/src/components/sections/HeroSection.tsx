"use client"

import { CTAButton } from "../CTAButton"

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20 overflow-hidden"
      style={{ background: "#FFFCEE" }}
    >
      {/* Gradiente decorativo de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(169,25,25,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-10"
          style={{ background: "#D7C7AB", color: "#101010" }}
        >
          <span>⛰</span>
          <span>Método EVEREST</span>
        </div>

        {/* Headline */}
        <h1
          className="font-heading font-extrabold uppercase leading-none mb-8"
          style={{
            fontSize:    "clamp(2.8rem, 8vw, 6rem)",
            color:       "#A61919",
            letterSpacing: "-0.02em",
            lineHeight:  "1.0",
          }}
        >
          IGNORAR O PROCESSO
          <br />
          <span style={{ color: "#101010" }}>DOS SEUS HÁBITOS</span>
          <br />
          <span style={{ color: "#101010" }}>ESTÁ SABOTANDO</span>
          <br />
          A SUA VIDA
        </h1>

        {/* Subheadline */}
        <p
          className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: "#555555", fontWeight: 400 }}
        >
          A transformação da sua rotina começa quando você entende os padrões
          mentais invisíveis que estão guiando suas decisões
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-5">
          <CTAButton
            text="QUERO APRENDER A ESTRUTURAR MEUS HÁBITOS"
            size="large"
            className="w-full max-w-xl"
          />

          {/* Trust line */}
          <p className="text-sm flex flex-wrap justify-center gap-x-5 gap-y-1" style={{ color: "#555555" }}>
            <span>🔒 Compra 100% segura</span>
            <span style={{ color: "#D7C7AB" }}>·</span>
            <span>✅ Garantia de 7 dias</span>
            <span style={{ color: "#D7C7AB" }}>·</span>
            <span>⚡ Acesso imediato</span>
          </p>
        </div>

        {/* Cards de pilares */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {[
            { emoji: "📚", label: "Leitura" },
            { emoji: "🏃", label: "Exercício" },
            { emoji: "😴", label: "Sono" },
            { emoji: "🧘", label: "Paz mental" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl"
              style={{
                background:  "#FFFFFF",
                boxShadow:   "0 6px 16px rgba(0,0,0,0.09)",
              }}
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="text-sm font-semibold" style={{ color: "#101010" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
