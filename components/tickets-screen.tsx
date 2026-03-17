"use client"

import Image from "next/image"
import { CalendarDays, QrCode, Clock, LogIn, Luggage, ChevronRight } from "lucide-react"

interface TicketsScreenProps {
  isLoggedIn: boolean
  userRole: string
  onLogin: () => void
}

const tickets = [
  {
    id: 1,
    tour: "Tour de Bioluminiscencia",
    image: "/images/bioluminescence.jpg",
    date: "15 Mar 2026",
    time: "20:00",
    code: "BIO-2026-4821",
    status: "confirmed" as const,
    people: 2,
  },
  {
    id: 2,
    tour: "Snorkel en Los Arcos",
    image: "/images/snorkeling.jpg",
    date: "18 Mar 2026",
    time: "09:30",
    code: "SNK-2026-7733",
    status: "confirmed" as const,
    people: 4,
  },
  {
    id: 3,
    tour: "Avistamiento de Ballenas",
    image: "/images/whale-watching.jpg",
    date: "02 Feb 2026",
    time: "07:00",
    code: "WHL-2026-1192",
    status: "completed" as const,
    people: 3,
  },
  {
    id: 4,
    tour: "Tour Selva Tropical",
    image: "/images/jungle-tour.jpg",
    date: "10 Ene 2026",
    time: "10:00",
    code: "JGL-2026-5567",
    status: "cancelled" as const,
    people: 2,
  },
]

const statusConfig = {
  confirmed: { label: "Confirmado", className: "bg-primary/15 text-primary", dot: "bg-primary" },
  completed: { label: "Completado", className: "bg-secondary text-secondary-foreground", dot: "bg-muted-foreground" },
  cancelled: { label: "Cancelado", className: "bg-destructive/15 text-destructive", dot: "bg-destructive" },
}

export function TicketsScreen({ isLoggedIn, userRole, onLogin }: TicketsScreenProps) {
  if (!isLoggedIn) {
    return <GuestState onLogin={onLogin} />
  }

  const upcoming = tickets.filter((t) => t.status === "confirmed")
  const past = tickets.filter((t) => t.status !== "confirmed")

  return (
    <div className="relative">
      <div className="px-4 py-4 flex flex-col gap-6">
        {/* Upcoming Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Proximas reservas
            </h2>
            <span className="text-xs font-bold text-primary">{upcoming.length} activas</span>
          </div>
          <div className="flex flex-col gap-3">
            {upcoming.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </section>

        {/* Past Section */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Historial
          </h2>
          <div className="flex flex-col gap-3">
            {past.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </section>
      </div>

      {/* QR Scanner FAB - only for admin/staff */}
      {(userRole === "admin") && (
        <button
          className="fixed bottom-24 right-4 max-w-md w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors active:scale-95"
          aria-label="Escanear codigo QR"
        >
          <QrCode className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}

function TicketCard({ ticket }: { ticket: (typeof tickets)[0] }) {
  const status = statusConfig[ticket.status]

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="flex">
        {/* Tour thumbnail */}
        <div className="relative w-24 h-auto flex-shrink-0">
          <Image
            src={ticket.image}
            alt={ticket.tour}
            fill
            className="object-cover"
          />
          {ticket.status === "confirmed" && (
            <div className="absolute inset-0 bg-primary/10" />
          )}
        </div>

        {/* Ticket details */}
        <div className="flex-1 p-3 flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif font-semibold text-card-foreground text-sm leading-tight text-balance">
              {ticket.tour}
            </h3>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${status.className}`}>
              {status.label}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              {ticket.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {ticket.time}
            </span>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="bg-muted rounded-md px-2 py-1">
              <span className="text-[10px] text-muted-foreground">Codigo: </span>
              <span className="text-[10px] font-bold font-mono text-foreground">{ticket.code}</span>
            </div>
            {ticket.status === "confirmed" && (
              <button className="flex items-center gap-0.5 text-[10px] font-semibold text-primary hover:underline">
                Ver QR <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function GuestState({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center gap-6">
      {/* Illustration */}
      <div className="relative">
        <div className="w-28 h-28 rounded-full bg-secondary flex items-center justify-center">
          <Luggage className="w-14 h-14 text-accent" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <CalendarDays className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-serif font-bold text-foreground">
          Tus viajes te esperan
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
          Inicia sesion para ver tus reservas, gestionar tus tickets y acceder a tus codigos QR.
        </p>
      </div>

      <button
        onClick={onLogin}
        className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-colors active:scale-95 shadow-lg shadow-primary/25"
      >
        <LogIn className="w-4 h-4" />
        Iniciar sesion
      </button>
    </div>
  )
}
