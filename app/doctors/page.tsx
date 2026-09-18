import Link from "next/link";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: 'uqvfweh3',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
});

export const revalidate = 0;

export default async function DoctorsPage() {
  // تم إضافة specialization للـ Query لجلب التخصص المكتوب في سانتي بدقة
  const doctors = await client.fetch(`
    *[_type in ["doctor", "joinRequest"] && (category == "doctor" || category == "الأطباء" || defined(name))] {
      _id,
      name,
      phone,
      specialty,
      specialization,
      address,
      city,
      category,
      "imageUrl": image.asset->url
    }
  `);

  return (
    <div className="max-w-6xl mx-auto py-20 px-6 text-white pt-32">
      <h1 className="text-4xl font-bold mb-12 text-center text-red-500">نخبة أطبائنا</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {doctors && doctors.length > 0 ? (
          doctors.map((doctor: any) => (
            <Link key={doctor._id} href={`/doctors/${doctor._id}`}>
              <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700 hover:border-red-500 transition cursor-pointer shadow-xl overflow-hidden flex flex-col">
                
                {/* صورة الطبيب كاملة وبدون قص */}
                <div className="w-full h-52 bg-gray-950 rounded-xl overflow-hidden mb-4 border border-gray-700 flex items-center justify-center p-2">
                  {doctor.imageUrl ? (
                    <img src={doctor.imageUrl} alt={doctor.name || 'طبيب'} className="w-full h-full object-contain" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">لا توجد صورة</div>
                  )}
                </div>

                {/* اسم الدكتور بوضوح */}
                <h2 className="text-2xl font-bold mb-1">{doctor.name || 'طبيب'}</h2>
                
                {/* التخصص تحت اسم الدكتور مباشرة */}
                <p className="text-red-400 font-semibold text-base mb-1">
                  {doctor.specialization || doctor.specialty || 'تخصص عام'}
                </p>

                {/* العنوان أو المدينة إن وجد */}
                {(doctor.address || doctor.city) && (
                  <p className="text-gray-400 text-sm mb-4">📍 {doctor.address || doctor.city}</p>
                )}
                
                <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-xl font-bold transition mt-auto">عرض التفاصيل</button>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-3 py-10">لا يوجد أطباء مسجلين حالياً.</p>
        )}
      </div>
    </div>
  );
}