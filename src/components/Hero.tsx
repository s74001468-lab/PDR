"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, CheckCircle2, ArrowRight } from "lucide-react";
import { CompanyConfig } from "@/lib/companies";

interface HeroProps {
  company: CompanyConfig;
  onScrollToCalculator: () => void;
  onScrollToForm: () => void;
}

export function Hero({ company, onScrollToCalculator, onScrollToForm }: HeroProps) {
  return (
    <section className="relative min-h-screen w-full flex items-center pt-24 pb-16 overflow-hidden">
      
      {/* ФОНОВОЕ ИЗОБРАЖЕНИЕ РЕАЛЬНОГО ПРЕМИАЛЬНОГО АВТОМОБИЛЯ В ДЕТЕЙЛИНГ-СТУДИИ */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
          style={{
            backgroundImage: `url('/images/hero-real-car.jpg')`,
          }}
        />
        {/* Двойной градиентный фильтр для идеального контраста текста и реального авто */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-black/60 z-10" />
      </div>

      {/* КОНТЕНТ (СТРОГО ЛЕВОСТОРОННЯЯ ВЕРСТКА) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left">
          
          {/* БЕЙДЖ */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6"
          >
            <span>⚡ Сохранение заводского ЛКП 100%</span>
          </motion.div>

          {/* ЗАГОЛОВОК H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.1] mb-6 font-heading"
          >
            Удаление вмятин без покраски в г.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              {company.city}
            </span>
          </motion.h1>

          {/* СПИСОК ПРЕИМУЩЕСТВ С ИКОНКАМИ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3.5 mb-8 text-sm sm:text-base text-neutral-200"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white font-semibold">Толщиномер покажет заводской слой</strong> — авто не теряет в цене при продаже
              </span>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white font-semibold">Оценка точной стоимости по фото</strong> в WhatsApp/Telegram за 5 минут
              </span>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white font-semibold">Локальный ремонт от 40 минут</strong> без разбора обшивки и съема деталей
              </span>
            </div>
          </motion.div>

          {/* БЛОК КНОПОК (CTA) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8"
          >
            {/* Кнопка 1 (Главная) */}
            <button
              onClick={onScrollToCalculator}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all text-center flex items-center justify-center gap-2 uppercase tracking-wide text-sm sm:text-base"
            >
              <span>Рассчитать стоимость ремонта</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Кнопка 2 (Вторичная) */}
            <button
              onClick={onScrollToForm}
              className="w-full sm:w-auto border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-semibold px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-sm sm:text-base"
            >
              <Camera className="w-5 h-5 text-amber-400" />
              <span>Оценить по фото за 5 мин</span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
