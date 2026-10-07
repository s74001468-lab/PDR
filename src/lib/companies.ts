export interface CompanyConfig {
  slug: string;
  name: string;
  city: string;
  phone: string;
  phoneRaw: string;
  whatsappPhone: string;
  telegramChatId: string;
  isActive: boolean;
  priceModifier: number;
  address: string;
  shortAddress?: string;
  rating: number;
  workingHours: string;
  logoSubtext?: string;
  heroTitle?: string;
}

export const COMPANIES: Record<string, CompanyConfig> = {
  "garavto-pdr-krd": {
    slug: "garavto-pdr-krd",
    name: "Студия беспокрасочного удаления вмятин «ГарАвто Pdr»",
    city: "Краснодаре",
    phone: "+7 (918) 091-13-47",
    phoneRaw: "79180911347",
    whatsappPhone: "79180911347",
    telegramChatId: "garavtopdr_krd",
    isActive: false, // Задано is_active: false (Демо-режим Anti-Theft защиты)
    priceModifier: 0.55, // Прайс-лист: от 1500 ₽ (малая ~2000 ₽, средняя ~4000 ₽, сложная ~7500 ₽)
    address: "г. Краснодар, микрорайон Гидростроителей",
    shortAddress: "Краснодар, мкр. Гидростроителей",
    rating: 4.96,
    workingHours: "Ежедневно с 09:00 до 20:00",
    logoSubtext: "Студия беспокрасочного удаления вмятин ГМР",
    heroTitle: "Удаление вмятин без покраски в Краснодаре (ГМР)"
  },
  "kuzovnoi-dok-krd": {
    slug: "kuzovnoi-dok-krd",
    name: "Кузовной центр «Кузовной Док»",
    city: "Краснодаре",
    phone: "+7 (918) 355-41-92",
    phoneRaw: "79183554192",
    whatsappPhone: "79183554192",
    telegramChatId: "kuzovnoidok_krd",
    isActive: false, // Задано is_active: false (Демо-режим Anti-Theft защиты)
    priceModifier: 0.65,
    address: "г. Краснодар, улица Стасова, 170/3",
    shortAddress: "улица Стасова, 170/3",
    rating: 4.4,
    workingHours: "Ежедневно с 09:00 до 20:00",
    logoSubtext: "Кузовной ремонт, удаление вмятин и детейлинг",
    heroTitle: "Кузовной ремонт и удаление вмятин в Краснодаре"
  },
  "pdr-kovaleva-krd": {
    slug: "pdr-kovaleva-krd",
    name: "Студия удаления вмятин PDR на Ковалёва",
    city: "Краснодаре",
    phone: "+7 (978) 784-01-13",
    phoneRaw: "79787840113",
    whatsappPhone: "79787840113",
    telegramChatId: "9787840113_chat",
    isActive: true, // Сделана активной для демонстрации
    priceModifier: 0.55, // Прайс-лист: от 1500 ₽ (малая ~2000 ₽, средняя ~4000 ₽, сложная ~7000 ₽)
    address: "г. Краснодар, ул. Ковалёва, 15/4, бокс 18",
    shortAddress: "ул. Ковалёва, 15/4, бокс 18",
    rating: 4.98,
    workingHours: "Ежедневно с 09:00 до 20:00",
    logoSubtext: "Студия локального беспокрасочного ремонта ЛКП"
  },
  "pdr-kalinina-krd": {
    slug: "pdr-kalinina-krd",
    name: "Студия PDR на Калинина",
    city: "Краснодаре",
    phone: "+7 (918) 123-45-67",
    phoneRaw: "79181234567",
    whatsappPhone: "79181234567",
    telegramChatId: "9181234567_chat",
    isActive: true,
    priceModifier: 0.55,
    address: "г. Краснодар, ул. Калинина, 340, бокс 5",
    shortAddress: "ул. Калинина, 340, бокс 5",
    rating: 4.97,
    workingHours: "Ежедневно с 09:00 до 20:00",
    logoSubtext: "Беспокрасочное удаление вмятин на Калинина"
  },
  "autovmyatina-msk": {
    slug: "autovmyatina-msk",
    name: "AutoVmyatina PDR Studio",
    city: "Москве",
    phone: "+7 (495) 890-12-34",
    phoneRaw: "+74958901234",
    whatsappPhone: "74958901234",
    telegramChatId: "123456789",
    isActive: true,
    priceModifier: 1.0,
    address: "г. Москва, ул. Кутузовский проспект, 36Б",
    shortAddress: "Кутузовский проспект, 36Б",
    rating: 4.98,
    workingHours: "Ежедневно с 09:00 до 21:00",
    logoSubtext: "Премиальный PDR Детейлинг №1 в Москве"
  },
  "pdr-pro-spb": {
    slug: "pdr-pro-spb",
    name: "PDR-Pro Санкт-Петербург",
    city: "Санкт-Петербурге",
    phone: "+7 (812) 555-90-80",
    phoneRaw: "+78125559080",
    whatsappPhone: "78125559080",
    telegramChatId: "987654321",
    isActive: true,
    priceModifier: 0.95,
    address: "г. Санкт-Петербург, Московский проспект, 142",
    shortAddress: "Московский проспект, 142",
    rating: 4.95,
    workingHours: "Ежедневно с 10:00 до 20:00",
    logoSubtext: "Студия локального ремонта ЛКП"
  },
  "master-dent-kzn": {
    slug: "master-dent-kzn",
    name: "Master Dent Казань",
    city: "Казани",
    phone: "+7 (843) 222-33-44",
    phoneRaw: "+78432223344",
    whatsappPhone: "78432223344",
    telegramChatId: "456789123",
    isActive: true,
    priceModifier: 0.85,
    address: "г. Казань, ул. Сибгата Хакима, 52",
    shortAddress: "ул. Сибгата Хакима, 52",
    rating: 4.92,
    workingHours: "Пн-Сб с 09:00 до 19:00",
    logoSubtext: "Беспокрасочный ремонт кузова"
  },
  "vip-pdr-demo": {
    slug: "vip-pdr-demo",
    name: "VIP Detailing PDR (НЕ ОПЛАЧЕНО)",
    city: "Сочи",
    phone: "+7 (999) 000-11-22",
    phoneRaw: "+79990001122",
    whatsappPhone: "79990001122",
    telegramChatId: "demo_unpaid_chat_id",
    isActive: false, // ANTI-THEFT TRIGGERED: leads blocked, warning banner shown
    priceModifier: 1.2,
    address: "г. Сочи, Курортный проспект, 89",
    shortAddress: "Курортный проспект, 89",
    rating: 4.99,
    workingHours: "Ежедневно с 09:00 до 21:00",
    logoSubtext: "Демонстрационный режим автосервиса"
  }
};

export const DEFAULT_SLUG = "garavto-pdr-krd";

export function getCompanyBySlug(slug?: string): CompanyConfig {
  if (!slug || !COMPANIES[slug]) {
    return COMPANIES[DEFAULT_SLUG];
  }
  return COMPANIES[slug];
}
