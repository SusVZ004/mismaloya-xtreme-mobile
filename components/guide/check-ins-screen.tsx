"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Clock,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  ChevronDown,
} from "lucide-react"

type CheckInStatus = "pending" | "confirmed" | "no-show"

interface Reservation {
  id: number
  clientName: string
  tour: string
  tourImage: string
  time: string
  people: number
  code: string
  status: CheckInStatus
}

const initialReservations: Reservation[] = [
  {
    id: 1,
    clientName: "Maria Castillo",
    tour: "Tour de Bioluminiscencia",
    tourImage: "/images/bioluminescence.jpg",
    time: "20:00",
    people: 2,
    code: "BIO-2026-4821",
    status: "confirmed",
  },
  {
    id: 2,
    clientName: "James Wilson",
    tour: "Snorkel en Los Arcos",
    tourImage: "/images/snorkeling.jpg",
    time: "09:30",
    people: 4,
    code: "SNK-2026-7733",
    status: "pending",
  },
  {
    id: 3,
    clientName: "Ana Rodriguez",
    tour: "Tour de Bioluminiscencia",
    tourImage: "/images/bioluminescence.jpg",
    time: "20:00",
    people: 3,
    code: "BIO-2026-5512",
    status: "pending",
  },
  {
    id: 4,
    clientName: "Carlos Mendez",
    tour: "Avistamiento de Ballenas",
    tourImage: "/images/whale-watching.jpg",
    time: "07:00",
    people: 2,
    code: "WHL-2026-8891",
    status: "confirmed",
  },
  {
    id: 5,
    clientName: "Sophie Laurent",
    tour: "Snorkel en Los Arcos",
    tourImage: "/images/snorkeling.jpg",
    time: "09:30",
    people: 1,
    code: "SNK-2026-3344",
    status: "no-show",
  },
  {
    id: 6,
    clientName: "Roberto Diaz",
    tour: "Crucero al Atardecer",
    tourImage: "/images/sunset-cruise.jpg",
    time: "18:00",
    people: 2,
    code: "SUN-2026-6120",
    status: "pending",
  },
]

const statusConfig: Record<
  CheckInStatus,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  confirmed: {
    label: "Confirmado",
    className: "bg-primary/15 text-primary",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pendiente",
    className: "bg-yellow-500/15 text-yellow-600",
    icon: AlertCircle,
  },
  "no-show": {
    label: "No show",
    className: "bg-destructive/15 text-destructive",
    icon: XCircle,
  },
}

const tourOptions = [
  "Todos",
  "Tour de Bioluminiscencia",
  "Snorkel en Los Arcos",
  "Avistamiento de Ballenas",
  "Crucero al Atardecer",
]

const timeOptions = ["Todas", "07:00", "09:30", "18:00", "20:00"]

export function CheckInsScreen() {
  const [reservations, setReservations] =
    useState<Reservation[]>(initialReservations)
  const [tourFilter, setTourFilter] = useState("Todos")
  const [timeFilter, setTimeFilter] = useState("Todas")

  const filtered = reservations.filter((r) => {
    if (tourFilter !== "Todos" && r.tour !== tourFilter) return false
    if (timeFilter !== "Todas" && r.time !== timeFilter) return false
    return true
  })

  const stats = {
    total: filtered.length,
    confirmed: filtered.filter((r) => r.status === "confirmed").length,
    pending: filtered.filter((r) => r.status === "pending").length,
    noShow: filtered.filter((r) => r.status === "no-show").length,
  }

  const handleMarkNoShow = (id: number) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "no-show" as const } : r))
    )
  }

  const handleConfirm = (id: number) => {
    setReservations((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "confirmed" as const } : r
      )
    )
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-card rounded-xl border border-border p-2.5 text-center shadow-sm">
          <span className="text-lg font-bold text-foreground block">
            {stats.total}
          </span>
          <span className="text-[9px] text-muted-foreground font-medium">
            Total
          </span>
        </div>
        <div className="bg-card rounded-xl border border-border p-2.5 text-center shadow-sm">
          <span className="text-lg font-bold text-primary block">
            {stats.confirmed}
          </span>
          <span className="text-[9px] text-muted-foreground font-medium">
            Confirmados
          </span>
        </div>
        <div className="bg-card rounded-xl border border-border p-2.5 text-center shadow-sm">
          <span className="text-lg font-bold text-yellow-600 block">
            {stats.pending}
          </span>
          <span className="text-[9px] text-muted-foreground font-medium">
            Pendientes
          </span>
        </div>
        <div className="bg-card rounded-xl border border-border p-2.5 text-center shadow-sm">
          <span className="text-lg font-bold text-destructive block">
            {stats.noShow}
          </span>
          <span className="text-[9px] text-muted-foreground font-medium">
            No show
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <select
            value={tourFilter}
            onChange={(e) => setTourFilter(e.target.value)}
            className="w-full appearance-none bg-card border border-border rounded-lg pl-8 pr-8 py-2.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {tourOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
        </div>
        <div className="relative w-28">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="w-full appearance-none bg-card border border-border rounded-lg pl-8 pr-8 py-2.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {timeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Reservation list */}
      <div className="flex flex-col gap-2.5">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              No hay reservas con estos filtros
            </p>
          </div>
        ) : (
          filtered.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onMarkNoShow={() => handleMarkNoShow(reservation.id)}
              onConfirm={() => handleConfirm(reservation.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

function ReservationCard({
  reservation,
  onMarkNoShow,
  onConfirm,
}: {
  reservation: Reservation
  onMarkNoShow: () => void
  onConfirm: () => void
}) {
  const status = statusConfig[reservation.status]
  const StatusIcon = status.icon

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="flex">
        {/* Tour thumbnail */}
        <div className="relative w-20 h-auto flex-shrink-0">
          <Image
            src={reservation.tourImage}
            alt={reservation.tour}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1 p-3 flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-semibold text-card-foreground text-sm truncate">
                {reservation.clientName}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {reservation.tour}
              </p>
            </div>
            <span
              className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${status.className}`}
            >
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {reservation.time}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {reservation.people} personas
            </span>
            <span className="font-mono font-semibold text-foreground">
              {reservation.code}
            </span>
          </div>

          {/* Actions for pending */}
          {reservation.status === "pending" && (
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={onConfirm}
                className="flex items-center gap-1 text-[10px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-md hover:bg-primary/20 transition-colors"
              >
                <CheckCircle2 className="w-3 h-3" />
                Confirmar
              </button>
              <button
                onClick={onMarkNoShow}
                className="flex items-center gap-1 text-[10px] font-semibold text-destructive bg-destructive/10 px-2.5 py-1 rounded-md hover:bg-destructive/20 transition-colors"
              >
                <XCircle className="w-3 h-3" />
                No show
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
