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
  rating: number;
  workingHours: string;
  logoSubtext?: string;
}

export const COMPANIES: Record<string, CompanyConfig> = {
  "autovmyatina-msk": {
    slug: "autovmyatina-msk",
    name: "AutoVmyatina PDR Studio",
    city: "Москва",
    phone: "+7 (495) 890-12-34",
    phoneRaw: "+74958901234",
    whatsappPhone: "74958901234",
    telegramChatId: "123456789",
    isActive: true,
    priceModifier: 1.0,
    address: "г. Москва, ул. Кутузовский проспект, 36Б",
    rating: 4.98,
    workingHours: "Ежедневно с 09:00 до 21:00",
    logoSubtext: "Премиальный PDR Детейлинг №1 в Москве"
  },
  "pdr-pro-spb": {
    slug: "pdr-pro-spb",
    name: "PDR-Pro Санкт-Петербург",
    city: "Санкт-Петербург",
    phone: "+7 (812) 555-90-80",
    phoneRaw: "+78125559080",
    whatsappPhone: "78125559080",
    telegramChatId: "987654321",
    isActive: true,
    priceModifier: 0.95,
    address: "г. Санкт-Петербург, Московский проспект, 142",
    rating: 4.95,
    workingHours: "Ежедневно с 10:00 до 20:00",
    logoSubtext: "Студия локального ремонта ЛКП"
  },
  "master-dent-kzn": {
    slug: "master-dent-kzn",
    name: "Master Dent Казань",
    city: "Казань",
    phone: "+7 (843) 222-33-44",
    phoneRaw: "+78432223344",
    whatsappPhone: "78432223344",
    telegramChatId: "456789123",
    isActive: true,
    priceModifier: 0.85,
    address: "г. Казань, ул. Сибгата Хакима, 52",
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
    rating: 4.99,
    workingHours: "Ежедневно с 09:00 до 21:00",
    logoSubtext: "Демонстрационный режим автосервиса"
  }
};

export const DEFAULT_SLUG = "autovmyatina-msk";

export function getCompanyBySlug(slug?: string): CompanyConfig {
  if (!slug || !COMPANIES[slug]) {
    return COMPANIES[DEFAULT_SLUG];
  }
  return COMPANIES[slug];
}
