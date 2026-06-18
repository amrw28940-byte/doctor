import { createClient } from "@/lib/supabase";

export default async function DoctorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createClient();

  // جلب بيانات الطبيب بناءً على الـ ID
  const { data: doctor } = await supabase
    .from("doctors")
    .select("*")
    .eq("id", id)
    .single();

  if (!doctor) return <div className="text-center py-20 text-white">الطبيب غير موجود.</div>;

  return (
    <div className="max-w-3xl mx-auto py-20 px-6 text-white">
      <h1 className="text-5xl font-bold mb-4">{doctor.name}</h1>
      <p className="text-2xl text-blue-400 mb-6">{doctor.specialty}</p>
      <div className="bg-gray-900 p-8 rounded-2xl">
        <h3 className="text-xl font-bold mb-4">عن الطبيب</h3>
        <p className="text-gray-300">{doctor.description || "لا توجد تفاصيل إضافية."}</p>
      </div>
    </div>
  );
}