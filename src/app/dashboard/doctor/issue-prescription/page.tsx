"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FilePlus,
  Search,
  User,
  Pill,
  Plus,
  Trash2,
  Save,
  Printer,
  Send,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Static data for patients
const patients = [
  { id: "PAT-001", name: "Aditya Sharma", age: 45, gender: "Male", phone: "+91 98765 43210" },
  { id: "PAT-002", name: "Priya Patel", age: 32, gender: "Female", phone: "+91 87654 32109" },
  { id: "PAT-003", name: "Rajesh Kumar", age: 58, gender: "Male", phone: "+91 76543 21098" },
  { id: "PAT-004", name: "Sneha Gupta", age: 28, gender: "Female", phone: "+91 65432 10987" },
  { id: "PAT-005", name: "Vikram Singh", age: 41, gender: "Male", phone: "+91 54321 09876" },
]

// Static data for medicines
const medicines = [
  { id: "MED-001", name: "Metformin 500mg", category: "Diabetes", manufacturer: "Sun Pharma" },
  { id: "MED-002", name: "Atorvastatin 20mg", category: "Cardiovascular", manufacturer: "Pfizer" },
  { id: "MED-003", name: "Levothyroxine 75mcg", category: "Thyroid", manufacturer: "Abbott" },
  { id: "MED-004", name: "Omeprazole 20mg", category: "Gastric", manufacturer: "Dr. Reddy's" },
  { id: "MED-005", name: "Amlodipine 5mg", category: "Cardiovascular", manufacturer: "Cipla" },
  { id: "MED-006", name: "Losartan 50mg", category: "Cardiovascular", manufacturer: "Torrent" },
  { id: "MED-007", name: "Cetirizine 10mg", category: "Allergy", manufacturer: "Cipla" },
  { id: "MED-008", name: "Pantoprazole 40mg", category: "Gastric", manufacturer: "Sun Pharma" },
]

