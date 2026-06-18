import Link from "next/link"; // أضف هذا الاستيراد
import { createClient } from "@/lib/supabase";

export default async function DoctorsPage() {
  const supabase = createClient();
  const { data: doctors } = await supabase.from("doctors").select("*");

  return (
    <div className="max-w-6xl mx-auto py-20 px-6 text-white">
      <h1 className="text-4xl font-bold mb-12 text-center">نخبة أطبائنا</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {doctors?.map((doctor: any) => (
          // نغلف البطاقة بـ Link يوجهنا لصفحة الطبيب بناءً على الـ id الخاص به
          <Link key={doctor.id} href={`/doctors/${doctor.id}`}>
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition cursor-pointer">
              <h2 className="text-2xl font-bold mb-2">{doctor.name}</h2>
              <p className="text-blue-400 font-medium mb-4">{doctor.specialty}</p>
              <button className="w-full bg-blue-600 py-2 rounded-lg font-bold">عرض التفاصيل</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}