"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Mountain, User, LogOut } from "lucide-react";

interface SidebarProps {
  currentCamp?: string;
  progressPercent?: number;
}

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/modulos", label: "Meus Módulos", icon: Mountain },
  { href: "/perfil", label: "Meu Perfil", icon: User },
];

export function Sidebar({ currentCamp, progressPercent = 0 }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-everest-dark border-r border-everest-gray flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-everest-gray">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-everest-red flex items-center justify-center text-white shadow-lg shadow-everest-red/20">
            <Mountain size={20} />
          </div>
          <p className="font-heading font-bold text-xl text-everest-snow tracking-tight">
            EVEREST
          </p>
        </div>
        <p className="text-everest-stone text-[10px] uppercase font-bold tracking-widest mt-2 px-1">Área de Membros</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-everest-gray text-everest-snow"
                  : "text-everest-stone hover:text-everest-snow hover:bg-everest-gray/50"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Progress indicator */}
      {currentCamp && (
        <div className="p-4 mx-4 mb-4 rounded-xl border border-everest-gray bg-everest-black/50">
          <p className="text-everest-stone text-xs font-bold uppercase tracking-wider mb-1">
            Altitude atual
          </p>
          <p className="text-everest-gold text-sm font-bold mb-2">
            {currentCamp}
          </p>
          <div className="h-1.5 bg-everest-gray rounded-full overflow-hidden">
            <div
              className="h-full bg-everest-gold rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-everest-stone text-xs mt-1">
            {progressPercent}% concluído
          </p>
        </div>
      )}

      {/* Logout */}
      <div className="p-4 border-t border-everest-gray">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-everest-stone hover:text-everest-red hover:bg-everest-red/10 transition-all duration-200 w-full"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  );
}
