"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Car, Disc, Shield, Clock, CheckCircle2, ChevronRight, Phone, Sparkles, Send } from "lucide-react";
import { CompanyConfig } from "@/lib/companies";

interface PdrCalculatorProps {
  company: CompanyConfig;
  onLockPrice: (calculationData: any) => void;
}

// Step Data Definitions
const BODY_TYPES = [
  {
    id: "sedan",
    name: "Седан / Хэтчбек",
    desc: "Стандартный доступ к детали",
    multiplier: 1.0,
    badge: "Базовый тариф"
  },
  {
    id: "crossover",
    name: "Кроссовер / Универсал",
    desc: "Увеличенная площадь элементов",
    multiplier: 1.15,
    badge: "+15% к сложности"
  },
  {
    id: "suv",
    name: "Внедорожник / Премиум купе",
    desc: "Двойной металл, сложный разбор",
    multiplier: 1.25,
    badge: "+25% сложный доступ"
  },
];

const LOCATIONS = [
  {
    id: "hood_trunk",
    name: "Капот / Крышка багажника",
    desc: "Удобный доступ для PDR крючков",
    multiplier: 1.0,
  },
  {
    id: "door",
    name: "Дверь (верх / середина)",
    desc: "Ремонт через оконный проем или разбор",
    multiplier: 1.05,
  },
  {
    id: "fender",
    name: "Крыло (переднее / заднее)",
    desc: "Доступ через подкрылок или арку",
    multiplier: 1.1,
  },
  {
    id: "stiffener_edge",
    name: "Ребро жесткости / Кант двери",
    desc: "Сложная зона осадки и вытягивания",
    multiplier: 1.35,
    highlight: true,
  },
  {
    id: "roof",
    name: "Крыша автомобиля",
    desc: "Съем обшивки потолка + PDR лампа",
    multiplier: 1.3,
  },
];

const SIZES = [
  {
    id: "small",
    name: "Небольшая (до 3 см)",
    desc: "Размер с монету от парковочного удара",
    baseMin: 3000,
    baseMax: 4500,
    time: "40 мин – 1.5 часа",
  },
  {
    id: "medium",
    name: "Средняя (3 – 10 см)",
    desc: "Размер с ладонь, плавный залом",
    baseMin: 5000,
    baseMax: 7500,
    time: "1.5 – 2.5 часа",
  },
  {
    id: "large",
    name: "Большая / на ребре (> 10 см)",
    desc: "Глубокий острый залом или растяжение",
    baseMin: 8500,
    baseMax: 13500,
    time: "3 – 5 часов",
  },
  {
    id: "hail",
    name: "Множественный град",
    desc: "Множественные точечные вмятины по всему кузову",
    baseMin: 18000,
    baseMax: 35000,
    time: "1 – 2 дня (Комплекс)",
    highlight: true,
  },
];

