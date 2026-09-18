import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'uqvfweh3',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
});

export const dynamic = 'force-dynamic';

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-xl pt-32">
        عذراً، الرابط غير مكتمل.
      </div>
    );
  }

  // جلب بيانات الطبيب وحقول وسائل التواصل والواتساب بمرونة تامة
  const doctor = await client.fetch(
    `*[_type in ["doctor", "joinRequest"] && (_id == $id || slug.current == $id)][0] {
      name,
      specialization,
      specialty,
      bio,
      description,
      about,
      overview,
      contact,
      facebook,
      instagram,
      tiktok,
      snapchat,
      youtube,
      whatsapp,
      phone,
      "imageUrl": image.asset->url
    }`,
    { id: id.trim() }
  );

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-xl pt-32">
        عذراً، بيانات الطبيب غير موجودة.
      </div>
    );
  }

  // استخراج النبذة التعريفية والعنوان
  const doctorBio = doctor.bio || doctor.description || doctor.about || doctor.overview;
  const doctorAddress = doctor.contact?.addressText || doctor.address || doctor.city;

  // جلب وسائل التواصل والواتساب (سواء من contact أو المستوى الرئيسي)
  const facebook = doctor.contact?.facebook || doctor.facebook;
  const instagram = doctor.contact?.instagram || doctor.instagram;
  const tiktok = doctor.contact?.tiktok || doctor.tiktok;
  const snapchat = doctor.contact?.snapchat || doctor.snapchat;
  const youtube = doctor.contact?.youtube || doctor.youtube;
  const whatsappNumber = doctor.contact?.whatsapp || doctor.whatsapp || doctor.contact?.phone || doctor.phone;

  const mapLink = doctor.contact?.googleMapUrl || doctor.mapUrl || doctor.googleMap;
  const mapQuery = encodeURIComponent(`${doctor.name || 'طبيب'} ${doctorAddress || ''}`);
  const embedMapUrl = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 text-white pt-32">
      <div className="bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-2xl space-y-8">
        
        {/* صورة الطبيب الكاملة والاسم والتخصص */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-gray-700 pb-8">
          {doctor.imageUrl ? (
            <div className="w-full max-w-[220px] rounded-2xl overflow-hidden border-2 border-red-500 shadow-lg bg-gray-950 p-2 shrink-0 flex items-center justify-center">
              <img src={doctor.imageUrl} alt={doctor.name || 'طبيب'} className="w-full h-auto object-cover rounded-xl" />
            </div>
          ) : (
            <div className="w-48 h-48 rounded-2xl bg-gray-950 border border-gray-700 flex items-center justify-center text-gray-500 text-sm shrink-0">
              لا توجد صورة
            </div>
          )}
          
          <div className="text-center md:text-right space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">{doctor.name || 'طبيب'}</h1>
            <p className="text-red-400 text-xl font-semibold">
              {doctor.specialization || doctor.specialty || 'تخصص عام'}
            </p>
            {doctorAddress && (
              <p className="text-gray-300 text-base flex items-center justify-center md:justify-start gap-2">
                <span>📍</span> {doctorAddress}
              </p>
            )}
          </div>
        </div>

        {/* النبذة التعريفية في مستطيل كبير وواضح في البداية */}
        <div className="space-y-4 border-b border-gray-700 pb-8">
          <h3 className="text-2xl font-bold text-red-500">النبذة التعريفية</h3>
          <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-line bg-gray-900/80 p-6 rounded-2xl border border-gray-700 shadow-inner min-h-[180px]">
            {doctorBio ? doctorBio : 'لا توجد نبذة تعريفية مسجلة لهذا الطبيب حالياً.'}
          </div>
        </div>

        {/* وسائل التواصل الاجتماعي والواتساب بتصميم وألوان متناسقة مع الموقع */}
        {(facebook || instagram || tiktok || snapchat || youtube || whatsappNumber) && (
          <div className="border-b border-gray-700 pb-8 space-y-4">
            <h3 className="text-xl font-bold text-red-500">وسائل التواصل الاجتماعي</h3>
            <div className="flex flex-wrap gap-4">
              {whatsappNumber && (
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="bg-gray-900/80 hover:bg-gray-900 border border-gray-700 hover:border-red-500 px-5 py-2.5 rounded-xl text-white font-medium transition flex items-center gap-2 shadow-md">
                  <span className="text-green-400">💬</span> واتساب
                </a>
              )}
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="bg-gray-900/80 hover:bg-gray-900 border border-gray-700 hover:border-red-500 px-5 py-2.5 rounded-xl text-white font-medium transition flex items-center gap-2 shadow-md">
                  <span className="text-blue-400">📘</span> فيسبوك
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="bg-gray-900/80 hover:bg-gray-900 border border-gray-700 hover:border-red-500 px-5 py-2.5 rounded-xl text-white font-medium transition flex items-center gap-2 shadow-md">
                  <span className="text-pink-400">📷</span> إنستغرام
                </a>
              )}
              {tiktok && (
                <a href={tiktok} target="_blank" rel="noopener noreferrer" className="bg-gray-900/80 hover:bg-gray-900 border border-gray-700 hover:border-red-500 px-5 py-2.5 rounded-xl text-white font-medium transition flex items-center gap-2 shadow-md">
                  <span>🎵</span> تيك توك
                </a>
              )}
              {snapchat && (
                <a href={snapchat} target="_blank" rel="noopener noreferrer" className="bg-gray-900/80 hover:bg-gray-900 border border-gray-700 hover:border-red-500 px-5 py-2.5 rounded-xl text-white font-medium transition flex items-center gap-2 shadow-md">
                  <span className="text-yellow-400">👻</span> سناب شات
                </a>
              )}
              {youtube && (
                <a href={youtube} target="_blank" rel="noopener noreferrer" className="bg-gray-900/80 hover:bg-gray-900 border border-gray-700 hover:border-red-500 px-5 py-2.5 rounded-xl text-white font-medium transition flex items-center gap-2 shadow-md">
                  <span className="text-red-500">📺</span> يوتيوب
                </a>
              )}
            </div>
          </div>
        )}

        {/* خريطة جوجل وزر الملاحة (GPS) */}
        {(mapLink || doctorAddress) && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-red-500">موقع العيادة على الخريطة (GPS)</h3>
            <div className="rounded-2xl overflow-hidden border border-gray-700 bg-gray-900 p-4 space-y-4">
              
              <div className="w-full h-80 rounded-xl overflow-hidden border border-gray-700 bg-black">
                <iframe
                  src={embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              <a 
                href={mapLink || `https://www.google.com/maps/search/?api=1&query=${mapQuery}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold text-base transition shadow-xl w-full"
              >
                <span>🚗</span> بدء التوجيه والوصول للعنوان (فتح في تطبيق الخرائط)
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}