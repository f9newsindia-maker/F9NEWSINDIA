import React, { useEffect, useState } from 'react';
import { F9Logo } from './F9Logo';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 200);
          return 100;
        }
        return prev + 18;
      });
    }, 180);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 select-none">
      <div className="w-full flex justify-end">
        <button
          onClick={onFinish}
          className="text-xs text-slate-400 hover:text-white px-3 py-1 rounded-full bg-slate-800/60"
        >
          स्किप करें ›
        </button>
      </div>

      <div className="flex flex-col items-center text-center">
        {/* Animated Brand Logo */}
        <F9Logo variant="splash" size="xl" showTagline={true} />

        {/* Subtitle */}
        <p className="mt-4 text-xs font-semibold text-slate-400 tracking-wide max-w-xs">
          देश, प्रदेश और जनसरोकारों का सबसे विश्वसनीय हिंदी न्यूज़ ऐप
        </p>
      </div>

      {/* Bottom Loading Progress & Footer */}
      <div className="w-full max-w-xs space-y-3 pb-8">
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-amber-400 to-blue-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
          <span>ताज़ा ख़बरें लोड हो रही हैं...</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};
