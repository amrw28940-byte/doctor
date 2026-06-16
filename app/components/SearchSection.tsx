"use client";
import { useState } from "react";
import { Search, MapPin, ChevronDown, Stethoscope, ChevronRight, ChevronLeft, User } from "lucide-react";

const specialties = [
  "جلدية", "اسنان", "نفسي", "اطفال وحديثي الولادة", "مخ واعصاب", "عظام", 
  "نساء وتوليد", "انف واذن وحنجرة", "قلب واوعية دموية", "الأشعة التداخلية", 
  "امراض دم", "اورام", "باطنة", "تخسيس وتغذية", "جراحة اطفال", "جراحة أورام", 
  "جراحة اوعية دموية", "جراحة تجميل", "جراحة سمنة ومناظير", "جراحة عامة", 
  "جراحة عمود فقري", "جراحة قلب وصدر", "جراحة مخ واعصاب", "جهاز هضمي ومناظير", 
  "حساسية ومناعة", "حقن مجهري واطفال انابيب", "ذكورة وعقم", "روماتيزم", 
  "سكر وغدد صماء", "سمعيات", "صدر وجهاز تنفسي", "طب الأسرة", "طب المسنين", 
  "طب بيطري", "طب تقويمي", "علاج الآلام", "علاج طبيعي واصابات ملاعب", 
  "عيون", "كبد", "كلى", "مراكز أشعة", "مسالك بولية", "معامل تحاليل", 
  "ممارسة عامة", "نطق وتخاطب"
];

const egyptGovernances = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر", "البحيرة", 
  "الفيوم", "الغربية", "الإسماعيلية", "المنوفية", "المنيا", "القليوبية", 
  "الوادي الجديد", "السويس", "الشرقية", "دمياط", "بورسعيد", "كفر الشيخ", 
  "مطروح", "الأقصر", "قنا", "شمال سيناء", "سوهاج", "جنوب سيناء", "بني سويف", 
  "أسيوط", "أسوان"
];

