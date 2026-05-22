"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Target, ClipboardList, Plus } from "lucide-react";

interface PatientHeaderCardProps {
  patient: any;
  id: string;
  enrollment: any;
  patientAge: number | null;
  bodyMeasurementGoals: any[];
  metricsData: any;
  assessmentSubmissions: any[];
  isHistoryCallShow: boolean;
  onShowViewGoalDrawer: () => void;
  onShowAssessmentDrawer: () => void;
  onScheduleHistoryCall: () => void;
}

export function PatientHeaderCard({
  patient,
  id,
  enrollment,
  patientAge,
  bodyMeasurementGoals,
  metricsData,
  assessmentSubmissions,
  isHistoryCallShow,
  onShowViewGoalDrawer,
  onShowAssessmentDrawer,
  onScheduleHistoryCall,
}: PatientHeaderCardProps) {
  return (
    <Card className="border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {patient?.first_name?.[0]}{patient?.last_name?.[0]}
            </div>
            <div className="space-y-3">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                  {patient?.first_name} {patient?.last_name}
                </h1>
                <p className="text-sm text-slate-600 mt-1">Patient ID: {id.slice(0, 8)}...</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {patient?.phone || "N/A"}
                </div>
                {patient?.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {patient.email}
                  </div>
                )}
                {patient?.city && (
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500">📍</span>
                    {patient.city}, {patient.country}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {enrollment && (
                  <Badge className={`${enrollment.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    enrollment.status === "completed" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      "bg-slate-50 text-slate-700 border-slate-200"
                    }`}>
                    {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                  </Badge>
                )}
                {metricsData?.data?.weight_logs && metricsData.data.weight_logs.length > 0 && (
                  <Badge variant="outline" className="border-slate-300 text-slate-700">
                    Weight: {metricsData.data.weight_logs[0].weight_kg} kg
                  </Badge>
                )}
                {patientAge && (
                  <Badge variant="outline" className="border-slate-300 text-slate-700">
                    Age: {patientAge} years
                  </Badge>
                )}
                {patient?.gender && (
                  <Badge variant="outline" className="border-slate-300 text-slate-700 capitalize">
                    {patient.gender}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {bodyMeasurementGoals.length > 0 && (
              <Button
                onClick={onShowViewGoalDrawer}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg"
              >
                <Target className="h-4 w-4 mr-2" />
                Assigned Goals
              </Button>
            )}

            {assessmentSubmissions.length > 0 ? <Button
              onClick={onShowAssessmentDrawer}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
            >
              <ClipboardList className="h-4 w-4 mr-2" />
              View Assessment
            </Button> : <Button className="cursor-default">Assessment Pending</Button>}

            {assessmentSubmissions.length > 0 && !isHistoryCallShow && <Button
              variant="outline"
              onClick={onScheduleHistoryCall}
              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-white shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Schedule History Call
            </Button>}

          </div>
        </div>
      </CardContent>
    </Card>
  );
}
