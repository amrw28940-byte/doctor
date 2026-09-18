export default {
  name: 'nursing',
  title: 'التمريض المنزلي',
  type: 'document',
  fields: [
    { name: 'name', title: 'اسم الممرض / جهة التمريض', type: 'string' },
    { name: 'slug', title: 'الرابط التعريفي (Slug)', type: 'slug', options: { source: 'name' } },
    { name: 'experience', title: 'سنوات الخبرة / الخدمات', type: 'text' },
    { name: 'image', title: 'الصورة أو الشعار', type: 'image', options: { hotspot: true } },
    { name: 'contact', title: 'معلومات التواصل', type: 'contactFields' },
  ],
}