"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function DashboardContent() {
  const searchParams = useSearchParams();
  const providerId = searchParams.get('id');
  const [providerData, setProviderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const endpoint = providerId 
      ? `/api/provider/details?id=${providerId}` 
      : `/api/provider/details`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProviderData(data.provider);
        } else {
          setErrorMessage(data.message || 'حدث خطأ في جلب البيانات');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage('تعذر الاتصال بالخادم');
        setLoading(false);
      });
  }, [providerId]);

  if (loading) return <div className="text-center py-20 text-white text-lg">جاري تحميل بيانات لوحة التحكم...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-32">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-red-500">لوحة تحكم مقدم الخدمة</h1>
        
        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-xl mb-6 text-center">
            {errorMessage}
          </div>
        )}

        {providerData ? (
          <div className="space-y-6">
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
              <p className="text-sm text-gray-400">الاسم الكامل:</p>
              <p className="text-xl font-semibold mt-1">{providerData.name}</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
              <p className="text-sm text-gray-400">البريد الإلكتروني:</p>
              <p className="text-xl font-semibold mt-1">{providerData.email}</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
              <p className="text-sm text-gray-400">رقم الهاتف:</p>
              <p className="text-xl font-semibold mt-1">{providerData.phone}</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
              <p className="text-sm text-gray-400">التخصص / الفئة:</p>
              <p className="text-xl font-semibold mt-1">{providerData.category}</p>
            </div>
          </div>
        ) : !errorMessage && (
          <p className="text-red-400 text-center py-10">لم يتم العثور على بيانات لهذا الحساب.</p>
        )}
      </div>
    </div>
  );
}

export default function ProviderDashboard() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-white">جاري التحميل...</div>}>
      <DashboardContent />
    </Suspense>
  );
}