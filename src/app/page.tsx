"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PdrCompanyPage from "./pdr/[slug]/page";

function HomePageContent() {
  const searchParams = useSearchParams();
  // Read ?service=slug query parameter or default to 'pdr-kovaleva-krd'
  const serviceSlug = searchParams.get("service") || "pdr-kovaleva-krd";

  return <PdrCompanyPage />;
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center text-amber-500 font-bold font-heading">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span>Загрузка PDR Студии на Ковалёва...</span>
        </div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  );
}
