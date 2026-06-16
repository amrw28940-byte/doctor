import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-12 py-6 bg-transparent w-full z-50">
      
      {/* 1. اللوجو (أول عنصر في الكود سيظهر في أقصى اليمين بسبب dir="rtl") */}
      <div className="flex items-center">
        <Image 
          src="/logo.png" 
          alt="Doctor Logo" 
          width={140} 
          height={60} 
          className="object-contain"
          priority={true} 
        />
      </div>

      {/* 2. القائمة (في المنتصف) */}
      <ul className="hidden md:flex gap-8 font-bold text-white text-lg">
        <li className="hover:text-red-500 cursor-pointer transition-colors duration-300">الرئيسية</li>
        <li className="hover:text-red-500 cursor-pointer transition-colors duration-300">الخدمات</li>
        <li className="hover:text-red-500 cursor-pointer transition-colors duration-300">الأطباء</li>
        <li className="hover:text-red-500 cursor-pointer transition-colors duration-300">اتصل بنا</li>
      </ul>

      {/* 3. زر الحجز (آخر عنصر في الكود سيظهر في أقصى اليسار) */}
      <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:scale-105">
        احجز استشارتك
      </button>

    </nav>
  );
}