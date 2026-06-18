"use client";
export const dynamic = 'force-dynamic';
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase"; // تم التعديل هنا
import { Editor } from '@tinymce/tinymce-react';
import { useSearchParams, useRouter } from "next/navigation"; 

export default function AdminPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const table = searchParams.get("table") || "doctors";
  
  // تهيئة supabase كمتغير داخل المكون
  const supabase = createClient(); 

  const [formData, setFormData] = useState({
    title: "", name: "", specialty: "", slug: "", content: "",
    metaTitle: "", metaDescription: "", keywords: "",
    status: "draft", publishDate: ""
  });

  const autoSave = async (data: any) => {
    if (id) {
       await supabase.from(table).update(data).eq("id", id);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (id) autoSave(formData);
    }, 3000);
    return () => clearTimeout(handler);
  }, [formData, id]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const { data } = await supabase.from(table).select("*").eq("id", id).single();
        if (data) setFormData(data);
      };
      fetchData();
    }
  }, [id, table]);

  const save = async (statusValue: string) => {
    const dataToSave = { ...formData, status: statusValue };
    const { error } = id 
      ? await supabase.from(table).update(dataToSave).eq("id", id)
      : await supabase.from(table).insert([dataToSave]);
    
    if (error) { alert("خطأ: " + error.message); } 
    else { alert("تم الحفظ بنجاح!"); router.push("/admin/list"); }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 bg-white text-black">
      <h1 className="text-2xl font-bold border-b pb-4">إدارة {table}</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <input value={formData.title} placeholder="العنوان" className="p-3 border rounded" onChange={(e) => setFormData({...formData, title: e.target.value})} />
        <input value={formData.slug} placeholder="الرابط (Slug)" className="p-3 border rounded" onChange={(e) => setFormData({...formData, slug: e.target.value})} />
        <input type="datetime-local" value={formData.publishDate} className="p-3 border rounded" onChange={(e) => setFormData({...formData, publishDate: e.target.value})} />
        {table === 'doctors' && (
          <>
            <input value={formData.name} placeholder="الاسم" className="p-3 border rounded" onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <input value={formData.specialty} placeholder="التخصص" className="p-3 border rounded" onChange={(e) => setFormData({...formData, specialty: e.target.value})} />
          </>
        )}
      </div>

      <div className="space-y-4 border-t pt-4">
        <h2 className="font-bold">إعدادات SEO:</h2>
        <input value={formData.metaTitle} placeholder="Meta Title" className="w-full p-3 border rounded" onChange={(e) => setFormData({...formData, metaTitle: e.target.value})} />
        <input value={formData.metaDescription} placeholder="Meta Description" className="w-full p-3 border rounded" onChange={(e) => setFormData({...formData, metaDescription: e.target.value})} />
        <input value={formData.keywords} placeholder="الكلمات المفتاحية" className="w-full p-3 border rounded" onChange={(e) => setFormData({...formData, keywords: e.target.value})} />
      </div>

      <Editor
        apiKey='s4pcjzqnekovuogu93bs10otfvy5new6cyv7zp6n6gnaem3o'
        value={formData.content}
        onEditorChange={(newContent) => setFormData({...formData, content: newContent})}
        init={{ 
          height: 400,
          menubar: true,
          plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
          toolbar: 'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | forecolor backcolor removeformat | help'
        }}
      />

      <div className="flex gap-4 pt-4">
        <button onClick={() => save("draft")} className="flex-1 bg-gray-500 text-white p-4 rounded-lg font-bold">حفظ مسودة</button>
        <button onClick={() => save("published")} className="flex-1 bg-green-600 text-white p-4 rounded-lg font-bold">نشر الآن</button>
        <button onClick={() => save("scheduled")} className="flex-1 bg-yellow-600 text-white p-4 rounded-lg font-bold">جدولة</button>
        <button onClick={() => window.open(`/preview/${table}/${id || 'new'}`, '_blank')} className="flex-1 bg-blue-500 text-white p-4 rounded-lg font-bold">معاينة</button>
      </div>
    </div>
  );
}