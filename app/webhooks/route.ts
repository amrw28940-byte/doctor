import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const serverClient = createClient({
  projectId: 'uqvfweh3',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: 'skVYln9gEaTsJUBBmqmVS58EMrNRBRdlmGcNqYKNj8yQZ1htFMvAJkO08x50lxnsBGFZuuF0gWEoOJmmRCZvt90NkYox6GN5Itft33qTxV4M1VbtO4DOsRteqAbTml5IZWbWkqzm1ZPGT1YywmoNprAsjiQqO7c9DanMtOt90QruHL2jCrKV',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // بيانات المستند القادم من سانتي
    const { _type, status, fullName, category, phone, email, syndicateCard } = body;

    // التأكد أن التعديل يخص طلبات الانضمام وحالته أصبحت "موافق عليها"
    if (_type === 'joinRequest' && status === 'approved') {
      
      // تحديد الجدول المستهدف بناءً على القسم
      let targetType = '';
      if (category === 'doctor') targetType = 'doctor';
      else if (category === 'clinic') targetType = 'clinic';
      else if (category === 'lab') targetType = 'lab';
      else if (category === 'pharmacy') targetType = 'pharmacy';
      else if (category === 'nursing') targetType = 'nursing';

      if (targetType) {
        // إنشاء مستند جديد في الجدول الخاص بمزود الخدمة
        await serverClient.create({
          _type: targetType,
          name: fullName,
          phone: phone,
          email: email,
          licenseNumber: syndicateCard, // أو الحقل المناسب حسب جدولك
        });
      }
    }

    return NextResponse.json({ success: true, message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}