"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Star,
  Tag,
  Copy,
  Check,
  ChevronLeft,
  X,
  Users,
  Clock,
  MapPin,
  Info,
  ChevronRight,
  Waves,
} from "lucide-react"

const tours = [
  {
    id: 1,
    title: "Bioluminiscencia",
    subtitle: "Bioluminescence Tour",
    description:
      "Vive la magia de las aguas que brillan en la oscuridad. Navega por la bahia de noche y observa el plancton bioluminiscente iluminar el oceano a tu alrededor. Una experiencia unica e inolvidable.",
    image: "/images/bioluminescence.jpg",
    price: 44,
    currency: "USD",
    originalPrice: 55,
    rating: 4.9,
    reviews: 328,
    duration: "3 HRS",
    groupSize: "Max. 12 personas",
    meetingPoint: "Playa Mismaloya",
    discount: 20,
    coupon: "BIO20",
    tag: "Mas Popular",
  },
  {
    id: 2,
    title: "Snorkeling en Los Arcos",
    subtitle: "Snorkeling At Los Arcos",
    description:
      "Explora los arrecifes y la vida marina alrededor de las formaciones rocosas de Los Arcos. Incluye equipo completo de snorkel, guia certificado y refrigerios a bordo.",
    image: "/images/snorkeling.jpg",
    price: 38,
    currency: "USD",
    rating: 4.7,
    reviews: 215,
    duration: "2.5 HRS",
    groupSize: "Max. 15 personas",
    meetingPoint: "Marina Mismaloya",
  },
  {
    id: 3,
    title: "Avistamiento de Ballenas",
    subtitle: "Whale Watching",
    description:
      "Temporada Dic-Mar. Observa a las majestuosas ballenas jorobadas en su habitat natural. Nuestros guias expertos te llevaran a los mejores puntos de avistamiento.",
    image: "/images/whale-watching.jpg",
    price: 65,
    currency: "USD",
    originalPrice: 76,
    rating: 4.8,
    reviews: 412,
    duration: "5 HRS",
    groupSize: "Max. 20 personas",
    meetingPoint: "Puerto Vallarta Marina",
    discount: 15,
    coupon: "WHALE15",
    tag: "Temporada",
  },
  {
    id: 4,
    title: "Tour Selva Tropical",
    subtitle: "Jungle River Tour",
    description:
      "Adentrate en la selva tropical del Pacifico mexicano. Recorre rios en lancha, descubre cascadas ocultas y disfruta de la flora y fauna exotica de la region.",
    image: "/images/jungle-tour.jpg",
    price: 42,
    currency: "USD",
    rating: 4.6,
    reviews: 187,
    duration: "6 HRS",
    groupSize: "Max. 10 personas",
    meetingPoint: "Base Mismaloya Xtreme",
  },
  {
    id: 5,
    title: "Crucero al Atardecer",
    subtitle: "Sunset Cruise",
    description:
      "Disfruta de un romantico crucero al atardecer por la Bahia de Banderas. Incluye barra libre, snacks gourmet y musica en vivo. Vista panoramica de la costa.",
    image: "/images/sunset-cruise.jpg",
    price: 55,
    currency: "USD",
    rating: 4.9,
    reviews: 290,
    duration: "3 HRS",
    groupSize: "Max. 30 personas",
    meetingPoint: "Marina Vallarta",
    tag: "Nuevo",
  },
  {
    id: 6,
    title: "Buceo Certificado",
    subtitle: "Scuba Diving",
    description:
      "Sumérgete en las profundidades del Pacifico mexicano. Tour para buzos certificados con equipo profesional, guia PADI y visita a dos sitios de buceo.",
    image: "/images/scuba-diving.jpg",
    price: 89,
    currency: "USD",
    rating: 4.8,
    reviews: 156,
    duration: "4 HRS",
    groupSize: "Max. 6 personas",
    meetingPoint: "Marina Mismaloya",
  },
]

export function SalesScreen() {
  const [selectedTour, setSelectedTour] = useState<(typeof tours)[0] | null>(
    null
  )

  if (selectedTour) {
    return (
      <TourDetail tour={selectedTour} onBack={() => setSelectedTour(null)} />
    )
  }

  return (
    <div className="flex flex-col gap-1 pb-4">
      {/* Hero intro */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <Waves className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Aventuras
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Descubre la costa del Pacifico mexicano con experiencias unicas
        </p>
      </div>

      {/* Full-bleed tour cards */}
      <div className="flex flex-col gap-3 px-4">
        {tours.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            onSelect={() => setSelectedTour(tour)}
          />
        ))}
      </div>
    </div>
  )
}

