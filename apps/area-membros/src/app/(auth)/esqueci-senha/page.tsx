"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simula envio - em produção implementar endpoint de reset
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-everest-black p-8">
      <div className="w-full max-w-md">
        <a
          href="/login"
          className="flex items-center gap-2 text-everest-stone hover:text-everest-snow text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar ao login
        </a>

        <p className="font-heading font-bold text-2xl text-everest-snow mb-2">
          ⛰ EVEREST
        </p>

        {!sent ? (
          <>
            <h1 className="font-heading font-extrabold text-everest-snow text-3xl mt-6 mb-2">
              Recuperar senha
            </h1>
            <p className="text-everest-stone mb-8">
              Digite seu email e enviaremos as instruções de recuperação.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-everest-stone text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-everest-dark border border-everest-gray text-everest-snow placeholder-everest-stone/50 focus:outline-none focus:border-everest-blue transition-colors duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-lg bg-everest-red hover:bg-everest-red-dark text-white font-bold text-lg transition-all duration-200 disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Enviar instruções"}
              </button>
            </form>
          </>
        ) : (
          <div className="mt-6 p-6 rounded-xl border border-everest-gray bg-everest-dark">
            <p className="text-4xl mb-4">📧</p>
            <h2 className="font-heading font-bold text-everest-snow text-xl mb-2">
              Email enviado!
            </h2>
            <p className="text-everest-stone">
              Se o email <strong className="text-everest-snow">{email}</strong>{" "}
              está cadastrado, você receberá as instruções em breve.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
