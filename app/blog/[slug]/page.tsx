import { createClient } from "@/lib/supabase";

// نستخدم هذه الخاصية لضمان أن الصفحة تُبنى عند كل طلب
export const dynamic = 'force-dynamic';

// ملاحظة: في النسخ الحديثة من Next.js، يجب أن تكون params من نوع Promise
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. انتظار حل الـ Promise الخاص بـ params
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return (
      <div className="text-white text-center py-20">
        <h1 className="text-3xl">عذراً، الرابط غير مكتمل.</h1>
      </div>
    );
  }

  const supabase = createClient();

  // 2. جلب البيانات
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug.trim())
    .maybeSingle();

  // 3. التحقق من وجود خطأ أو عدم وجود مقال
  if (error || !post) {
    return (
      <div className="text-white text-center py-20 px-6">
        <h1 className="text-3xl font-bold">عذراً، هذا المقال غير موجود.</h1>
        <p className="mt-4 text-gray-400">الرابط المستخدم: {slug}</p>
        {error && <p className="text-red-500 mt-2 text-sm">{error.message}</p>}
      </div>
    );
  }

  // 4. عرض المحتوى
  return (
    <article className="max-w-3xl mx-auto py-20 px-6 text-white">
      <h1 className="text-5xl font-bold mb-6">{post.title}</h1>
      <div
        className="prose prose-invert max-w-none prose-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}