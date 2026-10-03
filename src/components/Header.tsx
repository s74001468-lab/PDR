"use client";

import React, { useState } from "react";
import { Phone, MessageCircle, Menu, X, Calculator, Camera, Sparkles, Layers } from "lucide-react";
import { CompanyConfig } from "@/lib/companies";

interface HeaderProps {
  company: CompanyConfig;
  onOpenSelector: () => void;
  onScrollToCalculator: () => void;
  onScrollToForm: () => void;
}

export function Header({ company, onOpenSelector, onScrollToCalculator, onScrollToForm }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    setIsMobileMenuOpen(false);
    action();
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black/85 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
        
        {/* СЛЕВА: Логотип и динамическое название сервиса */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="min-w-0">
            <a href="#" className="text-base sm:text-xl font-black tracking-wider text-white uppercase font-heading block truncate">
              {company.name}
            </a>
            <span className="text-[10px] sm:text-xs text-neutral-400 font-normal block leading-tight truncate">
              PDR Студия • {company.city}
            </span>
          </div>
        </div>

        {/* ЦЕНТР: Навигация (десктоп) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <button
            onClick={onScrollToCalculator}
            className="hover:text-amber-400 transition-colors uppercase tracking-wider text-xs font-semibold cursor-pointer"
          >
            Калькулятор
          </button>
          <a
            href="#slider-section"
            className="hover:text-amber-400 transition-colors uppercase tracking-wider text-xs font-semibold cursor-pointer"
          >
            До / После
          </a>
          <a
            href="#why-pdr"
            className="hover:text-amber-400 transition-colors uppercase tracking-wider text-xs font-semibold cursor-pointer"
          >
            Преимущества
          </a>
          <button
            onClick={onScrollToForm}
            className="hover:text-amber-400 transition-colors uppercase tracking-wider text-xs font-semibold cursor-pointer"
          >
            Оценка по фото
          </button>
        </nav>

        {/* СПРАВА: Телефон сервиса СТРОГО В ОДНУ СТРОКУ + Кнопки */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* ТЕЛЕФОН СТРОГО В ОДНУ СТРОКУ БЕЗ ПЕРЕНОСОВ */}
          <div className="text-right whitespace-nowrap">
            <a
              href={`tel:${company.phoneRaw}`}
              className="text-xs sm:text-base font-bold text-white hover:text-amber-500 transition-colors font-mono whitespace-nowrap block"
            >
              {company.phone}
            </a>
            <span className="text-[10px] text-neutral-400 hidden sm:block leading-none mt-0.5">
              Ежедневно 9:00 - 21:00
            </span>
          </div>

          {/* WhatsApp кнопка на ПК */}
          <a
            href={`https://wa.me/${company.whatsappPhone}?text=${encodeURIComponent(`Здравствуйте! Хочу оценить стоимость ремонта вмятины в студии ${company.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-bold px-3.5 py-2 rounded-lg text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 fill-black/20" />
            <span>WhatsApp</span>
          </a>

          {/* Кнопка вызова на мобиле */}
          <a
            href={`tel:${company.phoneRaw}`}
            className="md:hidden p-2 rounded-lg bg-amber-500 text-black font-bold flex items-center justify-center shrink-0"
            title="Позвонить"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* КНОПКА БУРГЕР-МЕНЮ ДЛЯ МОБИЛЬНОЙ ВЕРСИИ */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/10 transition shrink-0"
            aria-label="Открыть меню"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* МОБИЛЬНОЕ ВЫПАДАЮЩЕЕ БУРГЕР-МЕНЮ */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-obsidian-950/95 backdrop-blur-2xl border-b border-white/15 px-6 py-6 space-y-4 animate-fade-in">
          <nav className="flex flex-col space-y-3 font-heading uppercase text-sm">
            <button
              onClick={() => handleNavClick(onScrollToCalculator)}
              className="flex items-center gap-3 py-2 text-white hover:text-amber-400 font-bold border-b border-white/5 text-left"
            >
              <Calculator className="w-4 h-4 text-amber-500" />
              <span>PDR Калькулятор цен</span>
            </button>

            <a
              href="#slider-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-white hover:text-amber-400 font-bold border-b border-white/5"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Примеры работы До / После</span>
            </a>

            <a
              href="#why-pdr"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-white hover:text-amber-400 font-bold border-b border-white/5"
            >
              <Camera className="w-4 h-4 text-amber-500" />
              <span>Преимущества PDR</span>
            </a>

            <button
              onClick={() => handleNavClick(onScrollToForm)}
              className="flex items-center gap-3 py-2 text-white hover:text-amber-400 font-bold border-b border-white/5 text-left"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>Оценка по фото за 5 мин</span>
            </button>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`https://wa.me/${company.whatsappPhone}?text=${encodeURIComponent(`Здравствуйте! Хочу оценить стоимость ремонта вмятины в студии ${company.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Написать в WhatsApp</span>
            </a>

            <button
              onClick={() => handleNavClick(onOpenSelector)}
              className="w-full py-2.5 rounded-xl bg-white/10 text-amber-400 text-xs font-bold uppercase flex items-center justify-center gap-2 border border-amber-500/30"
            >
              <Layers className="w-4 h-4" />
              <span>Сменить город / Студию</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
