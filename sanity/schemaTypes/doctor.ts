export default {
  name: 'doctor',
  title: 'الأطباء',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'اسم الطبيب',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'الرابط التعريفي (Slug)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'specialization',
      title: 'التخصص',
      type: 'string',
    },
    {
      name: 'image',
      title: 'الصورة الشخصية',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'نبذة تعريفية',
      type: 'text',
    },
    {
      name: 'contact',
      title: 'معلومات التواصل والخرائط',
      type: 'contactFields',
    },
  ],
}