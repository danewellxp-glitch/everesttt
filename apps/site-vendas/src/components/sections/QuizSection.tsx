"use client"

import { useState } from "react"
import { CTAButton } from "../CTAButton"

const questions = [
  {
    pergunta: "Você mantém bons hábitos por mais de 30 dias?",
    opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente"],
  },
  {
    pergunta: "Como está sua energia diária?",
    opcoes: ["Sempre cansado", "Baixa", "Média", "Alta"],
  },
  {
    pergunta: "Sua rotina é organizada?",
    opcoes: ["Completamente desorganizada", "Parcialmente", "Razoável", "Muito organizada"],
  },
  {
    pergunta: "Você tem clareza sobre seus objetivos?",
    opcoes: ["Nenhuma", "Pouca", "Razoável", "Total"],
  },
  {
    pergunta: "Você procrastina tarefas importantes?",
    opcoes: ["Sempre", "Frequentemente", "Às vezes", "Quase nunca"],
  },
]

interface QuizResult {
  total: number
  level: string
  emoji: string
  description: string
}

export function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<QuizResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAnswer = async (value: number) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setLoading(true)
      try {
        const res = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: newAnswers }),
        })
        const data = await res.json() as QuizResult
        setResult(data)
      } catch {
        const total = newAnswers.reduce((s, v) => s + v, 0)
        if (total <= 9)       setResult({ total, level: "BASE CAMP", emoji: "🔴", description: "Você ainda está construindo sua base. Foco: sono, energia, organização." })
        else if (total <= 14) setResult({ total, level: "CAMP 1",    emoji: "🟠", description: "Você começou a subir, mas ainda luta com foco, distrações e procrastinação." })
        else if (total <= 17) setResult({ total, level: "CAMP 2",    emoji: "🟡", description: "Você já entende hábitos, mas precisa consolidar disciplina." })
        else if (total <= 19) setResult({ total, level: "CAMP 3",    emoji: "🔵", description: "Você já tem consistência. Agora precisa acelerar o crescimento." })
        else                  setResult({ total, level: "CUME",      emoji: "🟣", description: "Você está entre as pessoas mais disciplinadas. O desafio agora é expansão." })
      }
      setLoading(false)
    }
  }

  const restart = () => { setCurrentQuestion(0); setAnswers([]); setResult(null) }

  return (
    <section
      className="py-24 px-6"
      style={{
        background:   "#0E0E0E",
        borderRadius: "30px 30px 0 0",
        marginTop:    "-20px",
        position:     "relative",
        zIndex:       11,
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          <span
            className="px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest"
            style={{ background: "#D7C7AB", color: "#101010" }}
          >
            QUIZ INTERATIVO
          </span>
        </div>

        <h2
          className="font-heading font-extrabold text-center mb-3"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#FFFCEE" }}
        >
          TESTE DE ALTITUDE MENTAL
        </h2>
        <p className="text-center text-lg mb-10" style={{ color: "rgba(255,252,238,0.5)" }}>
          Descubra em qual altitude da sua evolução você está.
        </p>

        <div
          className="rounded-2xl p-8"
          style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {!result ? (
            <>
              {/* Barra de progresso */}
              <div className="mb-8">
                <div className="flex justify-between text-xs mb-2" style={{ color: "rgba(255,252,238,0.4)" }}>
                  <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
                  <span>{Math.round((currentQuestion / questions.length) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#2A2A2A" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${(currentQuestion / questions.length) * 100}%`, background: "linear-gradient(to right, #F92726, #A61919)" }}
                  />
                </div>
              </div>

              <h3
                className="font-heading font-bold text-2xl mb-8 text-center"
                style={{ color: "#FFFCEE" }}
              >
                {questions[currentQuestion].pergunta}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {questions[currentQuestion].opcoes.map((opcao, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i + 1)}
                    className="w-full p-4 rounded-xl text-left font-medium flex items-center gap-3 transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border:     "1px solid rgba(255,255,255,0.08)",
                      color:      "#FFFCEE",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(249,39,38,0.1)"
                      e.currentTarget.style.borderColor = "rgba(249,39,38,0.4)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                    }}
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 font-mono"
                      style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,252,238,0.5)" }}
                    >
                      {["A", "B", "C", "D"][i]}
                    </span>
                    {opcao}
                  </button>
                ))}
              </div>
            </>
          ) : loading ? (
            <div className="text-center py-8">
              <div
                className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                style={{ borderColor: "#F92726", borderTopColor: "transparent" }}
              />
              <p style={{ color: "rgba(255,252,238,0.5)" }}>Calculando seu nível...</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">{result.emoji}</div>
              <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,252,238,0.4)" }}>
                Sua altitude atual
              </p>
              <h3 className="font-heading font-extrabold text-3xl mb-4" style={{ color: "#FFFCEE" }}>
                {result.level}
              </h3>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "rgba(255,252,238,0.6)" }}>
                {result.description}
              </p>
              <div
                className="rounded-xl p-4 mb-8 text-sm"
                style={{ background: "rgba(215,199,171,0.1)", border: "1px solid rgba(215,199,171,0.2)" }}
              >
                <p className="font-semibold" style={{ color: "#FFFCEE" }}>
                  Independente do seu nível atual, o EVEREST foi feito para você subir.
                </p>
              </div>
              <CTAButton text="QUERO COMEÇAR MINHA ESCALADA" size="large" className="w-full mb-4" />
              <button onClick={restart} className="text-sm transition-colors" style={{ color: "rgba(255,252,238,0.4)" }}>
                Refazer o teste
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
