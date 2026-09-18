export default {
  name: 'blog',
  title: 'المدونة',
  type: 'document',
  fields: [
    { name: 'title', title: 'عنوان المقال', type: 'string' },
    { name: 'slug', title: 'الرابط التعريفي', type: 'slug', options: { source: 'title' } },
    { name: 'publishedAt', title: 'تاريخ النشر', type: 'datetime' },
    { name: 'image', title: 'الصورة البارزة', type: 'image', options: { hotspot: true } },
    { name: 'body', title: 'محتوى المقال', type: 'text' },
  ],
}