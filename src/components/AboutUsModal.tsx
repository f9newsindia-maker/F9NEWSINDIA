import React from 'react';
import { F9Logo } from './F9Logo';
import { Globe, Youtube, Mail, MapPin, ShieldCheck, Heart, ExternalLink, X, Phone } from 'lucide-react';

interface AboutUsModalProps {
  onClose: () => void;
  onOpenBusinessAd: () => void;
}

export const AboutUsModal: React.FC<AboutUsModalProps> = ({
  onClose,
  onOpenBusinessAd,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-8 my-auto text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center pb-6 border-b border-slate-800">
          <F9Logo variant="splash" size="lg" className="mx-auto" />
          <p className="text-sm font-semibold text-slate-300 max-w-lg mx-auto mt-2">
            F9NEWSINDIA भारत का उभरता हुआ डिजिटल न्यूज़ नेटवर्क है, जो निष्पक्ष, सटीक और जनसरोकारों से जुड़ी ख़बरों को निर्भीकता से जनता तक पहुँचाने के लिए प्रतिबद्ध है।
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <ShieldCheck className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-white">सत्यनिष्ठा एवं निष्पक्षता</h4>
            <p className="text-[11px] text-slate-400 mt-1">बिना किसी दबाव के तथ्यात्मक पत्रकारिता।</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <Heart className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-white">सच की आवाज़</h4>
            <p className="text-[11px] text-slate-400 mt-1">आम जनता और वंचितों के मुद्दों को प्रमुखता।</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <Globe className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-white">डिजिटल मीडिया लीडरशिप</h4>
            <p className="text-[11px] text-slate-400 mt-1">हाई-स्पीड मोबाइल न्यूज़ और वीडियो कवरेज।</p>
          </div>
        </div>

        {/* Official Links & Contact */}
        <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider text-slate-300">
            आधिकारिक संपर्क एवं डिजिटल चैनल
          </h4>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-medium">आधिकारिक ब्लॉग व वेबसाइट</span>
            </div>
            <a
              href="https://f9newsindia.blogspot.com/2026/10/about-us-f9newsindia.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-400 hover:underline font-bold"
            >
              <span>ब्लॉग देखें</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <Youtube className="w-4 h-4 text-red-500" />
              <span className="text-white font-medium">आधिकारिक YouTube चैनल</span>
            </div>
            <a
              href="https://www.youtube.com/@f9newsindia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-red-400 hover:underline font-bold"
            >
              <span>@f9newsindia</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400" />
              <span className="text-white font-medium">ईमेल संपर्क</span>
            </div>
            <a
              href="mailto:f9newsindia@gmail.com"
              className="text-amber-300 font-mono hover:underline"
            >
              f9newsindia@gmail.com
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onOpenBusinessAd}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95"
          >
            विज्ञापन एवं डिजिटल मार्केटिंग सेवाएँ
          </button>
          <span className="text-[11px] text-slate-500">
            © 2026 F9NEWSINDIA Media Network. All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
};
