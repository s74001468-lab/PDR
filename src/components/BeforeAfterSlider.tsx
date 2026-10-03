"use client";

import React, { useState, useRef, useCallback } from "react";
import { MoveHorizontal, Sparkles, CheckCircle, Clock, Tag } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  car: string;
  damage: string;
  price: string;
  time: string;
  beforeImg: string;
  afterImg: string;
}

const CASES: CaseStudy[] = [
  {
    id: "real-fender-pdr",
    title: "Ремонт сложной вмятины арки и ребра крыла",
    car: "Toyota Land Cruiser",
    damage: "Глубокий острый залом ребра над передней колесной аркой",
    price: "4 000 ₽",
    time: "от 40 минут до 3 часов",
    beforeImg: "/images/pdr-before.jpg",
    afterImg: "/images/pdr-after.jpg",
  },
  {
    id: "bmw3-hood-krd",
    title: "Капот BMW 3 (залом на ребре)",
    car: "BMW 3 Series",
    damage: "Сложный залом жесткого ребра алюминиевого капота",
    price: "4 000 ₽",
    time: "от 40 минут до 3 часов",
    beforeImg: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
    afterImg: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "bmw-door",
    title: "Вмятина на ребре жесткости двери",
    car: "BMW M4 Competition",
    damage: "Глубокий залом ребра 12 см от парковочной двери",
    price: "7 000 ₽",
    time: "2.5 часа",
    beforeImg: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200",
    afterImg: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200",
  },
];

export function BeforeAfterSlider() {
  const [activeCase, setActiveCase] = useState<CaseStudy>(CASES[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  return (
    <section id="slider-section" className="py-20 bg-obsidian-950 relative border-b border-white/10 overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[300px] bg-amber-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Реальные работы мастера PDR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight font-heading text-white">
            Интерактивный слайдер <span className="text-gradient-gold">ДО / ПОСЛЕ</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            Потяните ползунок влево или вправо, чтобы оценить 100% восстановление заводской плоскости без малярки.
          </p>
        </div>

        {/* Case Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {CASES.map((item) => {
            const isActive = activeCase.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCase(item);
                  setSliderPosition(50);
                }}
                className={`px-5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase transition flex items-center gap-2 ${
                  isActive
                    ? "bg-amber-500 text-black shadow-glow-amber"
                    : "glass-card text-gray-300 hover:text-white"
                }`}
              >
                <span>{item.car}</span>
              </button>
            );
          })}
        </div>

        {/* Slider Box */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[380px] sm:h-[480px] w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl select-none cursor-ew-resize touch-pan-y"
          >
            {/* AFTER Image (Full Layer underneath) */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${activeCase.afterImg})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-emerald-500/90 text-black text-xs font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>ПОСЛЕ (Заводское ЛКП)</span>
              </div>
            </div>

            {/* BEFORE Image (Clipped Layer on Top) */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${activeCase.beforeImg})`,
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
              
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-red-600/90 text-white text-xs font-extrabold uppercase tracking-wider shadow-lg">
                ДО (Вмятина кузова)
              </div>
            </div>

            {/* Vertical Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_15px_#f59e0b] z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Drag Handle Button */}
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-black border-2 border-white shadow-2xl flex items-center justify-center font-bold">
                <MoveHorizontal className="w-5 h-5 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Case Info Details Footer Card */}
          <div className="mt-6 glass-panel p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-amber-400 font-bold uppercase font-heading text-xs block mb-0.5">
                {activeCase.car} — {activeCase.title}
              </span>
              <p className="text-gray-300">{activeCase.damage}</p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-1.5 text-gray-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Время: <strong className="text-white font-semibold">{activeCase.time}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold font-mono text-sm">
                <Tag className="w-3.5 h-3.5" />
                <span>{activeCase.price}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