export default function SearchSection() {
  const [showSpecialty, setShowSpecialty] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("اختار التخصص");
  
  const [showGov, setShowGov] = useState(false);
  const [selectedGov, setSelectedGov] = useState("اختار المحافظة");

  // صفحات التخصصات (12 في الصفحة)
  const [specPage, setSpecPage] = useState(0);
  const specPageSize = 12;
  const totalSpecPages = Math.ceil(specialties.length / specPageSize);
  const currentSpecialties = specialties.slice(specPage * specPageSize, (specPage + 1) * specPageSize);

  // صفحات المحافظات (12 في الصفحة لتجنب القوائم الطويلة جداً)
  const [govPage, setGovPage] = useState(0);
  const govPageSize = 12;
  const totalGovPages = Math.ceil(egyptGovernances.length / govPageSize);
  const currentGovs = egyptGovernances.slice(govPage * govPageSize, (govPage + 1) * govPageSize);

  return (
    <div className="relative -mt-24 z-20 container mx-auto px-4 max-w-7xl font-sans" dir="rtl">
      
      {/* حاوية الشريط العريض المدمج */}
      <div className="bg-white p-6 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col gap-5">
        
        {/* العنوان المدمج داخل الشريط */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <span className="w-2.5 h-7 bg-red-600 rounded-full inline-block animate-pulse"></span>
          <div>
            <h2 className="text-2xl font-black text-black tracking-wide">ابحث عن طبيبك</h2>
            <p className="text-xs text-gray-500 mt-0.5">احجز موعدك بسهولة من بين آلاف الأطباء والمستشفيات</p>
          </div>
        </div>

        {/* حقول البحث */}
        <div className="flex flex-wrap xl:flex-nowrap gap-3 items-center w-full">
          
          {/* 1. قائمة التخصصات */}
          <div className="relative flex-1 min-w-[240px]">
            <button 
              onClick={() => { setShowSpecialty(!showSpecialty); setShowGov(false); }}
              className={`w-full p-4 border rounded-xl text-right flex justify-between items-center transition-all bg-white hover:bg-gray-50 group ${showSpecialty ? 'border-red-600 ring-4 ring-red-50' : 'border-gray-200'}`}
            >
              <div className="flex items-center gap-3 text-black">
                <Stethoscope className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                <span className="font-semibold text-sm">{selectedSpecialty}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showSpecialty ? 'rotate-180 text-red-600' : ''}`} />
            </button>
            
            {showSpecialty && (
              <div className="absolute top-full mt-2 w-full md:w-[500px] bg-white border border-gray-100 shadow-2xl rounded-2xl p-4 z-50 right-0 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {currentSpecialties.map((s, i) => (
                    <button 
                      key={i} 
                      onClick={() => { setSelectedSpecialty(s); setShowSpecialty(false); }} 
                      className="text-right text-black hover:text-red-600 bg-gray-50 hover:bg-red-50/50 p-3 rounded-xl transition-all border border-gray-200 hover:border-red-500 font-medium shadow-sm hover:shadow"
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* تنقل التخصصات */}
                <div className="flex justify-between mt-4 items-center border-t border-gray-100 pt-3">
                  <button 
                    disabled={specPage === 0} 
                    onClick={() => setSpecPage(p => p - 1)} 
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-20 text-black"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    صفحة {specPage + 1} من {totalSpecPages}
                  </span>
                  <button 
                    disabled={specPage === totalSpecPages - 1} 
                    onClick={() => setSpecPage(p => p + 1)} 
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-20 text-black"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. قائمة المحافظات المتطورة */}
          <div className="relative flex-1 min-w-[240px]">
            <button 
              onClick={() => { setShowGov(!showGov); setShowSpecialty(false); }}
              className={`w-full p-4 border rounded-xl text-right flex justify-between items-center transition-all bg-white hover:bg-gray-50 group ${showGov ? 'border-red-600 ring-4 ring-red-50' : 'border-gray-200'}`}
            >
              <div className="flex items-center gap-3 text-black">
                <MapPin className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                <span className="font-semibold text-sm">{selectedGov}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showGov ? 'rotate-180 text-red-600' : ''}`} />
            </button>
            
            {showGov && (
              <div className="absolute top-full mt-2 w-full md:w-[500px] bg-white border border-gray-100 shadow-2xl rounded-2xl p-4 z-50 right-0 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {currentGovs.map((g, i) => (
                    <button 
                      key={i} 
                      onClick={() => { setSelectedGov(g); setShowGov(false); }} 
                      className="text-right text-black hover:text-red-600 bg-gray-50 hover:bg-red-50/50 p-3 rounded-xl transition-all border border-gray-200 hover:border-red-500 font-medium shadow-sm hover:shadow"
                    >
                      {g}
                    </button>
                  ))}
                </div>

                {/* تنقل المحافظات */}
                <div className="flex justify-between mt-4 items-center border-t border-gray-100 pt-3">
                  <button 
                    disabled={govPage === 0} 
                    onClick={() => setGovPage(p => p - 1)} 
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-20 text-black"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    صفحة {govPage + 1} من {totalGovPages}
                  </span>
                  <button 
                    disabled={govPage === totalGovPages - 1} 
                    onClick={() => setGovPage(p => p + 1)} 
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-20 text-black"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. حقل المنطقة */}
          <div className="relative flex-1 min-w-[200px] group">
            <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors pointer-events-none" />
            <input 
              type="text"
              placeholder="اختار المنطقة" 
              className="w-full p-4 pr-12 border border-gray-200 rounded-xl text-sm font-semibold text-black placeholder-gray-400 focus:border-red-600 focus:ring-4 focus:ring-red-50 outline-none transition-all" 
            />
          </div>

          {/* 4. حقل اسم الطبيب */}
          <div className="relative flex-1 min-w-[220px] group">
            <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors pointer-events-none" />
            <input 
              type="text"
              placeholder="اسم الدكتور أو العيادة..." 
              className="w-full p-4 pr-12 border border-gray-200 rounded-xl text-sm font-semibold text-black placeholder-gray-400 focus:border-red-600 focus:ring-4 focus:ring-red-50 outline-none transition-all" 
            />
          </div>

          {/* 5. زر البحث */}
          <button className="bg-black text-white hover:bg-red-600 px-10 py-4 rounded-xl font-bold transition-all flex-shrink-0 shadow-md hover:shadow-xl flex items-center justify-center gap-2 w-full xl:w-auto group border border-transparent hover:border-red-600">
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm">ابحث الآن</span>
          </button>

        </div>
      </div>
    </div>
  );
}