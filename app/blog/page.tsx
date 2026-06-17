import Link from 'next/link';
import { createClient } from '@/lib/supabase';

export default async function BlogPage() {
  const supabase = createClient();
  const { data: posts } = await supabase.from('posts').select('*');

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">مدونتنا الطبية</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts?.map((post: any) => (
          <div key={post.id} className="bg-white/10 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
            <p className="text-gray-400 mb-4">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-red-500 font-bold">اقرأ المزيد →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}