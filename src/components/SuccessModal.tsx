"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Clock, MessageCircle, X, ShieldAlert } from "lucide-react";
import { CompanyConfig } from "@/lib/companies";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyConfig;
  submittedData: any;
}

export function SuccessModal({ isOpen, onClose, company, submittedData }: SuccessModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes countdown

  useEffect(() => {
    if (!isOpen) return;
    setSecondsLeft(300);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTimer = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-glow-amber text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Animated Check Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Header */}
        <h3 className="text-2xl font-black uppercase text-white font-heading">
          Заявка успешно принята!
        </h3>

        <p className="text-sm text-gray-300 mt-2">
          Мастер PDR студии <strong className="text-white font-bold">{company.name}</strong> уже начал изучение ваших материалов.
        </p>

        {/* Timer Box */}
        <div className="my-6 p-4 rounded-2xl bg-black/50 border border-amber-500/30">
          <div className="flex items-center justify-center gap-2 text-amber-400 text-xs uppercase font-extrabold font-heading mb-1">
            <Clock className="w-4 h-4 animate-pulse" />
            <span>Ориентировочное время ответа мастера:</span>
          </div>
          <div className="text-4xl font-mono font-black text-gradient-gold tracking-widest my-1">
            {formattedTimer}
          </div>
          <p className="text-[11px] text-gray-400">
            Вам поступит сообщение или звонок на номер: <strong className="text-white font-mono">{submittedData?.phone}</strong>
          </p>
        </div>

        {/* Anti-Theft Notice if demo mode */}
        {!company.isActive && (
          <div className="mb-6 p-3 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs text-left flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-400 font-bold">Anti-Theft Защита Демо-режима:</strong>
              {submittedData?.demoMessage || "Заявка сохранена локально. Владельцу не передаются контакты клиентов до активации подписки."}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href={`https://wa.me/${company.whatsappPhone}?text=${encodeURIComponent(`Здравствуйте! Я оставил заявку на сайте ${company.name} (${submittedData?.phone}). Направляю дополнительные детали.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Написать мастеру в WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 font-bold text-xs uppercase tracking-wider"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
}
