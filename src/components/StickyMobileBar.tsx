"use client";

import React from "react";
import { Phone, Camera, MessageCircle } from "lucide-react";
import { CompanyConfig } from "@/lib/companies";

interface StickyMobileBarProps {
  company: CompanyConfig;
  onScrollToForm: () => void;
}

export function StickyMobileBar({ company, onScrollToForm }: StickyMobileBarProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-obsidian-950/95 backdrop-blur-2xl border-t border-white/15 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-2.5">
        
        {/* Call Button */}
        <a
          href={`tel:${company.phoneRaw}`}
          className="flex-1 py-3 px-3 rounded-xl bg-obsidian-800 border border-white/15 text-white font-bold text-xs uppercase flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Позвонить</span>
        </a>

        {/* Estimate Photo Button (Glowing Amber) */}
        <button
          onClick={onScrollToForm}
          className="flex-[1.6] py-3 px-3 rounded-xl btn-gradient-pdr text-black font-extrabold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-glow-amber"
        >
          <Camera className="w-4 h-4" />
          <span>Оценить по фото</span>
        </button>

      </div>
    </div>
  );
}
