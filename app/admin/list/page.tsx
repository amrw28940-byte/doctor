"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminListPage() {
  const [items, setItems] = useState([]);
  const [table, setTable] = useState("doctors"); // الجدول الافتراضي
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [table]);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from(table).select("*");
    if (!error) setItems(data || []);
    setLoading(false);
  };

  return (
    <div className="p-10 max-w-5xl mx-auto min-h-screen text-white">
      <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-white">إدارة المحتوى</h1>
        <button 
          // التعديل هنا: أضفنا table في الرابط
          onClick={() => router.push(`/admin?table=${table}`)} 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition"
        >
          + إضافة جديد
        </button>
      </div>

      {/* التبويبات */}
      <div className="flex gap-2 mb-8">
        {["posts", "doctors", "pages"].map((t) => (
          <button 
            key={t}
            className={`p-3 px-6 rounded-lg font-medium transition ${table === t ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`} 
            onClick={() => setTable(t)}
          >
            {t === 'posts' ? 'المدونة' : t === 'doctors' ? 'الدكاترة' : 'الصفحات'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-400">جاري التحميل...</div>
      ) : (
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
          <table className="w-full text-right border-collapse">
            <thead className="bg-gray-800 text-gray-300 uppercase text-sm">
              <tr>
                <th className="p-4 border-b border-gray-700">الاسم / العنوان</th>
                <th className="p-4 border-b border-gray-700">التفاصيل (التخصص/الرابط)</th>
                <th className="p-4 border-b border-gray-700 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {items.length > 0 ? items.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-800/50 transition">
                  <td className="p-4 font-bold text-white text-lg">
                    {item.name || item.title}
                  </td>
                  <td className="p-4 text-blue-400">
                    {item.specialty || item.slug || "---"}
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      // التعديل هنا: أضفنا table بجانب الـ id في الرابط
                      onClick={() => router.push(`/admin?id=${item.id}&table=${table}`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-bold transition"
                    >
                      تعديل
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="p-10 text-center text-gray-500">لا توجد بيانات حالياً</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}