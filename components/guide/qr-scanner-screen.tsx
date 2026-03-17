"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Camera,
  CheckCircle2,
  XCircle,
  User,
  CalendarDays,
  Clock,
  Hash,
} from "lucide-react"

interface ScannedTicket {
  clientName: string
  tour: string
  date: string
  time: string
  code: string
  people: number
  image: string
}

const mockScannedTicket: ScannedTicket = {
  clientName: "Maria Castillo",
  tour: "Tour de Bioluminiscencia",
  date: "15 Mar 2026",
  time: "20:00",
  code: "BIO-2026-4821",
  people: 2,
  image: "/images/bioluminescence.jpg",
}

export function QrScannerScreen() {
  const [scanState, setScanState] = useState<
    "scanning" | "success" | "confirmed"
  >("scanning")

  const handleSimulateScan = () => {
    setScanState("success")
  }

  const handleConfirm = () => {
    setScanState("confirmed")
    setTimeout(() => setScanState("scanning"), 2500)
  }

  const handleReset = () => {
    setScanState("scanning")
  }

  if (scanState === "confirmed") {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-20 text-center gap-6">
        <div className="w-24 h-24 rounded-full bg-primary/15 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-serif font-bold text-foreground">
            Llegada confirmada
          </h2>
          <p className="text-sm text-muted-foreground">
            {mockScannedTicket.clientName} -{" "}
            {mockScannedTicket.code}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Volviendo al escaner...
        </p>
      </div>
    )
  }

  if (scanState === "success") {
    return (
      <div className="flex flex-col gap-4 px-4 py-5">
        {/* Scanned ticket result */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          {/* Tour image */}
          <div className="relative h-40 w-full">
            <Image
              src={mockScannedTicket.image}
              alt={mockScannedTicket.tour}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <h3 className="text-white font-serif font-bold text-lg drop-shadow-lg">
                {mockScannedTicket.tour}
              </h3>
            </div>
          </div>

          {/* Client details */}
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-card-foreground">
                  {mockScannedTicket.clientName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {mockScannedTicket.people} personas
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center bg-muted rounded-lg p-2.5">
                <CalendarDays className="w-4 h-4 text-muted-foreground mb-1" />
                <span className="text-[10px] text-muted-foreground">Fecha</span>
                <span className="text-xs font-semibold text-foreground">
                  {mockScannedTicket.date}
                </span>
              </div>
              <div className="flex flex-col items-center bg-muted rounded-lg p-2.5">
                <Clock className="w-4 h-4 text-muted-foreground mb-1" />
                <span className="text-[10px] text-muted-foreground">Hora</span>
                <span className="text-xs font-semibold text-foreground">
                  {mockScannedTicket.time}
                </span>
              </div>
              <div className="flex flex-col items-center bg-muted rounded-lg p-2.5">
                <Hash className="w-4 h-4 text-muted-foreground mb-1" />
                <span className="text-[10px] text-muted-foreground">Codigo</span>
                <span className="text-[10px] font-bold font-mono text-foreground">
                  {mockScannedTicket.code}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <button
          onClick={handleConfirm}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors active:scale-[0.98] text-sm tracking-wide"
        >
          <CheckCircle2 className="w-5 h-5" />
          Confirmar llegada
        </button>

        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 bg-muted text-muted-foreground font-semibold py-3 rounded-xl hover:bg-muted/80 transition-colors active:scale-[0.98] text-sm"
        >
          <XCircle className="w-4 h-4" />
          Cancelar y escanear otro
        </button>
      </div>
    )
  }

  // Scanning state
  return (
    <div className="flex flex-col flex-1">
      {/* Camera viewfinder area */}
      <div className="relative flex-1 min-h-[420px] bg-accent overflow-hidden flex items-center justify-center">
        {/* Simulated camera background */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent via-accent/95 to-accent" />

        {/* Scan frame */}
        <div className="relative w-64 h-64">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-lg" />

          {/* Scanning line animation */}
          <div className="absolute left-4 right-4 h-0.5 bg-primary/80 animate-pulse top-1/2" />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className="w-12 h-12 text-accent-foreground/30" />
          </div>
        </div>

        {/* Instruction text */}
        <div className="absolute bottom-8 left-0 right-0 text-center px-6">
          <p className="text-sm text-accent-foreground/80 font-medium mb-1">
            Escanea el codigo QR del ticket del cliente
          </p>
          <p className="text-xs text-accent-foreground/50">
            Apunta la camara al codigo QR impreso o en pantalla
          </p>
        </div>
      </div>

      {/* Simulate scan button (for demo) */}
      <div className="px-4 py-4">
        <button
          onClick={handleSimulateScan}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors active:scale-[0.98] text-sm tracking-wide"
        >
          <Camera className="w-5 h-5" />
          Simular escaneo
        </button>
      </div>
    </div>
  )
}
