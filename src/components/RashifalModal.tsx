import React, { useState } from 'react';
import { newsStore } from '../data/newsStore';
import { RashifalSign, PanchangInfo } from '../types/news';
import { Sparkles, Sun, Moon, Clock, Star, Share2, X, Compass } from 'lucide-react';

interface RashifalModalProps {
  onClose: () => void;
}

export const RashifalModal: React.FC<RashifalModalProps> = ({ onClose }) => {
  const panchang: PanchangInfo = newsStore.getPanchang();
  const rashifalList: RashifalSign[] = newsStore.getRashifalList();
  const [selectedSign, setSelectedSign] = useState<RashifalSign>(rashifalList[0]);
  const [activeTab, setActiveTab] = useState<'rashifal' | 'panchang'>('rashifal');

  const handleShare = () => {
    const text = `F9NEWSINDIA दैनिक राशिफल (${selectedSign.name}):\n${selectedSign.forecast}\nशुभ रंग: ${selectedSign.luckyColor} | शुभ अंक: ${selectedSign.luckyNumber}\n\nविस्तृत पंचांग पढ़ें: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({ title: 'दैनिक राशिफल', text, url: window.location.href }).catch(() => {});
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-7 my-auto text-left max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-600 to-red-600 text-white flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white">
              दैनिक राशिफल एवं आज का पंचांग
            </h3>
            <p className="text-xs text-slate-400">
              {panchang.date} • वैदिक ज्योतिष एवं ग्रह गोचर आधारित
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 my-4 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('rashifal')}
            className={`flex-1 py-1.5 font-bold rounded-lg transition-all text-center ${
              activeTab === 'rashifal'
                ? 'bg-red-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            दैनिक राशिफल (12 राशियां)
          </button>
          <button
            onClick={() => setActiveTab('panchang')}
            className={`flex-1 py-1.5 font-bold rounded-lg transition-all text-center ${
              activeTab === 'panchang'
                ? 'bg-red-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            आज का पंचांग व शुभ मुहूर्त
          </button>
        </div>

        {/* TAB 1: RASHIFAL */}
        {activeTab === 'rashifal' && (
          <div className="space-y-4">
            {/* 12 Rashi Horizontal Scroll Buttons */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {rashifalList.map((sign) => (
                <button
                  key={sign.id}
                  onClick={() => setSelectedSign(sign)}
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center text-xs transition-all ${
                    selectedSign.id === sign.id
                      ? 'bg-red-600 border-red-500 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-lg leading-none mb-1">{sign.symbol}</span>
                  <span className="font-bold text-[10px] truncate max-w-full">
                    {sign.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Rashi Detail Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-950 to-amber-950/20 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-slate-900 rounded-xl border border-slate-800">
                    {selectedSign.symbol}
                  </span>
                  <div>
                    <h4 className="text-base font-extrabold text-white">
                      {selectedSign.name}
                    </h4>
                    <div className="flex items-center gap-1 text-amber-400 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < selectedSign.rating ? 'fill-amber-400' : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  className="p-2 text-slate-300 hover:text-emerald-400 bg-slate-900 hover:bg-slate-850 rounded-xl border border-slate-800"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium pt-2 border-t border-slate-800/80">
                {selectedSign.forecast}
              </p>

              {/* Lucky Elements */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="p-2.5 bg-slate-900 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-semibold">शुभ रंग:</span>
                  <span className="font-bold text-white text-xs">{selectedSign.luckyColor}</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-semibold">शुभ अंक:</span>
                  <span className="font-bold text-amber-400 text-xs">{selectedSign.luckyNumber}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PANCHANG */}
        {activeTab === 'panchang' && (
          <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-400" />
              दैनिक पंचांग विवरण ({panchang.date})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">तिथि:</span>
                <span className="font-bold text-white">{panchang.tithi}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">नक्षत्र:</span>
                <span className="font-bold text-white">{panchang.nakshatra}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">सूर्योदय:</span>
                  <span className="font-bold text-amber-300">{panchang.sunrise}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">सूर्यास्त:</span>
                  <span className="font-bold text-orange-400">{panchang.sunset}</span>
                </div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-red-400 block font-semibold">राहुकाल (अशुभ समय):</span>
                <span className="font-bold text-red-300">{panchang.rahukaal}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-200">
              <span className="text-[10px] text-emerald-400 block font-bold">शुभ समय (अभिजीत मुहूर्त):</span>
              <span className="font-bold">{panchang.shubhMuhurat}</span>
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
};
