import SearchSection from "./components/SearchSection";
import ServicesSection from "./components/ServicesSection";

export default function Home() {
  return (
    <main className="relative w-full">
      
      {/* 1. سيكشن البانر (الفيديو) */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          src="/banar.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            رعايتكم الطبية، <br /> بأحدث معايير التكنولوجيا.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
            نحن هنا لنقدم لك تجربة علاجية متكاملة تدمج بين خبرة الأطباء ودقة التكنولوجيا الحديثة.
          </p>
          <button className="bg-white hover:bg-gray-200 text-red-700 px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg">
            ابدأ رحلتك العلاجية الآن
          </button>
        </div>
      </section>

      {/* 2. سيكشن البحث */}
      <SearchSection />

      {/* 3. سيكشن الخدمات (الجديد) */}
      <ServicesSection />

    </main>
  );
}