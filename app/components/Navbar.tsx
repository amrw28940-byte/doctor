"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // التأكد من حالة تسجيل الدخول عند تحميل الصفحة
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setIsLoggedIn(true);
        setUserRole(parsedUser.role || '');
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }

    // إغلاق القائمة المنسدلة عند الضغط في أي مكان خارجها
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-black/80 backdrop-blur-md w-full z-50 relative">
      {/* 1. اللوجو */}
      <Link href="/" className="flex items-center shrink-0">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={60} 
          height={30} 
          className="object-contain w-auto h-auto max-h-12"
          priority={true} 
        />
      </Link>

      {/* 2. زر الموبايل */}
      <button 
        className="md:hidden text-white text-3xl focus:outline-none" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* 3. القائمة الرئيسية */}
      <ul className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-black/95 md:bg-transparent p-6 md:p-0 gap-4 lg:gap-6 font-medium text-white text-sm lg:text-base items-center transition-all duration-300 shadow-lg md:shadow-none`}>
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
          <Link href="/clinics" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">العيادات</Link>
        </li>
        <li>
          <Link href="/labs" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">المعامل والتحاليل</Link>
        </li>
        <li>
          <Link href="/pharmacies" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">الصيدليات</Link>
        </li>
        <li>
          <Link href="/nursing" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">التمريض المنزلي</Link>
        </li>
        <li>
          <Link href="/blog" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">المدونة</Link>
        </li>
      </ul>

      {/* 4. الأزرار (تتغير بناءً على حالة تسجيل الدخول) */}
      <div className="hidden md:flex items-center gap-4 shrink-0">
        {isLoggedIn ? (
          <>
            {/* حسابي الشخصي */}
            <Link 
              href={userRole === 'provider' ? '/provider/dashboard' : '/patient/profile'} 
              className="text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] flex items-center gap-2"
            >
              <span>👤</span>
              <span>حسابي الشخصي</span>
            </Link>
            {/* تسجيل خروج */}
            <button 
              onClick={handleLogout}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              تسجيل خروج
            </button>
          </>
        ) : (
          <>
            {/* تسجيل الدخول */}
            <Link 
              href="/login" 
              className="text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all border border-gray-800"
            >
              تسجيل الدخول
            </Link>
            {/* قائمة انضم إلينا */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all border border-gray-800"
              >
                <span>انضم إلينا</span>
                <span className={`text-xs transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-black/95 border border-red-900/50 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-xl">
                  <Link 
                    href="/register/patient" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-red-600/20 transition-colors"
                  >
                    👤 حساب مريض جديد
                  </Link>
                  <Link 
                    href="/join" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-red-600/20 transition-colors border-t border-gray-800"
                  >
                    🏥 انضم كـ مقدم خدمة طبية
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}