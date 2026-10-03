"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { getCompanyBySlug } from "@/lib/companies";
import { AntiTheftBanner } from "@/components/AntiTheftBanner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PdrCalculator } from "@/components/PdrCalculator";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { PhotoAssessmentForm } from "@/components/PhotoAssessmentForm";
import { TrustBlock } from "@/components/TrustBlock";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { SuccessModal } from "@/components/SuccessModal";
import { CompanySelectorModal } from "@/components/CompanySelectorModal";
import { MapPin, Phone, Clock, Award } from "lucide-react";

export default function PdrCompanyPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "autovmyatina-msk";
  const company = getCompanyBySlug(slug);

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [prefilledCalculation, setPrefilledCalculation] = useState<any>(null);

  const scrollToCalculator = () => {
    const el = document.getElementById("calculator-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToForm = () => {
    const el = document.getElementById("photo-assessment-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleLockPrice = (calcData: any) => {
    setPrefilledCalculation(calcData);
    scrollToForm();
  };

  const handleSuccessSubmit = (data: any) => {
    setSubmittedData(data);
    setIsSuccessOpen(true);
  };

  return (
    <main className="overflow-x-hidden w-full min-h-screen bg-obsidian-950 text-gray-100 flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* 1. ANTI-THEFT BANNER (If company.isActive === false) */}
      <AntiTheftBanner
        company={company}
        onOpenSelector={() => setIsSelectorOpen(true)}
      />

      {/* 2. STICKY HEADER & NAV */}
      <Header
        company={company}
        onOpenSelector={() => setIsSelectorOpen(true)}
        onScrollToCalculator={scrollToCalculator}
        onScrollToForm={scrollToForm}
      />

      {/* 3. HERO SECTION */}
      <Hero
        company={company}
        onScrollToCalculator={scrollToCalculator}
        onScrollToForm={scrollToForm}
      />

      {/* 4. INTERACTIVE PDR CALCULATOR */}
      <PdrCalculator
        company={company}
        onLockPrice={handleLockPrice}
      />

      {/* 5. BEFORE / AFTER SLIDER */}
      <BeforeAfterSlider />

      {/* 6. EXPRESS PHOTO ASSESSMENT & TELEGRAM API FORM */}
      <PhotoAssessmentForm
        company={company}
        prefilledCalculation={prefilledCalculation}
        onSuccessSubmit={handleSuccessSubmit}
      />

      {/* 7. TRUST BLOCK / WHY PDR */}
      <TrustBlock company={company} />

      {/* FOOTER */}
      <footer className="bg-obsidian-900 border-t border-white/10 py-14 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            <h3 className="text-base font-bold text-white uppercase font-heading mb-2">
              {company.name}
            </h3>
            <p className="text-gray-400 mb-4">{company.logoSubtext || "Специализированная студия беспокрасочного удаления вмятин PDR"}</p>
            <div className="flex items-center gap-2 text-amber-400 font-medium">
              <MapPin className="w-4 h-4" />
              <span>{company.address}</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase font-heading mb-3">Контакты и График</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <a href={`tel:${company.phoneRaw}`} className="hover:text-amber-400 font-mono font-bold">{company.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{company.workingHours}</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-400">
                <Award className="w-3.5 h-3.5" />
                <span>Рейтинг яндекс карт: <strong>{company.rating} ★★★★★</strong></span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase font-heading mb-3">Мультиаренда / Для сервисов</h4>
            <p className="text-gray-400 leading-relaxed mb-3">
              Подключите свою PDR студию к онлайн-системе оценки. Персональный роут, брендинг и отправка заявок в Telegram.
            </p>
            <button
              onClick={() => setIsSelectorOpen(true)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-amber-400 font-bold uppercase text-[11px] border border-amber-500/30"
            >
              Сменить студию / Тест демо-режима
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/5 text-center text-[11px] text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} {company.name}. PDR Technology System.</span>
          <span>Разработано на Next.js 14, Tailwind CSS & Framer Motion.</span>
        </div>
      </footer>

      {/* 8. STICKY MOBILE BOTTOM BAR */}
      <StickyMobileBar
        company={company}
        onScrollToForm={scrollToForm}
      />

      {/* 9. SUCCESS MODAL */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        company={company}
        submittedData={submittedData}
      />

      {/* 10. MULTI-TENANT COMPANY SELECTOR MODAL */}
      <CompanySelectorModal
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        currentCompany={company}
      />

    </main>
  );
}
