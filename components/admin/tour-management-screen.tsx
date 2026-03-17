"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Plus,
  Edit3,
  Trash2,
  ChevronLeft,
  Clock,
  DollarSign,
  Users,
  MapPin,
  Star,
  X,
  ImageIcon,
} from "lucide-react"

interface Tour {
  id: number
  title: string
  subtitle: string
  image: string
  price: number
  duration: string
  groupSize: string
  meetingPoint: string
  rating: number
  reviews: number
  active: boolean
}

const toursData: Tour[] = [
  {
    id: 1,
    title: "Tour de Bioluminiscencia",
    subtitle: "Bioluminescence Tour",
    image: "/images/bioluminescence.jpg",
    price: 44,
    duration: "3 HRS",
    groupSize: "Max. 12",
    meetingPoint: "Playa Mismaloya",
    rating: 4.9,
    reviews: 328,
    active: true,
  },
  {
    id: 2,
    title: "Snorkel en Los Arcos",
    subtitle: "Snorkeling At Los Arcos",
    image: "/images/snorkeling.jpg",
    price: 38,
    duration: "2.5 HRS",
    groupSize: "Max. 15",
    meetingPoint: "Marina Mismaloya",
    rating: 4.7,
    reviews: 215,
    active: true,
  },
  {
    id: 3,
    title: "Avistamiento de Ballenas",
    subtitle: "Whale Watching",
    image: "/images/whale-watching.jpg",
    price: 65,
    duration: "5 HRS",
    groupSize: "Max. 20",
    meetingPoint: "Puerto Vallarta Marina",
    rating: 4.8,
    reviews: 412,
    active: true,
  },
  {
    id: 4,
    title: "Tour Selva Tropical",
    subtitle: "Jungle River Tour",
    image: "/images/jungle-tour.jpg",
    price: 42,
    duration: "6 HRS",
    groupSize: "Max. 10",
    meetingPoint: "Base Mismaloya Xtreme",
    rating: 4.6,
    reviews: 187,
    active: true,
  },
  {
    id: 5,
    title: "Crucero al Atardecer",
    subtitle: "Sunset Cruise",
    image: "/images/sunset-cruise.jpg",
    price: 55,
    duration: "3 HRS",
    groupSize: "Max. 30",
    meetingPoint: "Marina Vallarta",
    rating: 4.9,
    reviews: 290,
    active: true,
  },
  {
    id: 6,
    title: "Buceo Certificado",
    subtitle: "Scuba Diving",
    image: "/images/scuba-diving.jpg",
    price: 89,
    duration: "4 HRS",
    groupSize: "Max. 6",
    meetingPoint: "Marina Mismaloya",
    rating: 4.8,
    reviews: 156,
    active: false,
  },
]

