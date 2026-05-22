"use client"

import {
  Users,
  Search,
  Shield,
  Filter,
  Download,
  MoreHorizontal,
  ChevronRight,
  UserPlus,
  Activity,
  UserCheck,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import * as React from "react"
import { useAdmin } from "@/components/admin/admin-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const roles = ["doctor", "dietitian", "physio", "sales", "pharmacist"] as const

type Role = (typeof roles)[number]

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
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
}

export default function StaffAdministrationPage() {
  const { staff, toggleStaffActive } = useAdmin()
  const [role, setRole] = React.useState<Role | "all">("all")
  const [searchTerm, setSearchTerm] = React.useState("")

  const filtered = staff.filter((s) => {
    const matchesRole = role === "all" || s.role === role
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    return matchesRole && matchesSearch
  })

  return (
    <div className="space-y-6 p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 rounded-[50px]">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-slate-900"></div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-medium">Admin Portal / User Management</p>
        </div>
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">User Management</h1>
            <p className="text-sm text-slate-600 mt-2">
              Manage permissions, roles, and operational status for all clinical staff.
            </p>
          </div>
          <Button className="bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white shadow-lg">
            <UserPlus className="mr-2 h-4 w-4" />
            Onboard Staff
          </Button>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-slate-200 shadow-lg">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search staff by name, role or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 h-12 rounded-xl border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        <Select value={role} onValueChange={(v) => setRole(v as any)}>
          <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500/20 min-w-[160px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-slate-200">
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map((r) => (
              <SelectItem key={r} value={r} className="capitalize">{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" className="h-12 px-5 rounded-xl font-semibold text-slate-600 hover:text-slate-900">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Staff directory */}
      <Card className="border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-700" />
            <h2 className="text-sm font-bold text-slate-900">Staff Directory</h2>
          </div>
        </CardHeader>
        <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold w-[40%]">Personnel</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Assignment</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Status</TableHead>
                  <TableHead className="text-right text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {filtered.map((s) => (
                    <TableRow
                      key={s.id}
                      className="border-slate-50 hover:bg-blue-50/30 transition-colors"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700">
                            {s.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{s.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 text-sm capitalize">{s.role}</span>
                          <span className="text-xs text-slate-500 mt-0.5">{s.specialty ?? "General Practice"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "text-xs font-semibold px-2.5 py-1",
                          s.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"
                        )}>
                          {s.isActive ? "Active" : "Disabled"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleStaffActive(s.id)}
                            className={cn(
                              "text-xs font-semibold",
                              s.isActive ? "text-rose-600 hover:bg-rose-50 border-rose-200" : "text-emerald-600 hover:bg-emerald-50 border-emerald-200"
                            )}
                          >
                            {s.isActive ? "Deactivate" : "Activate"}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-slate-100">
                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <div className="h-16 w-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No staff found</h3>
                <p className="text-sm text-slate-500">No staff members match your search criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
    </div>
  )
}
