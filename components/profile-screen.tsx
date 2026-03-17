"use client"

import type { UserRole } from "@/app/page"
import {
  User,
  CreditCard,
  CalendarDays,
  Tag,
  LogOut,
  ChevronRight,
  Users,
  BarChart3,
  PlusCircle,
  Shield,
  LogIn,
  Settings,
  Edit3,
  QrCode,
  ClipboardList,
  Camera,
  Compass,
} from "lucide-react"

interface ProfileScreenProps {
  isLoggedIn: boolean
  userRole: UserRole
  onLogin: (role: UserRole) => void
  onLogout: () => void
}

const memberMenuItems = [
  { icon: User, label: "Mis datos", description: "Nombre, email, telefono" },
  {
    icon: CreditCard,
    label: "Metodos de pago",
    description: "Tarjetas y cuentas",
  },
  {
    icon: CalendarDays,
    label: "Historial de reservas",
    description: "Todas tus reservas",
  },
  { icon: Tag, label: "Cupones", description: "Descuentos disponibles" },
  {
    icon: Settings,
    label: "Configuracion",
    description: "Preferencias de la app",
  },
]

const guideMenuItems = [
  { icon: User, label: "Mis datos", description: "Nombre, email, telefono" },
  {
    icon: Settings,
    label: "Configuracion",
    description: "Preferencias de la app",
  },
]

const adminMenuItems = [
  {
    icon: Tag,
    label: "Gestion de cupones",
    description: "Crear, listar, desactivar",
  },
  {
    icon: Users,
    label: "Ver todos los usuarios",
    description: "Clientes, guias, admins",
  },
  {
    icon: BarChart3,
    label: "Estadisticas detalladas",
    description: "Metricas de rendimiento",
  },
  {
    icon: Settings,
    label: "Configuracion de la app",
    description: "Ajustes generales",
  },
]

const profileData: Record<
  string,
  { initials: string; name: string; email: string; roleLabel: string }
> = {
  member: {
    initials: "MC",
    name: "Maria Castillo",
    email: "maria.castillo@email.com",
    roleLabel: "Miembro",
  },
  guide: {
    initials: "RG",
    name: "Roberto Gomez",
    email: "roberto.guia@mismaloyaxtreme.com",
    roleLabel: "Guia",
  },
  admin: {
    initials: "AX",
    name: "Admin Xtreme",
    email: "admin@mismaloyaxtreme.com",
    roleLabel: "Administrador",
  },
}

const statsData: Record<string, { label: string; value: string }[]> = {
  member: [
    { label: "Viajes", value: "12" },
    { label: "Cupones", value: "3" },
    { label: "Rating", value: "4.9" },
  ],
  guide: [
    { label: "Check-ins hoy", value: "14" },
    { label: "Esta semana", value: "87" },
    { label: "Rating", value: "4.8" },
  ],
  admin: [
    { label: "Usuarios", value: "342" },
    { label: "Tours", value: "6" },
    { label: "Ingresos mes", value: "$12k" },
  ],
}

export function ProfileScreen({
  isLoggedIn,
  userRole,
  onLogin,
  onLogout,
}: ProfileScreenProps) {
  if (!isLoggedIn) {
    return <GuestState onLogin={onLogin} />
  }

  const profile = profileData[userRole] || profileData.member
  const stats = statsData[userRole] || statsData.member

  return (
    <div className="px-4 py-5 flex flex-col gap-5">
      {/* Profile Header */}
      <div className="flex items-center gap-4 bg-card rounded-xl border border-border p-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-bold text-accent-foreground">
            {profile.initials}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-serif font-bold text-card-foreground text-lg">
            {profile.name}
          </h2>
          <p className="text-sm text-muted-foreground truncate">
            {profile.email}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">
              {profile.roleLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-xl border border-border p-3 text-center shadow-sm"
          >
            <span className="text-xl font-bold text-foreground block">
              {stat.value}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Member menu - always shown for member, shows basic info for guide */}
      {userRole === "member" && (
        <MenuSection title="Mi cuenta" items={memberMenuItems} />
      )}

      {userRole === "guide" && (
        <MenuSection title="Mi cuenta" items={guideMenuItems} />
      )}

      {/* Admin menu */}
      {userRole === "admin" && (
        <>
          <MenuSection
            title="Mi cuenta"
            items={[
              memberMenuItems[0],
              memberMenuItems[4],
            ]}
          />
          <MenuSection title="Administracion" items={adminMenuItems} variant="accent" />
        </>
      )}

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex items-center justify-center gap-2 w-full bg-destructive/10 text-destructive font-semibold py-3.5 rounded-xl hover:bg-destructive/15 transition-colors active:scale-[0.98]"
      >
        <LogOut className="w-4 h-4" />
        Cerrar sesion
      </button>
    </div>
  )
}

function MenuSection({
  title,
  items,
  variant = "default",
}: {
  title: string
  items: { icon: typeof User; label: string; description: string }[]
  variant?: "default" | "accent"
}) {
  return (
    <section>
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        {title}
      </h3>
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden divide-y divide-border">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              className="flex items-center gap-3 w-full px-4 py-3.5 hover:bg-muted/50 transition-colors text-left"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  variant === "accent" ? "bg-accent/10" : "bg-secondary"
                }`}
              >
                <Icon className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-card-foreground block">
                  {item.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.description}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </button>
          )
        })}
      </div>
    </section>
  )
}

function GuestState({ onLogin }: { onLogin: (role: UserRole) => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center gap-6">
      {/* Guest illustration */}
      <div className="relative">
        <div className="w-28 h-28 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-14 h-14 text-accent" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-serif font-bold text-foreground">
          Bienvenido a Mismaloya Xtreme
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
          Inicia sesion para acceder a tu perfil, reservas y descuentos
          exclusivos.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        {/* Member login */}
        <button
          onClick={() => onLogin("member")}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-colors active:scale-95 shadow-lg shadow-primary/25"
        >
          <LogIn className="w-4 h-4" />
          Iniciar como Cliente
        </button>

        {/* Guide login */}
        <button
          onClick={() => onLogin("guide")}
          className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-semibold px-8 py-3 rounded-xl hover:bg-secondary/80 transition-colors active:scale-95"
        >
          <Compass className="w-4 h-4" />
          Iniciar como Guia
        </button>

        {/* Admin login */}
        <button
          onClick={() => onLogin("admin")}
          className="flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold px-8 py-3 rounded-xl hover:bg-accent/90 transition-colors active:scale-95"
        >
          <Shield className="w-4 h-4" />
          Iniciar como Admin
        </button>
      </div>
    </div>
  )
}
