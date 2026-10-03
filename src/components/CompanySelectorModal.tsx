"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { X, Building2, CheckCircle2, ShieldAlert, Sparkles, MapPin, Phone } from "lucide-react";
import { COMPANIES, CompanyConfig } from "@/lib/companies";

interface CompanySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCompany: CompanyConfig;
}

export function CompanySelectorModal({ isOpen, onClose, currentCompany }: CompanySelectorModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSelectCompany = (slug: string) => {
    router.push(`/pdr/${slug}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold uppercase text-white font-heading">
              Мультитенантная платформа PDR
            </h3>
            <p className="text-xs text-gray-400">
              Выберите автосервис для проверки работы Anti-Theft системы и динамических роутов
            </p>
          </div>
        </div>

        {/* Studio Cards Grid */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {Object.values(COMPANIES).map((comp) => {
            const isCurrent = comp.slug === currentCompany.slug;
            return (
              <div
                key={comp.slug}
                onClick={() => handleSelectCompany(comp.slug)}
                className={`cursor-pointer p-4 rounded-2xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? "glass-card-active border-amber-500"
                    : "glass-card hover:border-amber-500/40"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white font-heading">{comp.name}</h4>
                    {comp.isActive ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                        Оплачен (Active)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        Anti-Theft Демо
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1 text-amber-400 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {comp.city}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      {comp.phone}
                    </span>
                    <span>•</span>
                    <span className="text-gray-300">Коэф. цены: <strong className="text-white">{comp.priceModifier}x</strong></span>
                  </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto text-right">
                  {isCurrent ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-black font-extrabold text-xs uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Текущий
                    </span>
                  ) : (
                    <button className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase transition">
                      Перейти в /pdr/{comp.slug}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
