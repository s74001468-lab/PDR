"use client";

import React from "react";
import { AlertTriangle, Lock, ShieldAlert } from "lucide-react";
import { CompanyConfig } from "@/lib/companies";

interface AntiTheftBannerProps {
  company: CompanyConfig;
  onOpenSelector?: () => void;
}

export function AntiTheftBanner({ company, onOpenSelector }: AntiTheftBannerProps) {
  if (company.isActive) return null;

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-red-950 via-amber-950 to-red-950 border-b border-amber-500/30 text-amber-200 px-4 py-2.5 shadow-2xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 font-medium text-center sm:text-left">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse">
            <AlertTriangle className="w-4 h-4" />
          </span>
          <div>
            <span className="font-bold text-amber-400">⚠️ ДЕМОНСТРАЦИОННЫЙ РЕЖИМ СЕРВИСА ОНЛАЙН-ОЦЕНКИ</span>
            <span className="hidden md:inline"> — для компании </span>
            <span className="underline decoration-amber-500/50 underline-offset-2 font-semibold text-white ml-1 sm:ml-0">
              {company.name}
            </span>
            <span className="block sm:inline text-amber-300/80 text-[11px] sm:text-xs sm:ml-2">
              (Прием заявок владельцу ограничен. Включена Anti-Theft защита)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenSelector}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-semibold transition text-xs"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Сменить студию / Тест</span>
          </button>
        </div>
      </div>
    </div>
  );
}
