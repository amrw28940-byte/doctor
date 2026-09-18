import { createClient } from "@sanity/client";

const client = createClient({
  projectId: 'uqvfweh3',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
});

export default async function DoctorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // جلب كافة الحقول المحتملة للتخصص والعنوان لضمان ظهورها بدون إشكالية
  const doctor = await client.fetch(
    `*[_id == $id][0] {
      name,
      phone,
      specialty,
      address,
      city,
      category,
      bio,
      website,
      googleMapUrl,
      socialLinks,
      "imageUrl": image.asset->url
    }`,
    { id }
  );

  if (!doctor) {
    return <div className="text-center py-32 text-white text-xl">عذراً، الطبيب غير موجود.</div>;
  }

  // استخراج التخصص الصحيح (تفضيل specialty، ثم الـ category إذا لم تكن كلمة doctor التقنية)
  const displaySpecialty = doctor.specialty || 
    (doctor.category && doctor.category !== 'doctor' && doctor.category !== 'الأطباء' ? doctor.category : 'طبيب بشري');

  // استخراج العنوان أو البادية الصحيحة
  const displayAddress = doctor.address || doctor.city;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-32">
      <div className="max-w-3xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl space-y-6">
        
        {/* الصورة كاملة وبدون أي قص */}
        <div className="w-full h-96 bg-gray-950 rounded-2xl overflow-hidden border border-gray-700 shadow-md flex items-center justify-center p-2">
          {doctor.imageUrl ? (
            <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-contain" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">لا توجد صورة شخصية</div>
          )}
        </div>

        {/* بيانات الطبيب الأساسية (الاسم، التخصص الحقيقي، العنوان/البادية، والهاتف) */}
        <div className="text-center border-b border-gray-700 pb-6 space-y-2">
          <h1 className="text-3xl font-bold">{doctor.name}</h1>
          
          {/* التخصص الواضح */}
          <p className="text-red-400 font-semibold text-lg">{displaySpecialty}</p>
          
          {/* العنوان أو البادية إن وجد */}
          {displayAddress && (
            <p className="text-gray-300 text-base">📍 العنوان / البادية: <span className="text-white font-medium">{displayAddress}</span></p>
          )}

          <p className="text-gray-400 font-mono text-sm pt-2">الهاتف: {doctor.phone}</p>
        </div>

        {/* النبذة التعريفية */}
        {doctor.bio && (
          <div className="bg-gray-900/60 p-5 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold text-red-500 mb-2">النبذة التعريفية</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{doctor.bio}</p>
          </div>
        )}

        {/* المواقع والروابط */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {doctor.website && (
            <a href={doctor.website} target="_blank" rel="noopener noreferrer" className="bg-gray-900/60 p-4 rounded-xl border border-gray-700 text-blue-400 hover:border-red-500 text-center block font-semibold transition">
              🌐 زيارة الموقع الإلكتروني
            </a>
          )}
          {doctor.googleMapUrl && (
            <a href={doctor.googleMapUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-900/60 p-4 rounded-xl border border-gray-700 text-green-400 hover:border-red-500 text-center block font-semibold transition">
              📍 موقع العيادة على خريطة جوجل
            </a>
          )}
        </div>

        {/* وسائل التواصل الاجتماعي */}
        {doctor.socialLinks && Object.values(doctor.socialLinks).some(Boolean) && (
          <div className="bg-gray-900/60 p-5 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold text-red-500 mb-4 text-center">وسائل التواصل الاجتماعي</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {doctor.socialLinks.whatsapp && <a href={doctor.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-sm font-bold transition">واتساب</a>}
              {doctor.socialLinks.facebook && <a href={doctor.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-bold transition">فيسبوك</a>}
              {doctor.socialLinks.instagram && <a href={doctor.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-xl text-sm font-bold transition">انستجرام</a>}
              {doctor.socialLinks.youtube && <a href={doctor.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-sm font-bold transition">يوتيوب</a>}
              {doctor.socialLinks.snapchat && <a href={doctor.socialLinks.snapchat} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-xl text-sm font-bold transition">سناب شات</a>}
              {doctor.socialLinks.tiktok && <a href={doctor.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 border border-gray-700 px-4 py-2 rounded-xl text-sm font-bold transition">تيك توك</a>}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}