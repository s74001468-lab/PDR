import { NextResponse } from "next/server";
import { getCompanyBySlug } from "@/lib/companies";

// Store submitted leads in-memory for demo / inspection purposes
const DEMO_LEADS_STORE: any[] = [];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const slug = (formData.get("slug") as string) || "autovmyatina-msk";
    const phone = (formData.get("phone") as string) || "";
    const carBrand = (formData.get("carBrand") as string) || "Не указан";
    const comment = (formData.get("comment") as string) || "Без комментария";
    const calculationRaw = formData.get("calculation") as string;
    const photo = formData.get("photo") as File | null;

    const company = getCompanyBySlug(slug);

    let calculationData = null;
    if (calculationRaw) {
      try {
        calculationData = JSON.parse(calculationRaw);
      } catch (e) {
        console.error("Error parsing calculation JSON", e);
      }
    }

    const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

    // Format lead notification text
    let messageText = `<b>🚗 НОВАЯ ЗАЯВКА НА PDR РЕМОНТ</b>\n`;
    messageText += `------------------------------------\n`;
    messageText += `<b>Студия:</b> ${company.name} (${company.city})\n`;
    messageText += `<b>Телефон:</b> <code>${phone}</code>\n`;
    messageText += `<b>Автомобиль:</b> ${carBrand}\n`;
    messageText += `<b>Комментарий:</b> ${comment}\n`;

    if (calculationData) {
      messageText += `\n<b>📊 РАСЧЕТ ИЗ КАЛЬКУЛЯТОРА:</b>\n`;
      messageText += `• Кузов: ${calculationData.bodyName}\n`;
      messageText += `• Зона: ${calculationData.locationName}\n`;
      messageText += `• Размер: ${calculationData.sizeName}\n`;
      messageText += `• Оценка: <b>${calculationData.minPrice} — ${calculationData.maxPrice} ₽</b>\n`;
      messageText += `• Время: ${calculationData.estimatedTime}\n`;
    }

    messageText += `\n<b>Дата:</b> ${timestamp}\n`;
    messageText += `<b>Ссылка:</b> https://pdr-service.ru/pdr/${company.slug}`;

    // ANTI-THEFT LOGIC CHECK
    if (!company.isActive) {
      console.warn(`[ANTI-THEFT SYSTEM TRIGGERED] Lead from ${phone} for unpaid company ${company.name} (${slug}) was intercepted and blocked from owner Telegram.`);
      
      DEMO_LEADS_STORE.push({
        id: Date.now(),
        company: company.name,
        slug: company.slug,
        phone,
        carBrand,
        comment,
        calculationData,
        timestamp,
        intercepted: true
      });

      return NextResponse.json({
        success: true,
        isDemo: true,
        demoMessage: `⚠️ Демо-режим активен! Заявка клиента (${phone}) заблокирована системой защиты Anti-Theft и НЕ отправлена владельцу ${company.name}, так как сервис находится в демонстрационном режиме.`,
      });
    }

    // ACTIVE PAID COMPANY -> SEND TO TELEGRAM BOT API
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = company.telegramChatId || process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      if (photo && photo.size > 0) {
        // Send Photo with caption
        const tgFormData = new FormData();
        tgFormData.append("chat_id", chatId);
        tgFormData.append("caption", messageText);
        tgFormData.append("parse_mode", "HTML");
        tgFormData.append("photo", photo);

        const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
          method: "POST",
          body: tgFormData,
        });
        const tgData = await tgRes.json();
        console.log("Telegram sendPhoto response:", tgData);
      } else {
        // Send Text message
        const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: messageText,
            parse_mode: "HTML",
          }),
        });
        const tgData = await tgRes.json();
        console.log("Telegram sendMessage response:", tgData);
      }
    } else {
      console.log(`[PAID COMPANY LEAD SIMULATED] Telegram credentials not configured in env, lead for ${company.name}:`, messageText);
    }

    return NextResponse.json({
      success: true,
      isDemo: false,
      message: "Заявка успешно доставлена мастеру!",
    });
  } catch (error: any) {
    console.error("Error processing lead API:", error);
    return NextResponse.json(
      { success: false, error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "PDR Lead API operational",
    demoLeadsCount: DEMO_LEADS_STORE.length,
    recentDemoLeads: DEMO_LEADS_STORE.slice(-5),
  });
}
