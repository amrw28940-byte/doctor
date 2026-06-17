"use client";
import { useEffect, useState } from 'react';

export default function IntroVideo({ onComplete }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // التحقق هل هذه الزيارة هي الأولى في الجلسة الحالية
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

    if (!hasSeenIntro) {
      setShowVideo(true);
    } else {
      onComplete(); // إذا شاهد الفيديو سابقاً، انتقل للموقع فوراً
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
      <video autoPlay muted onEnded={handleVideoEnd} className="w-full h-full object-cover">
        <source src="/your-logo-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}