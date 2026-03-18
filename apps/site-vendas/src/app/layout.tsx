import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EVEREST — Construa Disciplina Real e Transforme Sua Vida",
  description:
    "O método EVEREST é uma estrutura simples que mostra como construir hábitos fortes, organizar sua rotina e evoluir com constância.",
  keywords: [
    "hábitos",
    "disciplina",
    "desenvolvimento pessoal",
    "produtividade",
    "EVEREST",
  ],
  openGraph: {
    title: "EVEREST — Construa Disciplina Real e Transforme Sua Vida",
    description:
      "O método EVEREST é uma estrutura simples que mostra como construir hábitos fortes, organizar sua rotina e evoluir com constância.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-everest-black text-everest-snow antialiased">
        {children}
      </body>
    </html>
  );
}
