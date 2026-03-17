"use client"

import type { UserRole } from "@/app/page"
import { User } from "lucide-react"

interface HeaderProps {
  title: string
  isLoggedIn: boolean
  userRole: UserRole
  onProfileTap: () => void
}

const roleBadge: Record<string, { label: string; bg: string; text: string }> = {
  guide: { label: "Guia", bg: "bg-primary/20", text: "text-primary" },
  admin: { label: "Admin", bg: "bg-yellow-500/20", text: "text-yellow-300" },
}

export function Header({ title, isLoggedIn, userRole, onProfileTap }: HeaderProps) {
  const badge = roleBadge[userRole]

  return (
    <header className="sticky top-0 z-40 bg-accent text-accent-foreground">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo left */}
        <div className="flex items-center gap-2">
          <MismaloyaLogo />
          <div className="flex flex-col">
            <span className="font-serif text-sm font-bold tracking-wide leading-tight">
              MISMALOYA
            </span>
            <span className="font-serif text-[9px] font-semibold tracking-[0.2em] leading-tight text-primary">
              XTREME
            </span>
          </div>
        </div>

        {/* Title center */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-serif font-semibold tracking-wide whitespace-nowrap">
          {title}
        </h1>

        {/* Profile icon right */}
        <button
          onClick={onProfileTap}
          className="p-1.5 rounded-full hover:bg-accent/80 transition-colors relative"
          aria-label="Perfil"
        >
          <div className="w-8 h-8 rounded-full bg-accent-foreground/15 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          {isLoggedIn && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-accent" />
          )}
        </button>
      </div>

      {/* Role indicator bar */}
      {badge && (
        <div className="flex items-center justify-center pb-2 -mt-1">
          <span
            className={`text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full ${badge.bg} ${badge.text}`}
          >
            Modo {badge.label}
          </span>
        </div>
      )}
    </header>
  )
}

function MismaloyaLogo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 80 Q20 20 50 15 Q80 20 80 80"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M30 35 Q35 28 40 35"
        stroke="#10B510"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M45 25 Q50 18 55 25"
        stroke="#10B510"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M58 32 Q63 25 68 32"
        stroke="#10B510"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M25 70 Q35 65 45 70 Q55 75 65 70 Q72 67 78 70"
        stroke="#10B510"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  )
}
