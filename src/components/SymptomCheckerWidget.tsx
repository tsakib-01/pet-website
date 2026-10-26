"use client";

import React, { useState } from "react";
import { AlertTriangle, CheckSquare, PhoneCall, HeartPulse, Activity } from "lucide-react";

interface Symptom {
  id: string;
  label: string;
  severityPoints: number;
}

const SYMPTOMS_LIST: Symptom[] = [
  { id: "vomit_repeat", label: "Repeated vomiting (> 2 times in 12 hours)", severityPoints: 3 },
  { id: "bloody_stool", label: "Bloody or tarry black loose diarrhea", severityPoints: 4 },
  { id: "severe_lethargy", label: "Extreme lethargy / collapse / unable to rise", severityPoints: 4 },
  { id: "fever_gums", label: "Pale white gums or elevated rectal fever (> 103°F)", severityPoints: 4 },
  { id: "pain_guarding", label: "Visible abdominal arching, crying, or pain upon touch", severityPoints: 3 },
  { id: "mild_restless", label: "Minor lip-smacking, drooling, or loss of appetite", severityPoints: 1 },
];

export default function SymptomCheckerWidget() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(["vomit_repeat"]);

  const toggleSymptom = (id: string) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const totalPoints = selectedSymptoms.reduce((sum, id) => {
    const s = SYMPTOMS_LIST.find((item) => item.id === id);
    return sum + (s ? s.severityPoints : 0);
  }, 0);

  let triageStatus = {
    title: "MILD CONCERN — HOME MONITORING",
    level: "Low",
    color: "bg-brand-olive text-brand-espresso border-brand-olive",
    badge: "pill-badge-verified",
    recommendation: "Keep fresh water accessible. Fast pet for 4-6 hours, then introduce bland boiled chicken and white rice. If vomiting begins, escalate immediately.",
  };

  if (totalPoints >= 6) {
    triageStatus = {
      title: "CRITICAL EMERGENCY — IMMEDIATE VET ER VISIT",
      level: "High",
      color: "bg-brand-terracotta text-white border-brand-terracotta",
      badge: "pill-badge-alert",
      recommendation: "DO NOT WAIT. Sepsis and lethal circulatory shock can occur within 6-12 hours. Proceed to the nearest 24-hour veterinary emergency hospital immediately.",
    };
  } else if (totalPoints >= 3) {
    triageStatus = {
      title: "MODERATE DISTRESS — CONTACT VET TODAY",
      level: "Moderate",
      color: "bg-brand-cream border-brand-terracotta text-brand-espresso",
      badge: "pill-badge-alert",
      recommendation: "Call your primary veterinarian for a same-day appointment. Severe electrolyte depletion and dehydration are likely beginning.",
    };
  }

  return (
    <div className="paper-box bg-[#FAF4EE] p-5 sm:p-8 rounded-3xl border-2.5 border-brand-espresso shadow-paper space-y-6">
      <div className="border-b-2.5 border-brand-espresso pb-4">
        <span className="pill-badge pill-badge-alert text-xs mb-2">
          <HeartPulse className="w-3.5 h-3.5" /> Interactive Veterinary Triage Evaluator
        </span>
        <h3 className="font-heading text-2xl sm:text-3xl font-black text-brand-espresso">
          Check Your Pet’s Clinical Symptoms
        </h3>
        <p className="text-xs sm:text-sm text-brand-taupe font-medium mt-1">
          Select all symptoms currently observed since potential exposure to recalled pet food:
        </p>
      </div>

      {/* Checkbox grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
        {SYMPTOMS_LIST.map((s) => {
          const isChecked = selectedSymptoms.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => toggleSymptom(s.id)}
              className={`p-3.5 rounded-2xl border-2 text-left flex items-start gap-3 transition-all cursor-pointer ${
                isChecked
                  ? "bg-brand-cream border-brand-espresso shadow-paper-sm font-bold text-brand-espresso"
                  : "bg-[#FAF4EE] border-brand-espresso/30 hover:border-brand-espresso text-brand-taupe"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border-2 border-brand-espresso flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isChecked ? "bg-brand-terracotta text-white" : "bg-white"
                }`}
              >
                {isChecked && <CheckSquare className="w-3.5 h-3.5" />}
              </div>
              <span className="leading-snug">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Live Triage Score Feedback Box */}
      <div className={`p-5 rounded-3xl border-2.5 shadow-paper transition-all ${triageStatus.color}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-espresso/20 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 animate-pulse" />
            <span className="font-heading font-black text-sm sm:text-base uppercase">
              {triageStatus.title}
            </span>
          </div>
          <span className="font-mono text-xs font-bold">
            Risk Score: {totalPoints} Points
          </span>
        </div>

        <p className="text-xs sm:text-sm font-medium leading-relaxed">
          {triageStatus.recommendation}
        </p>

        {totalPoints >= 3 && (
          <div className="pt-4 mt-3 border-t border-brand-espresso/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] font-mono font-bold uppercase">
              Need immediate triage advice?
            </span>
            <a
              href="tel:8884264435"
              className="btn-pill btn-pill-espresso px-4 py-2 text-xs font-black shadow-paper-sm flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-olive" />
              <span>Call (888) 426-4435</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
