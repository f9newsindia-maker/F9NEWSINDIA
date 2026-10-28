import React, { useState } from 'react';
import { Zap, Volume2, Pause, Play, ChevronRight } from 'lucide-react';
import { speechReader } from '../utils/speech';

interface BreakingTickerProps {
  breakingList: string[];
  onSelectBreaking?: (text: string) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({
  breakingList,
  onSelectBreaking,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!breakingList || breakingList.length === 0) return null;

  const handleSpeakTicker = () => {
    if (isPlayingAudio) {
      speechReader.stop();
      setIsPlayingAudio(false);
    } else {
      const allText = breakingList.slice(0, 3).join('। अगली बड़ी खबर: ');
      speechReader.speak(allText, 'F9 ब्रेकिंग न्यूज़ बुलेटिन');
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 25000);
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white flex items-center shadow-lg border-b border-red-500/40 select-none overflow-hidden">
      {/* High-visibility TV Badge */}
      <div className="relative z-20 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-950 to-red-800 shrink-0 border-r-2 border-amber-400 font-black shadow-md">
        <Zap className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
        <span className="text-xs tracking-wider uppercase font-extrabold text-amber-200">
          ब्रेकिंग न्यूज़
        </span>
      </div>

      {/* Marquee ticker stream */}
      <div
        className="relative z-10 flex-1 overflow-hidden py-1 px-2 flex items-center cursor-pointer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`whitespace-nowrap flex items-center gap-8 ${
            isPaused ? '' : 'animate-ticker'
          }`}
          style={{ willChange: 'transform' }}
        >
          {breakingList.concat(breakingList).map((item, idx) => (
            <span
              key={idx}
              onClick={() => onSelectBreaking && onSelectBreaking(item)}
              className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-white hover:text-amber-200 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Controls: Listen & Pause */}
      <div className="relative z-20 hidden xs:flex items-center gap-1 px-2 shrink-0 bg-red-900/60 border-l border-red-500/30">
        <button
          onClick={handleSpeakTicker}
          title="ब्रेकिंग न्यूज़ सुनें"
          className={`p-1 rounded-md text-xs transition-colors ${
            isPlayingAudio ? 'bg-amber-400 text-slate-900' : 'text-slate-200 hover:text-white'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setIsPaused(!isPaused)}
          title={isPaused ? 'चलाएं' : 'रोकें'}
          className="p-1 rounded-md text-xs text-slate-200 hover:text-white"
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
