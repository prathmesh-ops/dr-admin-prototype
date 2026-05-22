"use client"

import { usePharmacy } from "@/components/pharmacy/pharmacy-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pill, Package, Truck, Activity, TrendingUp, ChevronRight, Search } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function PharmacyDashboardPage() {
  const { prescriptions } = usePharmacy()

  const newCount = prescriptions.filter((p) => p.status === "NEW").length
  const readyCount = prescriptions.filter((p) => p.status === "READY").length
  const deliveredCount = prescriptions.filter((p) => p.status === "DISPATCHED").length

  const stats = [
    {
      title: "New Prescriptions",
      value: newCount.toString(),
      icon: Pill,
      color: "text-blue-600",
      bg: "bg-blue-50",
      ring: "ring-blue-100",
      change: "+0 today"
    },
    {
      title: "Ready for Dispatch",
      value: readyCount.toString(),
      icon: Package,
      color: "text-amber-600",
      bg: "bg-amber-50",
      ring: "ring-amber-100",
      change: "Active queue"
    },
    {
      title: "Delivered",
      value: deliveredCount.toString(),
      icon: Truck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      ring: "ring-emerald-100",
      change: "Last 24h"
    },
  ]

  return (
    <div className="space-y-8 pb-10">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between px-2"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-violet-500">Logistics Command</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pharmacy <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">Direct</span></h1>
          <p className="text-[13px] text-slate-500 font-medium mt-1">
            Accelerate prescription fulfillment and track medication supply chain velocity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="h-9 px-4 rounded-xl text-[11px] font-black border-slate-200 text-slate-600 bg-white shadow-sm flex items-center gap-2">
            <Activity className="h-3 w-3 text-primary" />
            Active: {prescriptions.length}
          </Badge>
        </div>
      </motion.div>

      {/* KPI Stats row */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div key={s.title} variants={item}>
              <Card className="group fresh-card-alt border-none shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden bg-white/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`${s.bg} rounded-2xl p-3.5 ring-1 ${s.ring} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                      <Icon className={`h-5 w-5 ${s.color}`} />
                    </div>
                    <div className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black shadow-sm bg-slate-50 text-slate-600">
                      {s.change}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{s.title}</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tighter tabular-nums leading-none">{s.value}</p>
                  </div>
                  <div className="mt-6 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "35%" }}
                      transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-pink-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Main content grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid gap-6 lg:grid-cols-3"
      >
        <Card className="lg:col-span-2 fresh-card border-none shadow-xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-8 px-8 pt-8 border-b border-slate-100/50">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Activity className="h-4 w-4 text-primary" />
                <CardTitle className="text-xl font-black text-slate-800 tracking-tight">Prescription Queue</CardTitle>
              </div>
              <p className="text-[11px] text-slate-400 uppercase font-black tracking-[0.2em]">Real-time fulfillment tracking</p>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center pt-8">
            <div className="text-center opacity-40">
              <Pill className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading prescription ledger...</p>
            </div>
          </CardContent>
        </Card>

        <Card className="fresh-card-alt border-none shadow-xl overflow-hidden group">
          <CardHeader className="pb-4 px-8 pt-8">
            <div className="flex items-center gap-2 mb-1">
              <Truck className="h-4 w-4 text-primary" />
              <CardTitle className="text-xl font-black text-slate-800 tracking-tight">Delivery Pulse</CardTitle>
            </div>
            <p className="text-[11px] text-slate-400 uppercase font-black tracking-[0.2em]">Latest logistical updates</p>
          </CardHeader>
          <CardContent className="pt-4 px-8 pb-8 space-y-6">
            <div className="flex flex-col items-center justify-center py-12 opacity-30">
              <Activity className="h-8 w-8 text-slate-300 mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No active shipments</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