export function TourManagementScreen() {
  const [tours, setTours] = useState(toursData)
  const [showForm, setShowForm] = useState(false)
  const [editingTour, setEditingTour] = useState<Tour | null>(null)

  const handleDelete = (id: number) => {
    setTours((prev) => prev.filter((t) => t.id !== id))
  }

  const handleToggleActive = (id: number) => {
    setTours((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    )
  }

  const handleEdit = (tour: Tour) => {
    setEditingTour(tour)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingTour(null)
  }

  if (showForm) {
    return <TourForm tour={editingTour} onBack={handleCloseForm} />
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4 relative">
      {/* Stats row */}
      <div className="flex gap-3">
        <div className="flex-1 bg-card rounded-xl border border-border p-3 shadow-sm text-center">
          <span className="text-xl font-bold text-foreground block">
            {tours.filter((t) => t.active).length}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium">
            Tours activos
          </span>
        </div>
        <div className="flex-1 bg-card rounded-xl border border-border p-3 shadow-sm text-center">
          <span className="text-xl font-bold text-muted-foreground block">
            {tours.filter((t) => !t.active).length}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium">
            Inactivos
          </span>
        </div>
        <div className="flex-1 bg-card rounded-xl border border-border p-3 shadow-sm text-center">
          <span className="text-xl font-bold text-foreground block">
            {tours.length}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium">
            Total
          </span>
        </div>
      </div>

      {/* Tour cards list */}
      <div className="flex flex-col gap-3">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className={`bg-card rounded-xl border shadow-sm overflow-hidden ${tour.active ? "border-border" : "border-border opacity-60"}`}
          >
            <div className="flex">
              {/* Thumbnail */}
              <div className="relative w-24 h-auto flex-shrink-0">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
                {!tour.active && (
                  <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-primary-foreground bg-foreground/60 px-2 py-0.5 rounded-full uppercase">
                      Inactivo
                    </span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 p-3 flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-1">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-card-foreground text-sm leading-tight truncate">
                      {tour.title}
                    </h3>
                    <p className="text-[10px] text-muted-foreground">
                      {tour.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-muted rounded-full px-1.5 py-0.5 flex-shrink-0">
                    <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-[10px] font-bold text-foreground">
                      {tour.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <DollarSign className="w-3 h-3" />${tour.price} USD
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {tour.duration}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Users className="w-3 h-3" />
                    {tour.groupSize}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => handleEdit(tour)}
                    className="flex items-center gap-1 text-[10px] font-semibold text-accent bg-secondary px-2.5 py-1 rounded-md hover:bg-secondary/80 transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleToggleActive(tour.id)}
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-md transition-colors ${
                      tour.active
                        ? "text-yellow-600 bg-yellow-500/10 hover:bg-yellow-500/20"
                        : "text-primary bg-primary/10 hover:bg-primary/20"
                    }`}
                  >
                    {tour.active ? "Desactivar" : "Activar"}
                  </button>
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="flex items-center gap-1 text-[10px] font-semibold text-destructive bg-destructive/10 px-2.5 py-1 rounded-md hover:bg-destructive/20 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAB - Create new tour */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-24 right-4 max-w-md w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors active:scale-95 z-10"
        aria-label="Crear nuevo tour"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}

function TourForm({
  tour,
  onBack,
}: {
  tour: Tour | null
  onBack: () => void
}) {
  const isEdit = tour !== null

  return (
    <div className="flex flex-col">
      {/* Form header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          aria-label="Volver"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="font-serif font-semibold text-foreground">
          {isEdit ? "Editar tour" : "Nuevo tour"}
        </h2>
      </div>

      <div className="px-4 py-5 flex flex-col gap-4">
        {/* Image upload area */}
        <div className="relative h-40 w-full bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 overflow-hidden">
          {isEdit && tour ? (
            <>
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary-foreground bg-foreground/50 px-3 py-1.5 rounded-lg">
                  Cambiar imagen
                </span>
              </div>
            </>
          ) : (
            <>
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">
                Agregar imagenes del tour
              </span>
            </>
          )}
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="tour-name"
            className="text-xs font-semibold text-foreground"
          >
            Nombre del tour
          </label>
          <input
            id="tour-name"
            type="text"
            defaultValue={isEdit && tour ? tour.title : ""}
            placeholder="Ej. Tour de Bioluminiscencia"
            className="bg-card border border-input rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="tour-subtitle"
            className="text-xs font-semibold text-foreground"
          >
            Subtitulo (ingles)
          </label>
          <input
            id="tour-subtitle"
            type="text"
            defaultValue={isEdit && tour ? tour.subtitle : ""}
            placeholder="Ej. Bioluminescence Tour"
            className="bg-card border border-input rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="tour-desc"
            className="text-xs font-semibold text-foreground"
          >
            Descripcion
          </label>
          <textarea
            id="tour-desc"
            rows={3}
            placeholder="Describe la experiencia..."
            className="bg-card border border-input rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="tour-price"
              className="text-xs font-semibold text-foreground"
            >
              Precio (USD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="tour-price"
                type="number"
                defaultValue={isEdit && tour ? tour.price : ""}
                placeholder="44"
                className="w-full bg-card border border-input rounded-lg pl-8 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="tour-duration"
              className="text-xs font-semibold text-foreground"
            >
              Duracion
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="tour-duration"
                type="text"
                defaultValue={isEdit && tour ? tour.duration : ""}
                placeholder="3 HRS"
                className="w-full bg-card border border-input rounded-lg pl-8 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="tour-group"
              className="text-xs font-semibold text-foreground"
            >
              Tamano de grupo
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="tour-group"
                type="text"
                defaultValue={isEdit && tour ? tour.groupSize : ""}
                placeholder="Max. 12"
                className="w-full bg-card border border-input rounded-lg pl-8 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="tour-meeting"
              className="text-xs font-semibold text-foreground"
            >
              Punto de encuentro
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="tour-meeting"
                type="text"
                defaultValue={isEdit && tour ? tour.meetingPoint : ""}
                placeholder="Playa Mismaloya"
                className="w-full bg-card border border-input rounded-lg pl-8 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Schedule inputs */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-foreground">
            Horarios disponibles
          </label>
          <div className="flex flex-wrap gap-2">
            {["09:30 AM", "1:30 PM", "6:00 PM"].map((time) => (
              <span
                key={time}
                className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full"
              >
                {time}
              </span>
            ))}
            <button className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-primary/20 transition-colors">
              <Plus className="w-3 h-3" />
              Agregar
            </button>
          </div>
        </div>

        {/* Submit button */}
        <button className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors active:scale-[0.98] text-sm tracking-wide uppercase mt-2">
          {isEdit ? "Guardar cambios" : "Crear tour"}
        </button>

        <button
          onClick={onBack}
          className="w-full bg-muted text-muted-foreground font-semibold py-3 rounded-xl hover:bg-muted/80 transition-colors active:scale-[0.98] text-sm"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
