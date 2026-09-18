export default {
  name: 'joinRequest',
  title: 'طلبات انضمام الأطباء والجهات',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'الاسم الكامل',
      type: 'string',
    },
    {
      name: 'category',
      title: 'التخصص / الفئة',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'رقم الهاتف / واتساب',
      type: 'string',
    },
    {
      name: 'email',
      title: 'البريد الإلكتروني',
      type: 'string',
    },
    {
      name: 'syndicateCard',
      title: 'رقم كارنيه النقاب / الترخيص',
      type: 'string',
    },
    {
      name: 'status',
      title: 'حالة الطلب',
      type: 'string',
      options: {
        list: [
          { title: 'قيد الانتظار', value: 'pending' },
          { title: 'تمت الموافقة', value: 'approved' },
          { title: 'مرفوض', value: 'rejected' },
        ],
      },
      initialValue: 'pending',
    },
  ],
};