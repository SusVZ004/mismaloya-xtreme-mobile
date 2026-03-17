"use client"

import Image from "next/image"
import { MapPin, Clock, Navigation, Phone, ChevronRight } from "lucide-react"

const schedules = ["9:30 AM", "1:30 PM", "6:00 PM"]

const locations = [
  {
    id: 1,
    name: "Oficina Mismaloya",
    address: "Playa de Mismaloya, Carr. a Barra de Navidad Km 11.5, Puerto Vallarta, Jal.",
    hours: schedules,
    phone: "+52 322 228 0001",
    tours: ["Bioluminiscencia", "Snorkel", "Tour Selva"],
    image: "/images/location-mismaloya.jpg",
    mapsUrl: "https://maps.google.com/?q=20.5342,-105.2935",
  },
  {
    id: 2,
    name: "Zona Romantica",
    address: "Malecon, Calle Olas Altas 432, Zona Romantica, Puerto Vallarta, Jal.",
    hours: schedules,
    phone: "+52 322 221 0002",
    tours: ["Crucero al Atardecer", "Avistamiento de Ballenas"],
    image: "/images/location-romantica.jpg",
    mapsUrl: "https://maps.google.com/?q=20.6050,-105.2378",
  },
  {
    id: 3,
    name: "Terminal de Cruceros",
    address: "Terminal Maritima, Av. de la Marina s/n, Puerto Vallarta, Jal.",
    hours: schedules,
    phone: "+52 322 224 0003",
    tours: ["Todos los tours"],
    image: "/images/location-terminal.jpg",
    mapsUrl: "https://maps.google.com/?q=20.6510,-105.2350",
  },
]

export function LocationsScreen() {
  return (
    <div className="flex flex-col">
      {/* Map Area */}
      <div className="relative h-52 bg-accent overflow-hidden">
        <MapIllustration />

        {/* Map pins */}
        <div className="absolute" style={{ top: "32%", left: "28%" }}>
          <LocationPin label="1" />
        </div>
        <div className="absolute" style={{ top: "22%", left: "55%" }}>
          <LocationPin label="2" />
        </div>
        <div className="absolute" style={{ top: "45%", left: "72%" }}>
          <LocationPin label="3" />
        </div>

        {/* Region badge */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-lg border border-border">
          <span className="text-xs font-semibold text-card-foreground flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-primary" />
            Bahia de Banderas, Jalisco
          </span>
        </div>
      </div>

      {/* Schedule info */}
      <div className="px-4 pt-4 pb-2">
        <div className="bg-secondary rounded-xl p-3 flex items-center gap-3">
          <Clock className="w-5 h-5 text-accent flex-shrink-0" />
          <div>
            <span className="text-xs font-semibold text-secondary-foreground block">Horarios de salida</span>
            <span className="text-xs text-muted-foreground">
              {schedules.join(" | ")}
            </span>
          </div>
        </div>
      </div>

      {/* Locations List */}
      <div className="px-4 py-3 flex flex-col gap-3">
        {locations.map((location, index) => (
          <div key={location.id} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            {/* Location photo */}
            <div className="relative h-32 w-full">
              <Image
                src={location.image}
                alt={location.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shadow-lg">
                {index + 1}
              </div>
              <div className="absolute bottom-3 left-3">
                <h3 className="font-serif font-bold text-white text-base drop-shadow-lg">{location.name}</h3>
              </div>
            </div>

            {/* Details */}
            <div className="p-4 flex flex-col gap-3">
              <p className="text-xs text-muted-foreground leading-relaxed">{location.address}</p>

              {/* Tour tags */}
              <div className="flex flex-wrap gap-1.5">
                {location.tours.map((tour) => (
                  <span
                    key={tour}
                    className="text-[10px] font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full"
                  >
                    {tour}
                  </span>
                ))}
              </div>

              {/* Schedule pills */}
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <div className="flex gap-1.5">
                  {location.hours.map((h) => (
                    <span key={h} className="text-[10px] font-semibold text-foreground bg-muted px-2 py-0.5 rounded-md">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions row */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Como llegar
                </a>
                <a
                  href={`tel:${location.phone}`}
                  className="flex items-center justify-center gap-1.5 bg-secondary text-secondary-foreground text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-secondary/80 transition-colors active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Llamar
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LocationPin({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-primary-foreground text-primary-foreground text-xs font-bold animate-bounce">
        {label}
      </div>
      <div className="w-2 h-2 bg-primary rounded-full mt-[-2px] opacity-40" />
    </div>
  )
}

function MapIllustration() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0 120 Q50 100 100 130 Q150 160 200 140 Q250 120 300 150 Q350 180 400 160 L400 250 L0 250 Z" fill="#D5ECEF" opacity="0.4" />
      <path d="M0 150 Q60 130 120 160 Q180 190 240 170 Q300 150 360 175 Q380 185 400 180 L400 250 L0 250 Z" fill="#D5ECEF" opacity="0.6" />
      <path d="M0 180 Q80 165 150 190 Q220 215 290 195 Q350 180 400 200 L400 250 L0 250 Z" fill="#D5ECEF" opacity="0.8" />
      <line x1="0" y1="50" x2="400" y2="50" stroke="#D5ECEF" strokeWidth="0.5" />
      <line x1="0" y1="100" x2="400" y2="100" stroke="#D5ECEF" strokeWidth="0.5" />
      <line x1="0" y1="150" x2="400" y2="150" stroke="#D5ECEF" strokeWidth="0.5" />
      <line x1="0" y1="200" x2="400" y2="200" stroke="#D5ECEF" strokeWidth="0.5" />
      <line x1="80" y1="0" x2="80" y2="250" stroke="#D5ECEF" strokeWidth="0.5" />
      <line x1="160" y1="0" x2="160" y2="250" stroke="#D5ECEF" strokeWidth="0.5" />
      <line x1="240" y1="0" x2="240" y2="250" stroke="#D5ECEF" strokeWidth="0.5" />
      <line x1="320" y1="0" x2="320" y2="250" stroke="#D5ECEF" strokeWidth="0.5" />
    </svg>
  )
}
