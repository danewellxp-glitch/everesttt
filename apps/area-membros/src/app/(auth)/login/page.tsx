"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mountain } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_VENDAS_URL || "http://localhost:3000";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email ou senha incorretos. Verifique suas credenciais.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex bg-everest-black">
      {/* Lado esquerdo - visual */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #0d1b2e 0%, #0A0A0A 70%)",
          borderRight: "1px solid #1C2028",
        }}
      >
        <div>
          <p className="font-heading font-bold text-2xl text-everest-snow">
            ⛰ EVEREST
          </p>
        </div>

        <div>
          <div className="flex items-center justify-center mb-12">
            <Mountain size={80} className="text-everest-blue opacity-30" />
          </div>

          <blockquote className="border-l-4 border-everest-gold pl-6">
            <p className="text-everest-snow text-xl font-heading font-semibold italic leading-relaxed">
              "O EVEREST não é sobre chegar ao topo. É sobre se tornar a pessoa
              capaz de chegar lá."
            </p>
          </blockquote>
        </div>

        <div className="flex gap-2">
          {["BASE", "1", "2", "3", "4", "CUME"].map((camp, i) => (
            <div
              key={camp}
              className="flex-1 h-1 rounded-full"
              style={{
                background: i === 0 ? "#E3B341" : "#1C2028",
              }}
            />
          ))}
        </div>
      </div>

      {/* Lado direito - formulário */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <p className="font-heading font-bold text-2xl text-everest-snow mb-8 text-center lg:hidden">
            ⛰ EVEREST
          </p>

          <h1 className="font-heading font-extrabold text-everest-snow text-3xl mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-everest-stone mb-8">
            Acesse sua área de membros e continue sua escalada
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
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

            {/* Senha */}
            <div>
              <label className="block text-everest-stone text-sm font-medium mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-everest-dark border border-everest-gray text-everest-snow placeholder-everest-stone/50 focus:outline-none focus:border-everest-blue transition-colors duration-200 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-everest-stone hover:text-everest-snow transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="p-3 rounded-lg bg-everest-red/10 border border-everest-red/30">
                <p className="text-everest-red text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg bg-everest-red hover:bg-everest-red-dark text-white font-bold text-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar na minha escalada"}
            </button>

            {/* Links */}
            <div className="text-center">
              <a
                href="/esqueci-senha"
                className="text-everest-stone text-sm hover:text-everest-snow transition-colors"
              >
                Esqueci minha senha
              </a>
            </div>
          </form>

          {/* Sem cadastro */}
          <div className="mt-8 pt-6 border-t border-everest-gray text-center">
            <p className="text-everest-stone text-sm">
              Não tem acesso? Adquira o EVEREST{" "}
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-everest-red hover:text-everest-red-dark font-semibold transition-colors"
              >
                → Saiba mais
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
