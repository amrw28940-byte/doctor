"use client";

const services = [
  { 
    title: "رعاية على مدار الساعة", 
    desc: "تحدث إلى مقدم رعاية صحية في أي وقت، ليلاً أو نهاراً.", 
    link: "أعرف أكثر",
    image: "/healthcare.webp" 
  },
  { 
    title: "الرعاية الصحية الأولية", 
    desc: "حافظ على صحتك من خلال مقدمي الرعاية الصحية المعتمدين.", 
    link: "أعرف أكثر",
    image: "/primary healthcare.webp" 
  },
  { 
    title: "الصحة النفسية", 
    desc: "دعم متخصص للتغلب على القلق والتوتر والاكتئاب.", 
    link: "مساعدة أفضل",
    image: "/mental health.webp" 
  },
  { 
    title: "إدارة الحالة", 
    desc: "تدريب شخصي لإدارة السكري، الوزن، وضغط الدم.", 
    link: "السكري - وزن - ضغط",
    image: "/chronic disease management.webp" 
  },
  { 
    title: "الرعاية المتخصصة", 
    desc: "استشر أخصائيين لمراجعة حالتك والتشخيصات الرئيسية.", 
    link: "رأي طبي",
    image: "/specialized healthcare.webp" 
  },
  { 
    title: "عادات صحية يومية", 
    desc: "دعم أهدافك في التغذية، اللياقة البدنية، والنوم.", 
    link: "احصل على الرعاية",
    image: "/daily healthy habits.webp" 
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">خدماتنا الطبية المتكاملة</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col items-center text-center">
              {/* إضافة الصورة */}
              <div className="w-32 h-32 mb-6 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <h3 className="text-xl font-bold text-red-600 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{service.desc}</p>
              
              <button className="text-sm font-bold text-gray-800 border-b-2 border-red-500 pb-1 hover:text-red-600 transition-colors">
                {service.link}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}