'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  // حالة جديدة عشان نحدد نوع الدخول من الواجهة مباشرة
  const [loginRole, setLoginRole] = useState<'patient' | 'provider'>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // محاكاة مؤقتة للتحقق
      setTimeout(() => {
        
        // حطينا الـ ID الحقيقي بتاعك هنا
        const dummyProviderId = "MRZ6fdrywpnUGhOEMcow0G"; 

        localStorage.setItem('user', JSON.stringify({ 
          email: formData.identifier, 
          role: loginRole,
          id: loginRole === 'provider' ? dummyProviderId : 'patient_dummy_id' 
        }));
        
        if (loginRole === 'provider') {
          router.push('/provider/dashboard'); // توجيه مقدم الخدمة
        } else {
          router.push('/patient/profile'); // توجيه المريض
        }
      }, 1500);

    } catch (err) {
      setError('بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#1a0000] to-red-950 font-sans" dir="rtl">
      <div className="w-full max-w-md p-8 space-y-8 bg-black/60 backdrop-blur-xl border border-red-900/30 rounded-3xl shadow-[0_0_40px_rgba(220,38,38,0.1)]">
        
        <div className="text-center">
          <h2 className="text-3xl font-black text-white mb-2">تسجيل الدخول</h2>
          <p className="text-gray-400 text-sm">أهلاً بك في الدليل الطبي الشامل</p>
        </div>

        {/* مفاتيح التبديل (Tabs) بين المريض ومقدم الخدمة */}
        <div className="flex p-1 bg-gray-900/50 rounded-xl border border-gray-800">
          <button
            type="button"
            onClick={() => setLoginRole('patient')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              loginRole === 'patient' 
                ? 'bg-red-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            دخول مريض
          </button>
          <button
            type="button"
            onClick={() => setLoginRole('provider')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              loginRole === 'provider' 
                ? 'bg-red-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            دخول مقدم خدمة
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300">البريد الإلكتروني أو اسم المستخدم</label>
            <input
              type="text"
              required
              value={formData.identifier}
              onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl text-white outline-none transition-all"
              placeholder="example@email.com"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-300">كلمة المرور</label>
              <Link href="/forgot-password" className="text-xs text-red-500 hover:text-red-400 transition-colors">
                نسيت كلمة المرور؟
              </Link>
            </div>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl text-white outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-900/50 transition-all disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              'دخول'
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-400 pt-4 border-t border-gray-800">
          ليس لديك حساب بعد؟{' '}
          {/* تغيير مسار التسجيل بناءً على التاب المختار */}
          <Link 
            href={loginRole === 'provider' ? '/join' : '/register/patient'} 
            className="text-white font-bold hover:text-red-500 transition-colors"
          >
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    </div>
  );
}