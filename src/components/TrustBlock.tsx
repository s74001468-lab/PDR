"use client";

import React from "react";
import { ShieldCheck, Zap, Coins, Crosshair, Sparkles } from "lucide-react";
import { CompanyConfig } from "@/lib/companies";

interface TrustBlockProps {
  company: CompanyConfig;
}

const CARDS = [
  {
    icon: ShieldCheck,
    title: "Не теряете рыночную цену",
    desc: "Автомобиль не переходит в статус «крашеного» или «битого» при проверке толщиномером перед продажей. Заводской слой краски остается нетронутым.",
    highlight: "100% Заводское ЛКП",
  },
  {
    icon: Zap,
    title: "Молниеносная скорость",
    desc: "90% повреждений устраняются день в день за 1–3 часа. Вам не придется оставлять авто в сервисе на недели, как при традиционной малярке.",
    highlight: "Ремонт от 40 минут",
  },
  {
    icon: Coins,
    title: "Экономия до 70%",
    desc: "Отсутствуют расходы на дорогостоящие материалы (шпатлевка, грунт, краска, лак, подбор цвета и сушильная камера). Вы платите только за мастерство.",
    highlight: "В 2–3 раза дешевле",
  },
  {
    icon: Crosshair,
    title: "Ювелирная точность",
    desc: "Работа выполняется немецким рессорным инструментом под микроскопическими градиентными PDR-лампами высокой четкости.",
    highlight: "Без бликов и просадок",
  },
];

export function TrustBlock({ company }: TrustBlockProps) {
  return (
    <section id="why-pdr" className="py-20 bg-obsidian-950 relative border-b border-white/10 overflow-hidden">
      
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-amber-500/10 via-orange-600/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Преимущества немецкой PDR технологии</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight font-heading text-white">
            Почему PDR, а <span className="text-gradient-gold">не классическая малярка?</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            Беспокрасочный ремонт — это сохранение премиального статуса вашего автомобиля без риска расхождения цвета и отслаивания шпатлевки.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 sm:p-8 rounded-3xl relative flex flex-col justify-between group hover:border-amber-500/50 transition duration-300"
              >
                <div>
                  {/* Card Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white uppercase font-heading mb-3">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Highlight Tag - Clean Font for Numbers */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 font-sans">
                    ✓ {card.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
