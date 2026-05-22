"use client"

import {
  CreditCard,
  Tag,
  IndianRupee,
  Save,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  Download,
  Filter,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import * as React from "react"
import { useAdmin } from "@/components/admin/admin-context"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const item = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  show: { opacity: 1, scale: 1, y: 0 }
}

export default function AdminPricingPage() {
  const { plans, specialties, updatePlanPrice } = useAdmin()
  const [edits, setEdits] = React.useState<Record<string, string>>({})

  return (
    <div className="space-y-8 pb-10">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Revenue Operations</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pricing <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">Architecture</span></h1>
          <p className="text-[13px] text-slate-500 font-medium mt-1">
            Fine-tune plan pricing and subscription models across clinical specialties.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 px-6 rounded-xl font-black text-[11px] uppercase tracking-widest border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm hover:bg-white transition-all">
            <RefreshCw className="mr-2 h-4 w-4 text-slate-400" />
            Reset Values
          </Button>
        </div>
      </motion.div>

      {/* Pricing list */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Card className="fresh-card border-none shadow-xl overflow-hidden bg-white/40 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4 px-8 pt-8 border-b border-slate-100/50">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CreditCard className="h-4 w-4 text-primary" />
                <CardTitle className="text-xl font-black text-slate-800 tracking-tight">Fee Schedule</CardTitle>
              </div>
              <p className="text-[11px] text-slate-400 uppercase font-black tracking-[0.2em]">Platform-wide billing configurations</p>
            </div>
          </CardHeader>
          <CardContent className="pt-6 px-4 pb-6">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-slate-400 w-[30%]">Plan Entity</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Taxonomy</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Yield</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Adjusted Quote</TableHead>
                  <TableHead className="text-right pr-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Commitment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {plans.map((p, idx) => {
                    const sp = specialties.find((s) => s.id === p.specialtyId)
                    const v = edits[p.id] ?? String(p.price)
                    const isChanged = edits[p.id] && Number(edits[p.id]) !== p.price

                    return (
                      <motion.tr
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group/row border-slate-50 hover:bg-slate-50/30 transition-colors"
                      >
                        <TableCell className="pl-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white border border-slate-800 shadow-md group-hover/row:scale-110 transition-transform">
                              <Tag className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-black text-slate-700 uppercase tracking-tight text-[14px]">{p.name}</p>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{p.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] font-black px-2.5 py-1 rounded-lg border-slate-200 text-slate-500 uppercase tracking-widest">
                            {sp?.name ?? "General"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 font-black text-slate-500 tabular-nums">
                            <IndianRupee className="h-3 w-3" />
                            {p.price}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="relative max-w-[160px]">
                            <IndianRupee className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                            <Input
                              type="number"
                              value={v}
                              onChange={(e) => setEdits((prev) => ({ ...prev, [p.id]: e.target.value }))}
                              className={cn(
                                "pl-8 h-10 rounded-xl border-slate-100 bg-white/50 focus:bg-white focus:ring-primary/20 transition-all font-black text-[13px] tabular-nums",
                                isChanged && "border-primary/50 bg-primary/5 ring-4 ring-primary/10"
                              )}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button
                            size="sm"
                            disabled={!isChanged}
                            onClick={() => {
                              const n = Number(edits[p.id])
                              if (!Number.isFinite(n) || n <= 0) return
                              updatePlanPrice(p.id, n)
                            }}
                            className={cn(
                              "h-10 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                              isChanged ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" : "bg-slate-100 text-slate-300 pointer-events-none"
                            )}
                          >
                            <Save className="mr-2 h-3.5 w-3.5" />
                            Save Quote
                          </Button>
                        </TableCell>
                      </motion.tr>
                    )
                  })}
                </AnimatePresence>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
