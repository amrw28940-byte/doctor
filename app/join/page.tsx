"use client";

import React, { useState } from 'react';

export default function JoinPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    category: 'doctor',
    phone: '',
    email: '',
    syndicateCard: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // التحقق من تطابق وقوة كلمة المرور قبل الإرسال
    if (formData.password.length < 6) {
      setError('كلمة المرور يجب أن تتكون من 6 أحرف على الأقل.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('كلمتا المرور غير متطابقتين، يرجى التأكد.');
      return;
    }

    setLoading(true);

    try {
      // إرسال البيانات إلى الـ API Route
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // نبعت الداتا بدون حقل التأكيد لأنه ملوش لزمة في السيرفر
        body: JSON.stringify({
          fullName: formData.fullName,
          category: formData.category,
          phone: formData.phone,
          email: formData.email,
          syndicateCard: formData.syndicateCard,
          password: formData.password, 
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'حدث خطأ ما أثناء إرسال الطلب');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Error submitting form:", err);
      setError(err.message || 'حدث خطأ أثناء إرسال الطلب، تأكد من الاتصال.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 bg-black/80 backdrop-blur-md rounded-2xl border border-red-900/50 my-12 shadow-2xl" dir="rtl">
      <h1 className="text-3xl font-bold text-center mb-2 text-red-500">انضم إلينا كـ مزود خدمة طبية</h1>
      <p className="text-gray-300 text-center mb-8">املأ النموذج أدناه وسيتم مراجعة طلبك وتفعيل حسابك قريباً</p>

      {submitted ? (
        <div className="bg-green-900/50 border border-green-500 text-green-200 p-6 rounded-xl text-center">
          تم إرسال طلبك بنجاح! سيتم مراجعته والتواصل معك في أقرب وقت.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-xl text-center text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-200">الاسم بالكامل أو اسم الجهة الطبية</label>
            <input 
              type="text" 
              required
              placeholder="مثال: د. أحمد محمد / عيادة الشفاء"
              className="w-full bg-black/60 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition-colors"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-200">اختر القسم</label>
            <select 
              className="w-full bg-black/90 border border-gray-700 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none transition-colors"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="doctor">طبيب</option>
              <option value="clinic">عيادة</option>
              <option value="lab">معمل تحاليل وأشعة</option>
              <option value="pharmacy">صيدلية</option>
              <option value="nursing">تمريض منزلي</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-200">رقم الهاتف / واتساب</label>
              <input 
                type="text" 
                required
                placeholder="مثال: 01012345678"
                className="w-full bg-black/60 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition-colors"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-200">البريد الإلكتروني</label>
              <input 
                type="email" 
                required
                placeholder="example@domain.com"
                className="w-full bg-black/60 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-200">رقم ترخيص المزاولة أو كارنيه النقابة</label>
            <input 
              type="text" 
              required
              placeholder="أدخل رقم القيد أو الترخيص الرسمي"
              className="w-full bg-black/60 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition-colors"
              value={formData.syndicateCard}
              onChange={(e) => setFormData({...formData, syndicateCard: e.target.value})}
            />
          </div>

          {/* حقول كلمة المرور الجديدة */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-800 pt-6 mt-2">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-200">كلمة المرور</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-black/60 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-200">تأكيد كلمة المرور</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-black/60 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition-colors"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-lg transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] disabled:opacity-50 mt-4 flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                جاري الإرسال...
              </>
            ) : 'إرسال طلب الانضمام'}
          </button>
        </form>
      )}
    </div>
  );
}