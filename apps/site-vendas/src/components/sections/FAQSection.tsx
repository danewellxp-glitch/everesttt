"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { CTAButton } from "../CTAButton"

const faqs = [
  {
    q: "Quais as formas de pagamento?",
    a: "Cartão de crédito, Pix e PayPal. O pagamento é processado com segurança pela Hotmart.",
  },
  {
    q: "Terei quanto tempo de acesso?",
    a: "Você terá acesso por 1 ano no plano anual ou 1 mês no plano mensal, renovado automaticamente. Enviaremos e-mail de aviso antes da renovação.",
  },
  {
    q: "Quanto tempo preciso me dedicar por dia?",
    a: "As aulas são curtas e práticas. O objetivo é que você aplique pequenos ajustes diários que, ao longo do tempo, geram grandes mudanças.",
  },
  {
    q: "O EVEREST é para mim?",
    a: "É para quem quer construir hábitos mais saudáveis com base no conhecimento. Para quem está disposto a fazer o básico bem feito, todos os dias.",
  },
  {
    q: "Eu já tentei mudar hábitos antes. Qual a diferença?",
    a: "A diferença é que desta vez você vai entender o mecanismo mental por trás dos seus padrões. Não é sobre força de vontade — é sobre reprogramação comportamental.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      className="py-24 px-6"
      style={{
        background:   "#EDE3D8",
        borderRadius: "30px 30px 0 0",
        marginTop:    "-20px",
        position:     "relative",
        zIndex:       10,
      }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="font-heading font-extrabold text-center mb-12"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#101010" }}
        >
          Perguntas{" "}
          <span style={{ color: "#555555" }}>frequentes</span>
        </h2>

        <div className="space-y-3 mb-16">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors duration-200"
                style={{ background: "#FFFFFF" }}
              >
                <span className="font-heading font-semibold text-lg pr-4" style={{ color: "#101010" }}>
                  {faq.q}
                </span>
                <ChevronDown
                  size={20}
                  style={{
                    color:     "#A61919",
                    flexShrink: 0,
                    transition: "transform 0.3s",
                    transform:  openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openIndex === i ? "300px" : "0px" }}
              >
                <p className="px-6 pb-6 leading-relaxed" style={{ color: "#555555", background: "#FFFFFF" }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <CTAButton text="ENTRAR PARA O EVEREST AGORA" size="large" className="w-full max-w-xl" />
        </div>
      </div>
    </section>
  )
}
