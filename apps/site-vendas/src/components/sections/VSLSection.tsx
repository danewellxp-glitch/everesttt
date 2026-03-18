import { CTAButton } from "../CTAButton"

interface VSLSectionProps {
  videoUrl?: string
}

function VideoPlayer({ videoUrl }: { videoUrl?: string }) {
  if (videoUrl) {
    return (
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={videoUrl}
          className="absolute inset-0 w-full h-full rounded-2xl"
          allowFullScreen
          allow="autoplay; fullscreen"
        />
      </div>
    )
  }

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer group"
      style={{ paddingBottom: "56.25%", background: "#1A1A1A" }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ background: "linear-gradient(135deg, #F92726, #A61919)" }}
        >
          <div
            className="w-0 h-0 ml-1"
            style={{
              borderTop:    "14px solid transparent",
              borderBottom: "14px solid transparent",
              borderLeft:   "22px solid white",
            }}
          />
        </div>
        <p style={{ color: "rgba(255,252,238,0.5)", fontSize: "14px" }}>Vídeo em breve</p>
      </div>
    </div>
  )
}

export function VSLSection({ videoUrl }: VSLSectionProps) {
  const bullets = [
    "Por que disciplina não depende apenas de força de vontade",
    "O erro invisível que faz você abandonar qualquer hábito",
    "Como reprogramar sua mente para criar hábitos consistentes",
    "Por que pequenas melhorias diárias geram resultados gigantes no longo prazo",
    "Como sair da procrastinação e construir constância real",
  ]

  return (
    <section
      className="py-24 px-6"
      style={{
        background:   "#0E0E0E",
        borderRadius: "30px 30px 0 0",
        marginTop:    "-20px",
        position:     "relative",
        zIndex:       1,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-heading font-bold text-center mb-10"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#FFFCEE" }}
        >
          Assista ao vídeo abaixo e descubra:
        </h2>

        <VideoPlayer videoUrl={videoUrl} />

        <ul className="mt-10 space-y-4">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="font-bold flex-shrink-0 mt-0.5" style={{ color: "#D7C7AB" }}>
                ✦
              </span>
              <span style={{ color: "#FFFCEE", fontSize: "18px" }}>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <CTAButton text="QUERO APRENDER A ESTRUTURAR MEUS HÁBITOS" size="large" className="w-full max-w-xl" />
        </div>
      </div>
    </section>
  )
}
