import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-12 py-6 bg-transparent w-full z-50">
      
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

      {/* 2. القائمة (تم إضافة المدونة) */}
      <ul className="hidden md:flex gap-8 font-bold text-white text-lg">
        <li>
          <Link href="/" className="hover:text-red-500 cursor-pointer transition-colors duration-300">الرئيسية</Link>
        </li>
        <li>
          <Link href="/services" className="hover:text-red-500 cursor-pointer transition-colors duration-300">الخدمات</Link>
        </li>
        <li>
          <Link href="/doctors" className="hover:text-red-500 cursor-pointer transition-colors duration-300">الأطباء</Link>
        </li>
        <li>
          <Link href="/blog" className="hover:text-red-500 cursor-pointer transition-colors duration-300">المدونة</Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-red-500 cursor-pointer transition-colors duration-300">اتصل بنا</Link>
        </li>
      </ul>

      {/* 3. زر الحجز */}
      <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:scale-105">
        احجز استشارتك
      </button>

    </nav>
  );
}