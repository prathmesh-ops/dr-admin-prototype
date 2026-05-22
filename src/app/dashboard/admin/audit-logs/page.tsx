"use client"

import * as React from "react"
import { useAdmin } from "@/components/admin/admin-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  FileText,
  Search,
  Shield,
  Activity,
  Calendar,
  Download,
  Filter,
  MoreHorizontal,
  ChevronRight,
  User,
  Clock,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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

export default function PatientAuditAccessPage() {
  const { auditEvents } = useAdmin()
  const [q, setQ] = React.useState("")

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return auditEvents
    return auditEvents.filter((e) =>
      [e.patientId, e.patientName, e.actor, e.action].some((v) => v.toLowerCase().includes(query))
    )
  }, [auditEvents, q])

  return (
    <div className="space-y-6 p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 rounded-[50px]">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-slate-900"></div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-medium">Admin Portal / Audit Logs</p>
        </div>
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Audit Logs</h1>
            <p className="text-sm text-slate-600 mt-2">
              Track patient data access and system activity across all operations.
            </p>
          </div>
          <Button className="bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white shadow-lg">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Search row */}
      <div className="flex flex-wrap items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-slate-200 shadow-lg">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Filter by patient, actor ID or specific action sequence..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-11 h-12 rounded-xl border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        <Button variant="outline" size="sm" className="h-12 px-5 rounded-xl font-semibold text-slate-600 hover:text-slate-900">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Audit events feed */}
      <Card className="border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-slate-700" />
            <h2 className="text-sm font-bold text-slate-900">Audit Events</h2>
          </div>
        </CardHeader>
        <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Patient</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Action</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Actor</TableHead>
                  <TableHead className="text-right text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {filtered.map((e) => (
                    <TableRow
                      key={e.id}
                      className="border-slate-50 hover:bg-blue-50/30 transition-colors"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-700" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{e.patientName}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{e.patientId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 border-slate-200">
                          {e.action}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                            {e.actor.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="font-semibold text-slate-700 text-sm">{e.actor}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-semibold text-slate-900 text-sm tabular-nums">{new Date(e.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <span className="text-xs text-slate-500 mt-0.5">{new Date(e.at).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <div className="h-16 w-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No events found</h3>
                <p className="text-sm text-slate-500">No audit events match your search criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
    </div>
  )
}
