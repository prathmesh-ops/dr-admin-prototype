"use client"

import * as React from "react"

import type { Prescription, PrescriptionStatus } from "@/components/pharmacy/types"

type PharmacyContextValue = {
  prescriptions: Prescription[]
  updateStatus: (id: string, status: PrescriptionStatus) => void
  generateBill: (id: string, amount: number, transactionId: string) => void
}

const PharmacyContext = React.createContext<PharmacyContextValue | null>(null)

const seed: Prescription[] = [
  {
    id: "RX-1001",
    patientName: "John Doe",
    doctorName: "Dr. Smith",
    date: "2026-02-18",
    status: "NEW",
  },
  {
    id: "RX-1002",
    patientName: "Jane Smith",
    doctorName: "Dr. Wilson",
    date: "2026-02-18",
    status: "PROCESSING",
  },
  {
    id: "RX-1003",
    patientName: "Robert Johnson",
    doctorName: "Dr. Chen",
    date: "2026-02-17",
    status: "READY",
  },
  {
    id: "RX-1004",
    patientName: "Emily Davis",
    doctorName: "Dr. Brown",
    date: "2026-02-16",
    status: "DISPATCHED",
    amount: 499,
    transactionId: "TXN-88991",
  },
]

export function PharmacyProvider({ children }: { children: React.ReactNode }) {
  const [prescriptions, setPrescriptions] = React.useState<Prescription[]>(seed)

  const updateStatus = React.useCallback((id: string, status: PrescriptionStatus) => {
    setPrescriptions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    )
  }, [])

  const generateBill = React.useCallback(
    (id: string, amount: number, transactionId: string) => {
      setPrescriptions((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, amount, transactionId, status: p.status === "NEW" ? "PROCESSING" : p.status }
            : p
        )
      )
    },
    []
  )

  const value = React.useMemo(
    () => ({ prescriptions, updateStatus, generateBill }),
    [prescriptions, updateStatus, generateBill]
  )

  return (
    <PharmacyContext.Provider value={value}>{children}</PharmacyContext.Provider>
  )
}

export function usePharmacy() {
  const ctx = React.useContext(PharmacyContext)
  if (!ctx) throw new Error("usePharmacy must be used within PharmacyProvider")
  return ctx
}
