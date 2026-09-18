import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kqicvwbx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
});

export const dynamic = 'force-dynamic';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return (
      <div className="text-white text-center py-20">
        <h1 className="text-3xl">عذراً، الرابط غير مكتمل.</h1>
      </div>
    );
  }

  const post = await client.fetch(
    `*[_type in ["post", "blog"] && (slug.current == $slug || _id == $slug)][0] {
      title,
      description,
      excerpt,
      content,
      "imageUrl": image.asset->url,
      publishedAt
    }`,
    { slug: slug.trim() }
  );

  if (!post) {
    return (
      <div className="text-white text-center py-20 px-6 pt-32">
        <h1 className="text-3xl font-bold">عذراً، هذا المقال غير موجود.</h1>
        <p className="mt-4 text-gray-400">الرابط المستخدم: {slug}</p>
      </div>
    );
  }

  // عرض المحتوى
  return (
    <article className="max-w-3xl mx-auto py-20 px-6 text-white pt-32">
      {post.imageUrl && (
        <div className="w-full h-96 bg-gray-950 rounded-2xl overflow-hidden mb-8 border border-gray-700">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}
      
      <h1 className="text-5xl font-bold mb-6">{post.title}</h1>
      
      {post.publishedAt && (
        <p className="text-gray-400 text-sm mb-6">
          تاريخ النشر: {new Date(post.publishedAt).toLocaleDateString('ar-EG')}
        </p>
      )}

      <div className="text-gray-300 leading-relaxed whitespace-pre-line prose prose-invert max-w-none prose-lg border-t border-gray-700 pt-6">
        {post.content || post.description || post.excerpt || 'لا توجد تفاصيل للمقال.'}
      </div>
    </article>
  );
}