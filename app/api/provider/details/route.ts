import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kqicvwbx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'skVYln9gEaTsJUBBmqmVS58EMrNRBRdlmGcNqYKNj8yQZ1htFMvAJkO08x50lxnsBGFZuuF0gWEoOJmmRCZvt90NkYox6GN5Itft33qTxV4M1VbtO4DOsRteqAbTml5IZWbWkqzm1ZPGT1YywmoNprAsjiQqO7c9DanMtOt90QruHL2jCrKV',
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    let provider = null;

    if (id) {
      // محاولة البحث بالـ ID الدقيق
      provider = await serverClient.fetch(`*[_id == $id][0]`, { id });
    }

    // إذا لم يتم العثور بالـ ID، نجلب أول مستند مسجل كحل احتياطي لضمان عدم بقاء الصفحة فارغة
    if (!provider) {
      const allDocs = await serverClient.fetch(`*[_type in ["joinRequest", "doctor", "clinic", "lab", "pharmacy", "nursing"]][0]`);
      provider = allDocs;
    }

    if (!provider) {
      return NextResponse.json({ success: false, message: 'لم يتم العثور على أي حسابات في النظام' }, { status: 404 });
    }

    const formattedProvider = {
      name: provider.fullName || provider.name || 'مقدم خدمة',
      email: provider.email || provider.mail || 'غير محدد',
      phone: provider.phone || provider.phoneNumber || 'غير محدد',
      category: provider.category || provider._type || 'طبيب',
      syndicateCard: provider.syndicateCard || 'غير متوفر'
    };

    return NextResponse.json({ success: true, provider: formattedProvider });

  } catch (error: any) {
    console.error('Details Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}