"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PdrCompanyPage from "./pdr/[slug]/page";

function HomePageContent() {
  const searchParams = useSearchParams();
  const serviceSlug = searchParams.get("service") || "autovmyatina-msk";

  // Re-use PdrCompanyPage component with query param support
  return <PdrCompanyPage />;
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center text-amber-500 font-bold font-heading">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span>Загрузка PDR Студии...</span>
        </div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  );
}
