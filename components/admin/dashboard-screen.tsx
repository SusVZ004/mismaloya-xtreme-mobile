"use client"

import {
  DollarSign,
  CalendarCheck,
  Tag,
  TrendingUp,
  Clock,
  User,
  ChevronRight,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts"

const salesData = [
  { day: "Lun", ventas: 1240 },
  { day: "Mar", ventas: 890 },
  { day: "Mie", ventas: 1560 },
  { day: "Jue", ventas: 2100 },
  { day: "Vie", ventas: 1890 },
  { day: "Sab", ventas: 2450 },
  { day: "Dom", ventas: 1780 },
]

const recentReservations = [
  {
    id: 1,
    client: "Maria Castillo",
    tour: "Tour de Bioluminiscencia",
    amount: 88,
    time: "Hace 15 min",
    people: 2,
  },
  {
    id: 2,
    client: "James Wilson",
    tour: "Snorkel en Los Arcos",
    amount: 152,
    time: "Hace 1 hora",
    people: 4,
  },
  {
    id: 3,
    client: "Ana Rodriguez",
    tour: "Avistamiento de Ballenas",
    amount: 195,
    time: "Hace 2 horas",
    people: 3,
  },
  {
    id: 4,
    client: "Carlos Mendez",
    tour: "Crucero al Atardecer",
    amount: 110,
    time: "Hace 3 horas",
    people: 2,
  },
]

export function DashboardScreen() {
  const totalWeek = salesData.reduce((sum, d) => sum + d.ventas, 0)

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-xl border border-border p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
          </div>
          <span className="text-lg font-bold text-foreground block">
            $2,450
          </span>
          <span className="text-[10px] text-muted-foreground font-medium">
            Ventas hoy
          </span>
        </div>

        <div className="bg-card rounded-xl border border-border p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <CalendarCheck className="w-4 h-4 text-accent" />
            </div>
          </div>
          <span className="text-lg font-bold text-foreground block">18</span>
          <span className="text-[10px] text-muted-foreground font-medium">
            Reservas activas
          </span>
        </div>

        <div className="bg-card rounded-xl border border-border p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/15 flex items-center justify-center">
              <Tag className="w-4 h-4 text-yellow-600" />
            </div>
          </div>
          <span className="text-lg font-bold text-foreground block">7</span>
          <span className="text-[10px] text-muted-foreground font-medium">
            Cupones usados
          </span>
        </div>
      </div>

      {/* Sales chart */}
      <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif font-semibold text-card-foreground text-sm">
              Ventas ultimos 7 dias
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary font-semibold">
                +12.5%
              </span>
              <span className="text-[10px] text-muted-foreground">
                vs semana anterior
              </span>
            </div>
          </div>
          <span className="text-lg font-bold text-foreground">
            ${totalWeek.toLocaleString()}
          </span>
        </div>

        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData} barSize={28}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                tickFormatter={(v) => `$${v}`}
                width={45}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`$${value} USD`, "Ventas"]}
              />
              <Bar
                dataKey="ventas"
                fill="var(--primary)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent reservations */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Ultimas reservas
          </h3>
          <button className="text-xs font-semibold text-primary flex items-center gap-0.5">
            Ver todas <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden divide-y divide-border">
          {recentReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="flex items-center gap-3 px-4 py-3"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">
                  {reservation.client}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {reservation.tour} - {reservation.people} personas
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-sm font-bold text-foreground block">
                  ${reservation.amount}
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-0.5 justify-end">
                  <Clock className="w-2.5 h-2.5" />
                  {reservation.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
