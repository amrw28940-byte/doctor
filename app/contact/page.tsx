import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">اتصل بنا</h1>
      
      {/* النموذج */}
      <form className="bg-white/10 p-8 rounded-2xl backdrop-blur-md shadow-xl border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input type="text" placeholder="الاسم الكامل" className="w-full p-4 rounded-lg bg-black/50 text-white border border-gray-600 outline-none focus:border-red-500" />
          <input type="email" placeholder="البريد الإلكتروني" className="w-full p-4 rounded-lg bg-black/50 text-white border border-gray-600 outline-none focus:border-red-500" />
        </div>
        <textarea placeholder="شرح الخدمة المطلوبة" rows={5} className="w-full p-4 mb-6 rounded-lg bg-black/50 text-white border border-gray-600 outline-none focus:border-red-500"></textarea>
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition">إرسال الطلب</button>
      </form>

      {/* الأيقونات */}
      <div className="mt-12 flex justify-center gap-8">
        <a href="رابط_الواتساب" className="text-3xl text-green-500 hover:text-white transition"><FaWhatsapp /></a>
        <a href="رابط_الفيس بوك" className="text-3xl text-blue-600 hover:text-white transition"><FaFacebook /></a>
        <a href="رابط_اكس" className="text-3xl text-white hover:text-red-500 transition"><FaTwitter /></a>
        <a href="رابط_الانستجرام" className="text-3xl text-pink-500 hover:text-white transition"><FaInstagram /></a>
        <a href="رابط_اليوتيوب" className="text-3xl text-red-600 hover:text-white transition"><FaYoutube /></a>
      </div>
    </div>
  );
}