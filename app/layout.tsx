"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <html lang="ar" dir="rtl">
      <body className="bg-black min-h-screen text-white relative overflow-x-hidden">
        
        {showSplash ? (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        ) : (
          <>
            {/* تصميم الخلفية */}
            <div className="fixed inset-0 -z-10 bg-black">
              <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-black to-black opacity-90 -skew-y-6 scale-150"></div>
            </div>
            
            {/* الهيدر */}
            <header className="w-full fixed top-0 z-50">
              <Navbar />
            </header>

            {/* المحتوى */}
            <main className="relative z-10 pt-24 px-6">
              {children}
            </main>
          </>
        )}
      </body>
    </html>
  );
}