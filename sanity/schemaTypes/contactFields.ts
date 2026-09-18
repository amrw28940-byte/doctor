export default {
  name: 'contactFields',
  title: 'بيانات التواصل والعنوان والخرائط',
  type: 'object',
  fields: [
    { name: 'addressText', title: 'العنوان التفصيلي (نصي)', type: 'text' },
    { name: 'phone', title: 'رقم الهاتف / واتساب', type: 'string' },
    { name: 'facebook', title: 'رابط فيسبوك', type: 'url' },
    { name: 'instagram', title: 'رابط إنستجرام', type: 'url' },
    { name: 'tiktok', title: 'رابط تيك توك', type: 'url' },
    { name: 'snapchat', title: 'رابط سناب شات', type: 'url' },
    { name: 'youtube', title: 'رابط يوتيوب', type: 'url' },
    { name: 'website', title: 'الموقع الإلكتروني', type: 'url' },
    { name: 'googleMapUrl', title: 'رابط خرائط جوجل (Google Map)', type: 'url' },
  ],
}