function TourCard({
  tour,
  onSelect,
}: {
  tour: (typeof tours)[0]
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className="relative w-full h-56 rounded-2xl overflow-hidden text-left group active:scale-[0.98] transition-transform"
    >
      {/* Full background image */}
      <Image
        src={tour.image}
        alt={tour.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark gradient overlay from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Tag badge - top left */}
      {tour.tag && (
        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
          {tour.tag}
        </span>
      )}

      {/* Discount badge - top left below tag or top left */}
      {tour.discount && (
        <span
          className={`absolute ${tour.tag ? "top-10" : "top-3"} left-3 bg-accent text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg`}
        >
          <Tag className="w-2.5 h-2.5" />-{tour.discount}%
        </span>
      )}

      {/* Duration pill - top right */}
      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5">
        <Clock className="w-3 h-3" />
        {tour.duration}
      </div>

      {/* Bottom content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
        {/* Title row */}
        <div className="flex items-end justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-bold text-white text-lg leading-tight text-balance drop-shadow-lg">
              {tour.title}
            </h3>
            <p className="text-white/70 text-xs font-medium mt-0.5">
              {tour.subtitle}
            </p>
          </div>

          {/* Info button */}
          <div className="shrink-0 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-primary group-hover:border-primary transition-colors">
            <ChevronRight className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Price + rating bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[10px] text-white/60 font-medium">
              Desde
            </span>
            <span className="text-xl font-bold text-white drop-shadow-lg">
              ${tour.price}
            </span>
            {tour.originalPrice && (
              <span className="text-xs text-white/50 line-through">
                ${tour.originalPrice}
              </span>
            )}
            <span className="text-[10px] text-white/60 font-semibold">
              {tour.currency}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-white">{tour.rating}</span>
            <span className="text-[9px] text-white/60">({tour.reviews})</span>
          </div>
        </div>
      </div>
    </button>
  )
}

function TourDetail({
  tour,
  onBack,
}: {
  tour: (typeof tours)[0]
  onBack: () => void
}) {
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [copiedCoupon, setCopiedCoupon] = useState(false)

  const handleCopyCoupon = () => {
    if (tour.coupon) {
      navigator.clipboard.writeText(tour.coupon).catch(() => {})
      setCopiedCoupon(true)
      setTimeout(() => setCopiedCoupon(false), 2000)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Image - taller for impact */}
      <div className="relative h-72 w-full">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors border border-white/20"
          aria-label="Volver"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {tour.tag && (
          <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
            {tour.tag}
          </span>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white/60 text-xs font-medium mb-1">
            {tour.subtitle}
          </p>
          <h2 className="text-2xl font-serif font-bold text-white mb-2 drop-shadow-lg">
            {tour.title}
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-white">{tour.rating}</span>
            </div>
            <span className="text-sm text-white/60">
              ({tour.reviews} resenas)
            </span>
            {tour.discount && (
              <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                -{tour.discount}% OFF
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-5 flex flex-col gap-5">
        {/* Price highlight bar */}
        <div className="flex items-center justify-between bg-accent rounded-xl px-4 py-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-accent-foreground/60 font-medium">
              Desde
            </span>
            <span className="text-2xl font-bold text-accent-foreground">
              ${tour.price}
            </span>
            {tour.originalPrice && (
              <span className="text-sm text-accent-foreground/50 line-through">
                ${tour.originalPrice}
              </span>
            )}
            <span className="text-xs text-accent-foreground/60 font-semibold">
              {tour.currency}
            </span>
          </div>
          <span className="text-[10px] text-accent-foreground/50 font-medium">
            por persona
          </span>
        </div>

        {/* Info pills */}
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1.5 bg-secondary text-secondary-foreground text-xs font-medium px-3 py-2 rounded-full">
            <Clock className="w-3.5 h-3.5 text-primary" /> {tour.duration}
          </span>
          <span className="flex items-center gap-1.5 bg-secondary text-secondary-foreground text-xs font-medium px-3 py-2 rounded-full">
            <Users className="w-3.5 h-3.5 text-primary" /> {tour.groupSize}
          </span>
          <span className="flex items-center gap-1.5 bg-secondary text-secondary-foreground text-xs font-medium px-3 py-2 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-primary" /> {tour.meetingPoint}
          </span>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-serif font-semibold text-foreground mb-2">
            Acerca del tour
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {tour.description}
          </p>
        </div>

        {/* What's included */}
        <div>
          <h3 className="font-serif font-semibold text-foreground mb-2">
            Incluye
          </h3>
          <div className="flex flex-col gap-2">
            {[
              "Equipo necesario para la actividad",
              "Guia bilingue certificado",
              "Seguro de viajero",
              "Agua y snacks a bordo",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Coupon section */}
        {tour.coupon && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-primary" />
                Cupon disponible
              </span>
              <button
                onClick={handleCopyCoupon}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                {copiedCoupon ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copiar codigo
                  </>
                )}
              </button>
            </div>
            <div className="bg-card rounded-lg border border-border p-2.5 text-center">
              <span className="font-mono font-bold text-lg text-primary tracking-wider">
                {tour.coupon}
              </span>
            </div>
          </div>
        )}

        {/* Apply coupon */}
        <div>
          <label
            htmlFor="coupon-input"
            className="text-sm font-semibold text-foreground mb-2 block"
          >
            Aplicar codigo de descuento
          </label>
          <div className="flex gap-2">
            <input
              id="coupon-input"
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Ingresa tu codigo"
              className="flex-1 bg-card border border-input rounded-lg px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={() => {
                if (couponCode) setCouponApplied(true)
              }}
              className="bg-primary text-primary-foreground font-semibold px-4 rounded-lg text-sm hover:bg-primary/90 transition-colors active:scale-95"
            >
              Aplicar
            </button>
          </div>
          {couponApplied && (
            <div className="flex items-center justify-between mt-2 bg-primary/10 rounded-lg px-3 py-2">
              <span className="text-xs font-medium text-primary">
                Cupon aplicado exitosamente
              </span>
              <button
                onClick={() => {
                  setCouponApplied(false)
                  setCouponCode("")
                }}
                aria-label="Quitar cupon"
              >
                <X className="w-3.5 h-3.5 text-primary" />
              </button>
            </div>
          )}
        </div>

        {/* Book CTA */}
        <button className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors active:scale-[0.98] text-sm tracking-wide uppercase">
          Reservar Ahora
        </button>
      </div>
    </div>
  )
}
