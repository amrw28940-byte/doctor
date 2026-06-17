"use client"; // نحوله لمكون عميل لتسهيل التعامل مع البيانات

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase";

export default function PostPage({ params }: { params: { slug: string } }) {
  const supabase = useMemo(() => createClient(), []);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .ilike('slug', params.slug)
        .maybeSingle();

      if (data) setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [params.slug, supabase]);

  if (loading) return <div className="text-white text-center py-20">جاري التحميل...</div>;
  if (!post) return <div className="text-white text-center py-20">عذراً، هذا المقال غير موجود.</div>;

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