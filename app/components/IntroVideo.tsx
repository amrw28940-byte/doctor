"use client";
import { useEffect, useState } from 'react';

// تحديد نوع الدالة onComplete
interface IntroVideoProps {
  onComplete: () => void;
}

export default function IntroVideo({ onComplete }: IntroVideoProps) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // التحقق هل هذه الزيارة هي الأولى في الجلسة الحالية
    // نتحقق من وجود window لتجنب أخطاء Server-Side Rendering
    if (typeof window !== 'undefined') {
      const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

      if (!hasSeenIntro) {
        setShowVideo(true);
      } else {
        onComplete(); 
      }
    }
  }, [onComplete]);

  const handleVideoEnd = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowVideo(false);
    onComplete();
  };

  if (!showVideo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <video 
        autoPlay 
        muted 
        onEnded={handleVideoEnd} 
        className="w-full h-full object-cover"
      >
        <source src="/your-logo-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}