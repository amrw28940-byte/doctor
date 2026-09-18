export default {
  name: 'lab',
  title: 'المعامل والتحاليل',
  type: 'document',
  fields: [
    { name: 'name', title: 'اسم المعمل', type: 'string' },
    { 
      name: 'slug', 
      title: 'الرابط التعريفي', 
      type: 'slug', 
      options: { source: 'name', maxLength: 96 } 
    },
    { 
      name: 'services', 
      title: 'الخدمات المتوفرة', 
      type: 'array', 
      of: [{ type: 'string' }] 
    },
    { name: 'address', title: 'العنوان', type: 'string' },
    { name: 'image', title: 'صورة المعمل', type: 'image', options: { hotspot: true } },
    { name: 'contact', title: 'معلومات التواصل والخرائط', type: 'contactFields' },
  ],
}