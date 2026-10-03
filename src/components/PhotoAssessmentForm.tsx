"use client";

import React, { useState, useRef } from "react";
import { Camera, Upload, X, Send, CheckCircle2, AlertCircle, Phone, Car, MessageSquare, Sparkles } from "lucide-react";
import { CompanyConfig } from "@/lib/companies";

interface PhotoAssessmentFormProps {
  company: CompanyConfig;
  prefilledCalculation?: any;
  onSuccessSubmit: (data: any) => void;
}

export function PhotoAssessmentForm({ company, prefilledCalculation, onSuccessSubmit }: PhotoAssessmentFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [carBrand, setCarBrand] = useState<string>("");
  const [phone, setPhone] = useState<string>(prefilledCalculation?.phone || "");
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setErrorMsg(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setErrorMsg(null);
    }
  };

  const removePhoto = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setErrorMsg("Укажите ваш телефон для связи");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("slug", company.slug);
      formData.append("companyName", company.name);
      formData.append("city", company.city);
      formData.append("phone", phone);
      formData.append("carBrand", carBrand || "Не указана");
      formData.append("comment", comment || "Без комментария");
      formData.append("isActive", company.isActive ? "true" : "false");

      if (prefilledCalculation) {
        formData.append("calculation", JSON.stringify(prefilledCalculation));
      }

      if (file) {
        formData.append("photo", file);
      }

      const res = await fetch("/api/lead", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        onSuccessSubmit({
          phone,
          carBrand,
          isDemo: !company.isActive,
          demoMessage: data.demoMessage,
        });
      } else {
        setErrorMsg(data.error || "Ошибка при отправке. Попробуйте еще раз.");
      }
    } catch (err: any) {
      setErrorMsg("Ошибка сети. Проверьте соединение.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="photo-assessment-section" className="py-20 bg-obsidian-900 relative border-b border-white/10 overflow-hidden">
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Экспресс-оценка по снимку</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight font-heading text-white">
            Загрузите фото — получите <span className="text-gradient-gold">расчет за 5 минут</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            Мастер PDR студии {company.name} оценит степень сложности и пришлет точную смету в течение 10 минут.
          </p>
        </div>

        {/* Prefilled calculation notice banner */}
        {prefilledCalculation && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Прикреплен ваш расчет из калькулятора: <strong className="text-white font-bold">{prefilledCalculation.minPrice} — {prefilledCalculation.maxPrice} ₽</strong> ({prefilledCalculation.bodyName}, {prefilledCalculation.locationName})
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-white font-bold uppercase text-[10px]">
              Зафиксировано
            </span>
          </div>
        )}

        {/* Form Container */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* DROPZONE / FILE UPLOAD */}
            <div>
              <label className="block text-xs uppercase font-extrabold tracking-wider text-gray-300 font-heading mb-2">
                1. Загрузите фото повреждения с телефона или галереи
              </label>

              {!previewUrl ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/20 hover:border-amber-500/60 rounded-2xl p-8 text-center bg-black/40 cursor-pointer transition group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase font-heading">
                    Перетащите фото или <span className="text-amber-400 underline">выберите файл</span>
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Сфотографируйте вмятину под углом с отражением блика света
                  </p>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-amber-500/50 max-h-72 bg-black/60 flex items-center justify-center">
                  <img src={previewUrl} alt="Preview" className="object-contain max-h-72 w-full" />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute top-3 right-3 p-2 rounded-full bg-red-600/80 hover:bg-red-600 text-white shadow-lg transition"
                    title="Удалить фото"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/80 border border-white/20 text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Фото прикреплено ({file?.name})</span>
                  </div>
                </div>
              )}
            </div>

            {/* FORM INPUT FIELDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Phone Input */}
              <div>
                <label className="block text-xs uppercase font-extrabold tracking-wider text-gray-300 font-heading mb-2">
                  2. Ваш телефон (WhatsApp / Telegram) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+7 (999) 000-00-00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm font-mono font-bold"
                  />
                </div>
              </div>

              {/* Car Brand Input */}
              <div>
                <label className="block text-xs uppercase font-extrabold tracking-wider text-gray-300 font-heading mb-2">
                  3. Марка и модель авто
                </label>
                <div className="relative">
                  <Car className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Например: BMW X5 E70"
                    value={carBrand}
                    onChange={(e) => setCarBrand(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm font-medium"
                  />
                </div>
              </div>

            </div>

            {/* Comment / Note Input */}
            <div>
              <label className="block text-xs uppercase font-extrabold tracking-wider text-gray-300 font-heading mb-2">
                4. Комментарий или особенности (необязательно)
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <textarea
                  rows={2}
                  placeholder="Где находится вмятина, родная ли краска и т.д."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm resize-none"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* SUBMIT BUTTON WITH PERFECT FLEX LAYOUT AND PADDING */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 sm:px-8 rounded-2xl btn-gradient-pdr text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:scale-[1.01] transition-transform"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>Отправка данных мастеру...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 w-full">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 stroke-[2.5]" />
                  <span className="text-center leading-snug">Отправить на расчет мастеру {company.name}</span>
                </div>
              )}
            </button>

            <p className="text-[11px] text-gray-400 text-center">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Смета поступит в WhatsApp/Telegram.
            </p>

          </form>
        </div>

      </div>
    </section>
  );
}
