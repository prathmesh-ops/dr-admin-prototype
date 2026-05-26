"use client"

import { usePharmacy } from "@/components/pharmacy/pharmacy-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pill, Package, Truck, Activity, RefreshCw, ShoppingCart, Box, ClipboardCheck, PieChart as PieChartIcon, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const categoryColors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#f43f5e", "#06b6d4"]

export default function PharmacyDashboardPage() {
  const { prescriptions } = usePharmacy()

  const newCount = prescriptions.filter((p) => p.status === "NEW").length
  const readyCount = prescriptions.filter((p) => p.status === "READY").length
  const deliveredCount = prescriptions.filter((p) => p.status === "DISPATCHED").length

  const statCards = [
    {
      title: "New Prescriptions",
      value: newCount,
      subtitle: "Awaiting processing",
      icon: Pill,
      shell: "from-blue-50 to-indigo-50",
      iconShell: "from-blue-500 to-indigo-500",
      text: "text-blue-700",
    },
    {
      title: "Ready for Dispatch",
      value: readyCount,
      subtitle: "Active queue",
      icon: Package,
      shell: "from-amber-50 to-orange-50",
      iconShell: "from-amber-500 to-orange-500",
      text: "text-amber-700",
    },
    {
      title: "Delivered",
      value: deliveredCount,
      subtitle: "Completed deliveries",
      icon: Truck,
      shell: "from-emerald-50 to-teal-50",
      iconShell: "from-emerald-500 to-teal-500",
      text: "text-emerald-700",
    },
    {
      title: "Total Products",
      value: 150,
      subtitle: "In inventory",
      icon: Box,
      shell: "from-purple-50 to-pink-50",
      iconShell: "from-purple-500 to-pink-500",
      text: "text-purple-700",
    },
    {
      title: "Active Orders",
      value: 25,
      subtitle: "Processing",
      icon: ShoppingCart,
      shell: "from-rose-50 to-pink-50",
      iconShell: "from-rose-500 to-pink-500",
      text: "text-rose-700",
    },
    {
      title: "In Transit",
      value: 12,
      subtitle: "Shipped",
      icon: ClipboardCheck,
      shell: "from-cyan-50 to-sky-50",
      iconShell: "from-cyan-500 to-sky-500",
      text: "text-cyan-700",
    },
  ]

  const orderStatusData = [
    { status: "Pending", count: 8 },
    { status: "Processing", count: 12 },
    { status: "Dispatched", count: 15 },
    { status: "Delivered", count: 45 },
  ]

  const categoryData = [
    { category: "Diabetes", count: 45 },
    { category: "Cardiovascular", count: 32 },
    { category: "Thyroid", count: 28 },
    { category: "Gastric", count: 22 },
    { category: "Respiratory", count: 15 },
    { category: "Others", count: 8 },
  ]

  return (
    <div className="space-y-6 p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 rounded-[50px]">
      <div className="space-y-4">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Pharmacy Dashboard</h1>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">Track prescriptions, inventory, orders, and delivery status from a single dashboard.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white shadow-lg shadow-slate-900/20">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className={`border-0 bg-gradient-to-br ${card.shell} shadow-lg hover:shadow-xl transition-shadow overflow-hidden group`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className={`flex items-center gap-2 mb-3 ${card.text}`}>
                      <Icon className="h-3 w-3" />
                      <p className="text-[10px] uppercase tracking-[0.15em] font-semibold">{card.title}</p>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mb-2">{card.value}</p>
                    <p className={`text-xs font-medium ${card.text}`}>{card.subtitle}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${card.iconShell} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
          <CardHeader className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-slate-700" />
                <CardTitle className="text-sm font-bold text-slate-900">Order Status Distribution</CardTitle>
              </div>
              <Badge variant="outline" className="text-xs font-semibold border-blue-200 text-blue-700 bg-blue-50">
                {orderStatusData.reduce((sum, item) => sum + item.count, 0)} orders
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[320px] bg-gradient-to-br from-slate-50/50 to-blue-50/30 rounded-xl p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderStatusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="status" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: "#475569" }} />
                  <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: "#475569" }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                            <p className="text-xs font-semibold text-slate-700 mb-1">Status: {payload[0].payload.status}</p>
                            <p className="text-sm font-bold text-blue-600">Orders: {payload[0].value}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
          <CardHeader className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <PieChartIcon className="h-4 w-4 text-slate-700" />
                <CardTitle className="text-sm font-bold text-slate-900">Product Categories</CardTitle>
              </div>
              <Badge variant="outline" className="text-xs font-semibold border-emerald-200 text-emerald-700 bg-emerald-50">
                {categoryData.length} categories
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[240px] bg-gradient-to-br from-slate-50/50 to-emerald-50/30 rounded-xl p-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="count" nameKey="category" innerRadius={55} outerRadius={82} paddingAngle={4}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`${entry.category}-${index}`} fill={categoryColors[index % categoryColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                            <p className="text-xs font-semibold text-slate-700 mb-1 capitalize">{String(payload[0].name)}</p>
                            <p className="text-sm font-bold text-slate-900">Products: {payload[0].value}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 mt-6">
              {categoryData.map((item, index) => (
                <div key={item.category} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: categoryColors[index % categoryColors.length] }} />
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-slate-500" />
                      <p className="text-sm font-medium text-slate-700 capitalize">{item.category}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{item.count}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
