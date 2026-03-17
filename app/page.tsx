"use client"

import { useState, useMemo } from "react"
import {
  Compass,
  User,
  MapPin,
  Luggage,
  Camera,
  ClipboardCheck,
  LayoutDashboard,
  Palmtree,
} from "lucide-react"
import { Header } from "@/components/header"
import { TicketsScreen } from "@/components/tickets-screen"
import { SalesScreen } from "@/components/sales-screen"
import { ProfileScreen } from "@/components/profile-screen"
import { LocationsScreen } from "@/components/locations-screen"
import { QrScannerScreen } from "@/components/guide/qr-scanner-screen"
import { CheckInsScreen } from "@/components/guide/check-ins-screen"
import { DashboardScreen } from "@/components/admin/dashboard-screen"
import { TourManagementScreen } from "@/components/admin/tour-management-screen"

export type UserRole = "guest" | "member" | "guide" | "admin"
type TabId =
  | "tickets"
  | "explore"
  | "profile"
  | "locations"
  | "qr-scanner"
  | "check-ins"
  | "dashboard"
  | "tours-mgmt"

interface TabConfig {
  id: TabId
  label: string
  icon: typeof Compass
}

const clientTabs: TabConfig[] = [
  { id: "tickets", label: "Mis Viajes", icon: Luggage },
  { id: "explore", label: "Explorar", icon: Compass },
  { id: "profile", label: "Perfil", icon: User },
  { id: "locations", label: "Ubicaciones", icon: MapPin },
]

const guideTabs: TabConfig[] = [
  { id: "qr-scanner", label: "Escanear QR", icon: Camera },
  { id: "check-ins", label: "Check-ins", icon: ClipboardCheck },
  { id: "profile", label: "Perfil", icon: User },
  { id: "locations", label: "Ubicaciones", icon: MapPin },
]

const adminTabs: TabConfig[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tours-mgmt", label: "Tours", icon: Palmtree },
  { id: "profile", label: "Perfil", icon: User },
  { id: "locations", label: "Ubicaciones", icon: MapPin },
]

const screenTitles: Record<TabId, string> = {
  tickets: "Mis Viajes",
  explore: "Explorar",
  profile: "Perfil",
  locations: "Puntos de encuentro",
  "qr-scanner": "Escanear QR",
  "check-ins": "Check-ins del dia",
  dashboard: "Dashboard",
  "tours-mgmt": "Gestion de Tours",
}

function getDefaultTab(role: UserRole): TabId {
  switch (role) {
    case "guide":
      return "qr-scanner"
    case "admin":
      return "dashboard"
    default:
      return "explore"
  }
}

export default function Home() {
  const [userRole, setUserRole] = useState<UserRole>("guest")
  const [activeTab, setActiveTab] = useState<TabId>("explore")

  const isLoggedIn = userRole !== "guest"

  const tabs = useMemo(() => {
    switch (userRole) {
      case "guide":
        return guideTabs
      case "admin":
        return adminTabs
      default:
        return clientTabs
    }
  }, [userRole])

  const handleLogin = (role: UserRole) => {
    setUserRole(role)
    const defaultTab = getDefaultTab(role)
    setActiveTab(defaultTab)
  }

  const handleLogout = () => {
    setUserRole("guest")
    setActiveTab("explore")
  }

  const renderScreen = () => {
    switch (activeTab) {
      case "tickets":
        return (
          <TicketsScreen
            isLoggedIn={isLoggedIn}
            userRole={userRole}
            onLogin={() => handleLogin("member")}
          />
        )
      case "explore":
        return <SalesScreen />
      case "profile":
        return (
          <ProfileScreen
            isLoggedIn={isLoggedIn}
            userRole={userRole}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        )
      case "locations":
        return <LocationsScreen />
      case "qr-scanner":
        return <QrScannerScreen />
      case "check-ins":
        return <CheckInsScreen />
      case "dashboard":
        return <DashboardScreen />
      case "tours-mgmt":
        return <TourManagementScreen />
      default:
        return <SalesScreen />
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background max-w-md mx-auto relative shadow-2xl">
      <Header
        title={screenTitles[activeTab]}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onProfileTap={() => setActiveTab("profile")}
      />

      <main className="flex-1 overflow-y-auto pb-20">{renderScreen()}</main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border z-50">
        <div className="flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label={tab.label}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : ""}`}
                />
                <span
                  className={`text-[10px] leading-tight ${isActive ? "font-semibold" : "font-medium"}`}
                >
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
