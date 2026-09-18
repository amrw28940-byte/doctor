export default {
  name: 'pharmacy',
  title: 'الصيدليات',
  type: 'document',
  fields: [
    { name: 'name', title: 'اسم الصيدلية', type: 'string' },
    { name: 'slug', title: 'الرابط التعريفي (Slug)', type: 'slug', options: { source: 'name' } },
    { name: 'address', title: 'العنوان', type: 'string' },
    { name: 'image', title: 'صورة الصيدلية', type: 'image', options: { hotspot: true } },
    { name: 'contact', title: 'معلومات التواصل', type: 'contactFields' },
  ],
}