export function PdrCalculator({ company, onLockPrice }: PdrCalculatorProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedBody, setSelectedBody] = useState<string>("sedan");
  const [selectedLocation, setSelectedLocation] = useState<string>("door");
  const [selectedSize, setSelectedSize] = useState<string>("medium");
  const [userPhone, setUserPhone] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Calculation logic
  const calculationResult = useMemo(() => {
    const bodyObj = BODY_TYPES.find((b) => b.id === selectedBody) || BODY_TYPES[0];
    const locObj = LOCATIONS.find((l) => l.id === selectedLocation) || LOCATIONS[0];
    const sizeObj = SIZES.find((s) => s.id === selectedSize) || SIZES[1];

    const totalMultiplier = bodyObj.multiplier * locObj.multiplier * company.priceModifier;
    const minPrice = Math.round((sizeObj.baseMin * totalMultiplier) / 100) * 100;
    const maxPrice = Math.round((sizeObj.baseMax * totalMultiplier) / 100) * 100;

    return {
      bodyName: bodyObj.name,
      locationName: locObj.name,
      sizeName: sizeObj.name,
      minPrice,
      maxPrice,
      estimatedTime: sizeObj.time,
    };
  }, [selectedBody, selectedLocation, selectedSize, company.priceModifier]);

  const handleLockPriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPhone.trim()) return;
    setIsSubmitted(true);
    onLockPrice({
      ...calculationResult,
      phone: userPhone,
    });
  };

  return (
    <section id="calculator-section" className="py-20 bg-obsidian-900/90 relative border-b border-white/10 overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Интерактивный PDR Калькулятор</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight font-heading text-white">
            Рассчитайте точную стоимость <span className="text-gradient-gold">удаления вмятины</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Выберите параметры повреждения для мгновенного расчета диапазона цен и времени работы с учетом прайса студии {company.name}.
          </p>
        </div>

        {/* Calculator Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Steps (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step Navigation Tabs */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 p-1.5 rounded-2xl bg-obsidian-800 border border-white/10">
              <button
                onClick={() => setStep(1)}
                className={`py-3 px-2 sm:px-4 rounded-xl font-heading text-xs sm:text-sm font-bold uppercase transition flex items-center justify-center gap-2 ${
                  step === 1
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-glow-amber"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">1</span>
                <span>Тип кузова</span>
              </button>

              <button
                onClick={() => setStep(2)}
                className={`py-3 px-2 sm:px-4 rounded-xl font-heading text-xs sm:text-sm font-bold uppercase transition flex items-center justify-center gap-2 ${
                  step === 2
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-glow-amber"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">2</span>
                <span>Зона вмятины</span>
              </button>

              <button
                onClick={() => setStep(3)}
                className={`py-3 px-2 sm:px-4 rounded-xl font-heading text-xs sm:text-sm font-bold uppercase transition flex items-center justify-center gap-2 ${
                  step === 3
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-glow-amber"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">3</span>
                <span>Размер вмятины</span>
              </button>
            </div>

            {/* STEP 1: Body Type Selection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold text-white uppercase font-heading flex items-center gap-2">
                  <Car className="w-5 h-5 text-amber-500" />
                  Шаг 1: Выберите тип кузова автомобиля
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {BODY_TYPES.map((item) => {
                    const isSelected = selectedBody === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedBody(item.id)}
                        className={`cursor-pointer p-5 rounded-2xl transition border text-left relative ${
                          isSelected ? "glass-card-active" : "glass-card hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                            isSelected ? "bg-amber-500 text-black" : "bg-white/10 text-gray-300"
                          }`}>
                            {item.badge}
                          </span>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                        </div>
                        <h4 className="text-base font-bold text-white font-heading">{item.name}</h4>
                        <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm uppercase flex items-center gap-2"
                  >
                    <span>Далее: Место повреждения</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Location Selection */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold text-white uppercase font-heading flex items-center gap-2">
                  <Disc className="w-5 h-5 text-amber-500" />
                  Шаг 2: Где располагается повреждение?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {LOCATIONS.map((loc) => {
                    const isSelected = selectedLocation === loc.id;
                    return (
                      <div
                        key={loc.id}
                        onClick={() => setSelectedLocation(loc.id)}
                        className={`cursor-pointer p-5 rounded-2xl transition border text-left relative ${
                          isSelected ? "glass-card-active" : "glass-card hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-base font-bold text-white font-heading">{loc.name}</h4>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                        </div>
                        <p className="text-xs text-gray-400">{loc.desc}</p>
                        {loc.highlight && (
                          <span className="inline-block mt-2 text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                            Повышенная сложность
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold uppercase"
                  >
                    Назад
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm uppercase flex items-center gap-2"
                  >
                    <span>Далее: Размер вмятины</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Dent Size & Character */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold text-white uppercase font-heading flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-500" />
                  Шаг 3: Определите размер и характер вмятины
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SIZES.map((sz) => {
                    const isSelected = selectedSize === sz.id;
                    return (
                      <div
                        key={sz.id}
                        onClick={() => setSelectedSize(sz.id)}
                        className={`cursor-pointer p-5 rounded-2xl transition border text-left relative ${
                          isSelected ? "glass-card-active" : "glass-card hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-base font-bold text-white font-heading">{sz.name}</h4>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                        </div>
                        <p className="text-xs text-gray-400 mb-3">{sz.desc}</p>
                        <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                          <span className="text-gray-400">Время: <strong className="text-white">{sz.time}</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-start pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold uppercase"
                  >
                    Назад к выбору зоны
                  </button>
                </div>
              </motion.div>
            )}

          </div>

          {/* Right Column: Live Calculation Summary Card (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 sticky top-28 shadow-[0_15px_40px_-15px_rgba(245,158,11,0.25)]">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 font-heading">
                  Итоговый расчет
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                  {company.city}
                </span>
              </div>

              {/* Price Range Display */}
              <div className="mb-6">
                <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                  Предварительная стоимость:
                </span>
                <div className="text-3xl sm:text-4xl font-black text-gradient-gold font-heading tracking-tight">
                  {calculationResult.minPrice.toLocaleString("ru-RU")} — {calculationResult.maxPrice.toLocaleString("ru-RU")} ₽
                </div>
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  Экономия от малярки ~{(calculationResult.minPrice * 2.2).toLocaleString("ru-RU")} ₽
                </p>
              </div>

              {/* Selected Attributes Breakdown */}
              <div className="space-y-2.5 text-xs bg-black/40 p-4 rounded-xl border border-white/5 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span className="text-gray-400">Кузов:</span>
                  <span className="font-semibold text-white">{calculationResult.bodyName}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="text-gray-400">Зона:</span>
                  <span className="font-semibold text-white">{calculationResult.locationName}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="text-gray-400">Размер:</span>
                  <span className="font-semibold text-white">{calculationResult.sizeName}</span>
                </div>
                <div className="flex justify-between text-amber-400 pt-2 border-t border-white/10 font-bold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Время ремонта:
                  </span>
                  <span>{calculationResult.estimatedTime}</span>
                </div>
              </div>

              {/* Price Lock Form */}
              {!isSubmitted ? (
                <form onSubmit={handleLockPriceSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-gray-300 uppercase font-semibold mb-1">
                      Введите номер для фиксации цены:
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+7 (999) 000-00-00"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm font-mono font-bold"
                      />
                    </div>
                  </div>

                  {/* PERFECTLY PADDED BUTTON WITH PROPER ICON SPACING & FLEX LAYOUT */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl btn-gradient-pdr text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.01] transition-transform"
                  >
                    <div className="flex items-center justify-center gap-2.5 w-full">
                      <Send className="w-4 h-4 shrink-0 stroke-[2.5]" />
                      <span className="text-center leading-tight">Зафиксировать цену и загрузить фото</span>
                    </div>
                  </button>

                  <p className="text-[10px] text-gray-400 text-center leading-tight">
                    *Фиксация цены гарантирует сохранение скидки на 7 дней
                  </p>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-white uppercase font-heading">Цена зафиксирована!</h4>
                  <p className="text-xs text-emerald-300 mt-1">
                    Прикрепите фото ниже, чтобы мастер сразу подтвердил финальную стоимость.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
