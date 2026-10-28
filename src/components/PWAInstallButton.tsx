import React, { useState } from 'react';
import { Download, Smartphone, CheckCircle, X, ExternalLink } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'header' | 'banner' | 'compact' | 'footer';
  onOpenAndroidGuide?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'header',
  onOpenAndroidGuide,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstallSuccess(true);
        setTimeout(() => setInstallSuccess(false), 4000);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else if (onOpenAndroidGuide) {
      onOpenAndroidGuide();
    }
  };

  if (isInstalled && !installSuccess) {
    if (variant === 'banner') return null;
    return (
      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-full">
        <CheckCircle className="w-3.5 h-3.5" /> ऐप इंस्टॉल है
      </span>
    );
  }

  if (variant === 'banner') {
    return (
      <div className="relative mx-3 my-2 p-3 rounded-xl bg-gradient-to-r from-red-950 via-slate-900 to-blue-950 border border-red-500/30 shadow-lg flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-md">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              F9NEWSINDIA Android App
              <span className="text-[10px] bg-red-600 px-1.5 py-0.2 rounded text-white font-medium">मुफ़्त</span>
            </h4>
            <p className="text-xs text-slate-300">
              तेज़ ख़बरों और लाइव अपडेट्स के लिए सीधे फ़ोन पर इंस्टॉल करें
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-lg shadow-md transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            इंस्टॉल करें
          </button>
        </div>

        {/* iOS Modal */}
        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-sm p-5 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white">iPhone / iPad पर इंस्टॉल करें</h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-3 text-xs text-slate-300 space-y-2">
                1. Safari ब्राउज़र में नीचे दिए गए <strong>Share (शेयर)</strong> बटन पर टैप करें।<br />
                2. नीचे स्क्रॉल करके <strong>Add to Home Screen (होम स्क्रीन पर जोड़ें)</strong> चुनें।<br />
                3. ऊपर दाईं ओर <strong>Add</strong> पर क्लिक करें।
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full mt-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg"
              >
                समझ गया
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Header / Compact Variant
  return (
    <>
      <button
        onClick={handleInstallClick}
        aria-label="Install F9NEWSINDIA Android App"
        className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-lg border border-red-400/40 shadow-sm active:scale-95 transition-all"
      >
        <Smartphone className="w-3.5 h-3.5 text-amber-300" />
        <span className="hidden sm:inline">ऐप डाउनलोड</span>
        <span className="sm:hidden">ऐप</span>
      </button>

      {/* iOS Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm p-5 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Apple iOS पर इंस्टॉल करें</h3>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-3 text-xs text-slate-300 space-y-2">
              <p>1. Safari ब्राउज़र के नीचे <strong>Share</strong> आइकन पर टैप करें।</p>
              <p>2. मेनू में <strong>Add to Home Screen</strong> चुनें।</p>
              <p>3. अब F9NEWSINDIA सीधे आपके फ़ोन पर ऐप की तरह खुलेगा!</p>
            </div>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full mt-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg"
            >
              ठीक है
            </button>
          </div>
        </div>
      )}
    </>
  );
};
