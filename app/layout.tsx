"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // 1. إذا كان المسار يتبع لوحة تحكم سانتي، لا تظهر الانترو نهائياً
    if (pathname?.startsWith("/studio")) {
      setShowSplash(false);
      return;
    }

    // 2. التحقق مما إذا شاهد المستخدم الفيديو مسبقاً في هذه الجلسة
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (!hasSeenSplash) {
      setShowSplash(true);
    }
  }, [pathname]);

  const handleComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenSplash", "true"); // حفظ أنه شاهده لكي لا يتكرر
  };

  return (
    <html lang="ar" dir="rtl">
      <body className="bg-black min-h-screen text-white relative overflow-x-hidden">
        
        {/* الـ Splash يظهر مرة واحدة فقط وفقط خارج الـ studio */}
        {showSplash && (
          <SplashScreen onComplete={handleComplete} />
        )}

        {/* الخلفية تظهر دائماً */}
        <div className="fixed inset-0 -z-10 bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-black to-black opacity-90 -skew-y-6 scale-150"></div>
        </div>
        
        {/* الهيدر يظهر دائماً */}
        <header className="w-full fixed top-0 z-50">
          <Navbar />
        </header>

        {/* المحتوى يظهر دائماً */}
        <main className="relative z-10 pt-24 px-6">
          {children}
        </main>

      </body>
    </html>
  );
}