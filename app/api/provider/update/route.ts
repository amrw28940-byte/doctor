import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'uqvfweh3',
  dataset: 'production',
  apiVersion: '2024-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get('id') as string;
    
    if (!id) {
      return NextResponse.json({ success: false, message: 'ID غير موجود' }, { status: 400 });
    }

    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const specialty = formData.get('specialty') as string; // التخصص الجديد
    const address = formData.get('address') as string;     // العنوان / البادية الجديد
    const bio = formData.get('bio') as string;
    const website = formData.get('website') as string;
    const googleMapUrl = formData.get('googleMapUrl') as string;
    
    const socialLinks = {
      whatsapp: formData.get('whatsapp') as string,
      facebook: formData.get('facebook') as string,
      instagram: formData.get('instagram') as string,
      youtube: formData.get('youtube') as string,
      snapchat: formData.get('snapchat') as string,
      tiktok: formData.get('tiktok') as string,
    };

    let updateDoc: any = {
      name,
      phone,
      specialty,
      address,
      bio,
      website,
      googleMapUrl,
      socialLinks,
    };

    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      const imageAsset = await client.assets.upload('image', imageFile as any);
      updateDoc.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      };
    }

    const updated = await client.patch(id).set(updateDoc).commit();

    return NextResponse.json({ success: true, updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}