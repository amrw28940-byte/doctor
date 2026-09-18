export default {
  name: 'clinic',
  title: 'العيادات',
  type: 'document',
  fields: [
    { name: 'name', title: 'اسم العيادة', type: 'string' },
    { name: 'slug', title: 'الرابط التعريفي', type: 'slug', options: { source: 'name' } },
    { name: 'specialization', title: 'التخصص الرئيسي', type: 'string' },
    { name: 'address', title: 'العنوان', type: 'string' },
    { name: 'image', title: 'صورة العيادة', type: 'image', options: { hotspot: true } },
    { name: 'contact', title: 'معلومات التواصل والخرائط', type: 'contactFields' },
  ],
}