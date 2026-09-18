"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function DashboardContent() {
  const searchParams = useSearchParams();
  const providerId = searchParams.get('id');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    specialty: '',
    address: '',
    bio: '',
    website: '',
    googleMapUrl: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    youtube: '',
    snapchat: '',
    tiktok: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (providerId) {
      fetch(`/api/provider/details?id=${providerId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.provider) {
            setFormData({
              name: data.provider.name || '',
              phone: data.provider.phone || '',
              specialty: data.provider.specialty || '',
              address: data.provider.address || '',
              bio: data.provider.bio || '',
              website: data.provider.website || '',
              googleMapUrl: data.provider.googleMapUrl || '',
              whatsapp: data.provider.socialLinks?.whatsapp || '',
              facebook: data.provider.socialLinks?.facebook || '',
              instagram: data.provider.socialLinks?.instagram || '',
              youtube: data.provider.socialLinks?.youtube || '',
              snapchat: data.provider.socialLinks?.snapchat || '',
              tiktok: data.provider.socialLinks?.tiktok || '',
            });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [providerId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const dataToSend = new FormData();
      dataToSend.append('id', providerId || '');
      Object.entries(formData).forEach(([key, value]) => {
        dataToSend.append(key, value);
      });

      if (imageFile) {
        dataToSend.append('image', imageFile);
      }

      const res = await fetch('/api/provider/update', {
        method: 'POST',
        body: dataToSend,
      });
      const data = await res.json();
      
      if (data.success) {
        setMessage('تم حفظ الملف والتخصص والعنوان بنجاح!');
      } else {
        setMessage('فشل التحديث: ' + data.message);
      }
    } catch (err) {
      setMessage('حدث خطأ أثناء الاتصال بالخادم');
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center py-20 text-white">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-32">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-red-500">إدارة الملف المهني الشامل</h1>
        
        {message && (
          <div className="bg-blue-500/20 border border-blue-500 text-blue-300 p-4 rounded-xl mb-6 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">الاسم الكامل:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">رقم الهاتف:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white" />
            </div>
          </div>

          {/* خانات التخصص والعنوان */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">التخصص (مثال: طب عام، أطفال، أسنان...):</label>
              <input type="text" name="specialty" placeholder="أدخل التخصص" value={formData.specialty} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">العنوان أو البادية (مثال: الرياض، بادية كذا...):</label>
              <input type="text" name="address" placeholder="أدخل العنوان أو البادية" value={formData.address} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">نبذة تعريفية / وصف:</label>
            <textarea name="bio" rows={4} value={formData.bio} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">الموقع الإلكتروني:</label>
              <input type="text" name="website" placeholder="https://..." value={formData.website} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">رابط موقع العيادة (Google Maps):</label>
              <input type="text" name="googleMapUrl" placeholder="رابط الخريطة" value={formData.googleMapUrl} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white" />
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">وسائل التواصل الاجتماعي</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" name="whatsapp" placeholder="رابط واتساب" value={formData.whatsapp} onChange={handleChange} className="bg-gray-900 border border-gray-700 rounded-xl p-3 text-white" />
              <input type="text" name="facebook" placeholder="رابط فيسبوك" value={formData.facebook} onChange={handleChange} className="bg-gray-900 border border-gray-700 rounded-xl p-3 text-white" />
              <input type="text" name="instagram" placeholder="رابط انستجرام" value={formData.instagram} onChange={handleChange} className="bg-gray-900 border border-gray-700 rounded-xl p-3 text-white" />
              <input type="text" name="youtube" placeholder="رابط يوتيوب" value={formData.youtube} onChange={handleChange} className="bg-gray-900 border border-gray-700 rounded-xl p-3 text-white" />
              <input type="text" name="snapchat" placeholder="رابط سناب شات" value={formData.snapchat} onChange={handleChange} className="bg-gray-900 border border-gray-700 rounded-xl p-3 text-white" />
              <input type="text" name="tiktok" placeholder="رابط تيك توك" value={formData.tiktok} onChange={handleChange} className="bg-gray-900 border border-gray-700 rounded-xl p-3 text-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">الصورة الشخصية:</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => e.target.files && setImageFile(e.target.files[0])} 
              className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2 text-gray-400 file:bg-red-600 file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2" 
            />
          </div>

          <button type="submit" disabled={saving} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition">
            {saving ? 'جاري الحفظ...' : 'حفظ كافة التغييرات'}
          </button>
        </form>
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