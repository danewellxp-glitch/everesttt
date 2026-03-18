"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Mountain, User, LogOut, ChevronRight } from "lucide-react";

interface SidebarProps {
  currentCamp?: string;
  progressPercent?: number;
}

const navLinks = [
  { href: "/dashboard", label: "Dashboard",    icon: LayoutDashboard },
  { href: "/modulos",   label: "Meus Módulos", icon: Mountain },
  { href: "/perfil",    label: "Meu Perfil",   icon: User },
];

export function Sidebar({ currentCamp, progressPercent = 0 }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen flex flex-col relative" style={{
      background: "linear-gradient(180deg, #0E1117 0%, #080B10 100%)",
      borderRight: "1px solid rgba(255,255,255,0.05)",
    }}>
      {/* Subtle top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Logo */}
      <div className="p-6 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
            style={{ background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)" }}>
            ⛰
          </div>
          <div>
            <p className="font-heading font-bold text-base text-everest-snow tracking-wide">EVEREST</p>
            <p className="text-everest-stone text-[10px] uppercase tracking-widest">Área de Membros</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-everest-gray/60 mb-4" />

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                isActive
                  ? "text-everest-snow"
                  : "text-everest-stone hover:text-everest-snow"
              }`}
              style={isActive ? {
                background: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(29,78,216,0.08) 100%)",
                border: "1px solid rgba(59,130,246,0.2)",
              } : {
                border: "1px solid transparent",
              }}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-blue-500" />
              )}
              <Icon size={16} className={isActive ? "text-blue-400" : "text-everest-stone group-hover:text-everest-muted"} />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight size={13} className="text-blue-400/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Progress indicator */}
      {currentCamp && (
        <div className="mx-3 mb-4 rounded-xl p-4 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(245,200,66,0.08) 0%, rgba(19,24,35,0.9) 100%)",
            border: "1px solid rgba(245,200,66,0.15)",
          }}>
          <p className="text-everest-stone text-[10px] font-bold uppercase tracking-widest mb-1">
            Altitude atual
          </p>
          <p className="text-everest-gold text-sm font-bold mb-3 font-heading">
            {currentCamp}
          </p>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progressPercent}%`,
                background: "linear-gradient(90deg, #F5C842, #E8A600)",
                boxShadow: "0 0 8px rgba(245,200,66,0.4)",
              }}
            />
          </div>
          <p className="text-everest-stone text-[10px] mt-1.5">{progressPercent}% concluído</p>
        </div>
      )}

      {/* Logout */}
      <div className="p-3 border-t border-everest-gray/60">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-everest-stone hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
          style={{ border: "1px solid transparent" }}
        >
          <LogOut size={16} className="group-hover:text-red-400 transition-colors" />
          Sair
        </button>
      </div>
    </aside>
  );
}
