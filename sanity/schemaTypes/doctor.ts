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
    // --- الحقول الجديدة (الخبرة، المستشفى، الزيارة، الخدمات، جدول العيادات) ---
    {
      name: 'experience',
      title: 'سنوات الخبرة (مثال: 19)',
      type: 'string',
    },
    {
      name: 'hospital',
      title: 'المستشفى أو العيادة الأساسية',
      type: 'string',
    },
    {
      name: 'homeVisit',
      title: 'يقدم زيارة منزلية',
      type: 'boolean',
    },
    {
      name: 'servicesAvailable',
      title: 'يوجد خدمات',
      type: 'boolean',
    },
    {
      name: 'clinics',
      title: 'عيادات ومواعيد الطبيب (جدول)',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'عيادة',
          fields: [
            { name: 'name', title: 'اسم / فرع العيادة', type: 'string' },
            { name: 'address', title: 'العنوان', type: 'string' },
            { name: 'days', title: 'أيام العمل', type: 'string' },
            { name: 'time', title: 'المواعيد (الساعات)', type: 'string' },
          ],
        },
      ],
    },
    // -------------------------------------------------------------------
    {
      name: 'contact',
      title: 'معلومات التواصل والخرائط',
      type: 'contactFields',
    },
  ],
}