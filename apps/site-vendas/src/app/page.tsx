import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/sections/HeroSection"
import { VSLSection } from "@/components/sections/VSLSection"
import { DorSection } from "@/components/sections/DorSection"
import { MetodoSection } from "@/components/sections/MetodoSection"
import { FrameworkSection } from "@/components/sections/FrameworkSection"
import { BeneficiosSection } from "@/components/sections/BeneficiosSection"
import { ObjecoesSection } from "@/components/sections/ObjecoesSection"
import { OfertaSection } from "@/components/sections/OfertaSection"
import { BonusSection } from "@/components/sections/BonusSection"
import { GarantiaSection } from "@/components/sections/GarantiaSection"
import { FAQSection } from "@/components/sections/FAQSection"
import { QuizSection } from "@/components/sections/QuizSection"

export default function Home() {
  return (
    <main style={{ background: "#FFFCEE" }}>
      <Navbar />
      <HeroSection />
      <VSLSection />
      <DorSection />
      <MetodoSection />
      <FrameworkSection />
      <BeneficiosSection />
      <ObjecoesSection />
      <OfertaSection />
      <BonusSection />
      <GarantiaSection />
      <QuizSection />
      <FAQSection />

      {/* Footer */}
      <footer
        className="py-10 px-6 text-center"
        style={{
          background:  "#EDE3D8",
          borderRadius: "30px 30px 0 0",
          marginTop:   "-20px",
          position:    "relative",
          zIndex:      12,
        }}
      >
        <p
          className="font-heading font-extrabold text-2xl mb-2"
          style={{ color: "#A61919" }}
        >
          ⛰ EVEREST
        </p>
        <p className="text-sm" style={{ color: "#555555" }}>
          © {new Date().getFullYear()} EVEREST. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  )
}
