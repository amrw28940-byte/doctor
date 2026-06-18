"use client";
import { useState, useEffect, Suspense } from "react";
import { createClient } from "@/lib/supabase";
import { Editor } from '@tinymce/tinymce-react';
import { useSearchParams, useRouter } from "next/navigation";

// دالة العرض الرئيسية
function AdminContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const table = searchParams.get("table") || "doctors";
  
  const supabase = createClient(); 

  const [formData, setFormData] = useState<any>({
    title: "", name: "", specialty: "", slug: "", content: "",
    metaTitle: "", metaDescription: "", keywords: "",
    status: "draft", publishDate: ""
  });

  // جلب البيانات عند تغيير الـ ID
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const { data } = await supabase.from(table).select("*").eq("id", id).single();
        if (data) setFormData(data);
      };
      fetchData();
    }
  }, [id, table, supabase]);

  // دالة الحفظ
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

      <Editor
        apiKey='s4pcjzqnekovuogu93bs10otfvy5new6cyv7zp6n6gnaem3o'
        value={formData.content}
        onEditorChange={(newContent) => setFormData({...formData, content: newContent})}
        init={{ height: 400, menubar: true, plugins: 'link image code', toolbar: 'undo redo | bold italic | alignleft aligncenter | link image' }}
      />

      <div className="flex gap-4 pt-4">
        <button onClick={() => save("draft")} className="flex-1 bg-gray-500 text-white p-4 rounded-lg font-bold">حفظ مسودة</button>
        <button onClick={() => save("published")} className="flex-1 bg-green-600 text-white p-4 rounded-lg font-bold">نشر الآن</button>
      </div>
    </div>
  );
}

// التعديل الأهم: تغليف المكون بـ Suspense لحل خطأ الـ Build
export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">جاري تحميل لوحة التحكم...</div>}>
      <AdminContent />
    </Suspense>
  );
}