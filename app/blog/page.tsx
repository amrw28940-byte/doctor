import Link from 'next/link';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kqicvwbx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
});

export const revalidate = 0;

export default async function BlogPage() {
  const posts = await client.fetch(`
    *[_type in ["post", "blog"]] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      description
    }
  `);

  return (
    <div className="max-w-6xl mx-auto py-20 px-6 pt-32">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">مدونتنا الطبية</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts?.map((post: any) => (
          <div key={post._id} className="bg-white/10 p-6 rounded-xl border border-white/10 flex flex-col">
            <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
            <p className="text-gray-400 mb-4">{post.excerpt || post.description}</p>
            <Link href={`/blog/${post.slug || post._id}`} className="text-red-500 font-bold mt-auto">اقرأ المزيد →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}