interface MedicineItem {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

export default function IssuePrescriptionPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null)
  const [medicines, setMedicines] = useState<MedicineItem[]>([])
  const [medicineSearch, setMedicineSearch] = useState("")
  const [showMedicineDropdown, setShowMedicineDropdown] = useState(false)
  const [notes, setNotes] = useState("")

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(medicineSearch.toLowerCase())
  )

  const availableMedicines = medicines.filter((m) =>
    m.name.toLowerCase().includes(medicineSearch.toLowerCase())
  )

  const addMedicine = (medicine: typeof medicines[0]) => {
    const newMedicine: MedicineItem = {
      id: medicine.id,
      name: medicine.name,
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    }
    setMedicines([...medicines, newMedicine])
    setMedicineSearch("")
    setShowMedicineDropdown(false)
  }

  const removeMedicine = (id: string) => {
    setMedicines(medicines.filter((m) => m.id !== id))
  }

  const updateMedicine = (id: string, field: keyof MedicineItem, value: string) => {
    setMedicines(medicines.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

  const handleSave = () => {
    if (!selectedPatient || medicines.length === 0) {
      alert("Please select a patient and add at least one medicine.")
      return
    }
    // Here you would typically save to your backend
    alert("Prescription issued successfully!")
  }

  const handlePrint = () => {
    if (!selectedPatient || medicines.length === 0) {
      alert("Please select a patient and add at least one medicine.")
      return
    }
    // Here you would typically trigger print
    alert("Printing prescription...")
  }

  const handleSend = () => {
    if (!selectedPatient || medicines.length === 0) {
      alert("Please select a patient and add at least one medicine.")
      return
    }
    // Here you would typically send to pharmacy
    alert("Prescription sent to pharmacy!")
  }

  return (
    <div className="space-y-6 p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 rounded-[50px]">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-slate-900"></div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-medium">Doctor Portal / Issue Prescription</p>
        </div>
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Issue Prescription</h1>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">Create and issue new prescriptions for patients with detailed medication instructions.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Patient Selection */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Select Patient</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {filteredPatients.map((patient) => (
                  <motion.div
                    key={patient.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedPatient(patient)}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-all",
                      selectedPatient?.id === patient.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                        {patient.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{patient.name}</p>
                        <p className="text-xs text-slate-500">{patient.id} • {patient.age}y • {patient.gender}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Patient Details Card */}
          {selectedPatient && (
            <Card className="border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Patient Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                    {selectedPatient.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{selectedPatient.name}</p>
                    <p className="text-xs text-slate-500">{selectedPatient.id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Age</p>
                    <p className="font-semibold text-slate-900">{selectedPatient.age} years</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Gender</p>
                    <p className="font-semibold text-slate-900">{selectedPatient.gender}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Phone</p>
                    <p className="font-semibold text-slate-900">{selectedPatient.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Prescription Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Prescription Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    Date
                  </label>
                  <Input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Time
                  </label>
                  <Input
                    type="time"
                    defaultValue={new Date().toTimeString().slice(0, 5)}
                    className="h-10"
                  />
                </div>
              </div>

              {/* Add Medicine */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">
                  <Pill className="h-3 w-3 inline mr-1" />
                  Add Medicine
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search medicines..."
                    value={medicineSearch}
                    onChange={(e) => {
                      setMedicineSearch(e.target.value)
                      setShowMedicineDropdown(true)
                    }}
                    onFocus={() => setShowMedicineDropdown(true)}
                    className="pl-10 h-10"
                  />
                  {showMedicineDropdown && medicineSearch && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {medicines
                        .filter((m) => m.name.toLowerCase().includes(medicineSearch.toLowerCase()))
                        .map((medicine) => (
                          <div
                            key={medicine.id}
                            onClick={() => addMedicine(medicine)}
                            className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0"
                          >
                            <p className="font-semibold text-slate-900">{medicine.name}</p>
                            <p className="text-xs text-slate-500">{medicine.category} • {medicine.manufacturer}</p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Medicines List */}
              {medicines.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Prescribed Medicines ({medicines.length})
                    </label>
                  </div>
                  {medicines.map((medicine, idx) => (
                    <motion.div
                      key={medicine.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border border-slate-200 rounded-lg bg-slate-50 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-bold text-slate-900">{medicine.name}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeMedicine(medicine.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-500 uppercase tracking-wide mb-1 block">Dosage</label>
                          <Input
                            placeholder="e.g., 500mg"
                            value={medicine.dosage}
                            onChange={(e) => updateMedicine(medicine.id, "dosage", e.target.value)}
                            className="h-9"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-500 uppercase tracking-wide mb-1 block">Frequency</label>
                          <select
                            value={medicine.frequency}
                            onChange={(e) => updateMedicine(medicine.id, "frequency", e.target.value)}
                            className="w-full h-9 px-3 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                          >
                            <option value="">Select</option>
                            <option value="Once daily">Once daily</option>
                            <option value="Twice daily">Twice daily</option>
                            <option value="Three times daily">Three times daily</option>
                            <option value="Four times daily">Four times daily</option>
                            <option value="As needed">As needed</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-500 uppercase tracking-wide mb-1 block">Duration</label>
                          <Input
                            placeholder="e.g., 30 days"
                            value={medicine.duration}
                            onChange={(e) => updateMedicine(medicine.id, "duration", e.target.value)}
                            className="h-9"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-500 uppercase tracking-wide mb-1 block">Timing</label>
                          <select
                            value={medicine.instructions}
                            onChange={(e) => updateMedicine(medicine.id, "instructions", e.target.value)}
                            className="w-full h-9 px-3 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                          >
                            <option value="">Select</option>
                            <option value="After meal">After meal</option>
                            <option value="Before meal">Before meal</option>
                            <option value="Empty stomach">Empty stomach</option>
                            <option value="Before bed">Before bed</option>
                            <option value="After waking up">After waking up</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Additional Notes */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">
                  Additional Notes
                </label>
                <textarea
                  placeholder="Add any additional instructions or notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-24 px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                <Button
                  onClick={handleSave}
                  disabled={!selectedPatient || medicines.length === 0}
                  className="bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white shadow-lg shadow-slate-900/20"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Prescription
                </Button>
                <Button
                  onClick={handlePrint}
                  disabled={!selectedPatient || medicines.length === 0}
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button
                  onClick={handleSend}
                  disabled={!selectedPatient || medicines.length === 0}
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send to Pharmacy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
