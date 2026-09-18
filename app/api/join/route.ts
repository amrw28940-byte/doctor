import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kqicvwbx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'skVYln9gEaTsJUBBmqmVS58EMrNRBRdlmGcNqYKNj8yQZ1htFMvAJkO08x50lxnsBGFZuuF0gWEoOJmmRCZvt90NkYox6GN5Itft33qTxV4M1VbtO4DOsRteqAbTml5IZWbWkqzm1ZPGT1YywmoNprAsjiQqO7c9DanMtOt90QruHL2jCrKV',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newRequest = await serverClient.create({
      _type: 'joinRequest',
      fullName: body.fullName,
      category: body.category,
      phone: body.phone,
      email: body.email,
      syndicateCard: body.syndicateCard,
      status: 'pending',
    });

    return NextResponse.json({ success: true, data: newRequest }, { status: 200 });
  } catch (error: any) {
    console.error("Sanity Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}