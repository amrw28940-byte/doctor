"use client"; // ضروري جداً لأننا نستخدم useState

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  // حالة لإدارة فتح وإغلاق القائمة على الموبايل
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 py-6 bg-transparent w-full z-50 relative">
      
      {/* 1. اللوجو */}
      <Link href="/" className="flex items-center">
        <Image 
          src="/logo.png" 
          alt="Doctor Logo" 
          width={140} 
          height={60} 
          className="object-contain"
          priority={true} 
        />
      </Link>

      {/* 2. زر الموبايل (يظهر فقط على الموبايل md:hidden) */}
      <button 
        className="md:hidden text-white text-3xl focus:outline-none" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* 3. القائمة (تصبح عمودية على الموبايل وتظهر بناءً على حالة isOpen) */}
      <ul className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-black/90 md:bg-transparent p-8 md:p-0 gap-6 font-bold text-white text-lg items-center transition-all duration-300`}>
        <li>
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">الرئيسية</Link>
        </li>
        <li>
          <Link href="/services" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">الخدمات</Link>
        </li>
        <li>
          <Link href="/doctors" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">الأطباء</Link>
        </li>
        <li>
          <Link href="/blog" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">المدونة</Link>
        </li>
        <li>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">اتصل بنا</Link>
        </li>
      </ul>

      {/* 4. زر الحجز (مخفي على الموبايل لتوفير المساحة، يمكنك حذفه إذا أردت ظهوره دائماً) */}
      <div className="hidden md:block">
        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:scale-105">
          احجز استشارتك
        </button>
      </div>

    </nav>
  );
}