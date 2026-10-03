import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PDR Studio — Устранение вмятин без покраски со скидкой 70%",
  description: "Профессиональное удаление вмятин без покраски (PDR) в вашем городе. Сохранение 100% заводского ЛКП, ремонт от 40 минут. Оценка по фото в WhatsApp/Telegram за 5 минут.",
  keywords: ["PDR", "удаление вмятин без покраски", "детейлинг", "ремонт вмятин", "PDR лампа", "выпрямление вмятин"],
};

export const viewport: Viewport = {
  themeColor: "#070709",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@700;800;900&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#070709] text-gray-100 antialiased min-h-screen selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
