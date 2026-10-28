import React, { useState } from 'react';
import { Smartphone, Download, CheckCircle, Package, Shield, ExternalLink, HelpCircle, X, Copy, Check } from 'lucide-react';
import { F9Logo } from './F9Logo';

interface AndroidGuideModalProps {
  onClose: () => void;
}

export const AndroidGuideModal: React.FC<AndroidGuideModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  const appUrl = window.location.origin;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-8 my-auto text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-red-600 to-red-800 text-white flex items-center justify-center shadow-lg">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white">
              Android मोबाइल पर F9NEWSINDIA ऐप कैसे इंस्टॉल करें?
            </h3>
            <p className="text-xs text-slate-400">
              आसान हिंदी मार्गदर्शिका — APK / AAB एवं होम स्क्रीन इंस्टॉलेशन
            </p>
          </div>
        </div>

        {/* Step Tabs */}
        <div className="grid grid-cols-4 gap-1.5 my-4 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveStep(1)}
            className={`py-1.5 px-2 font-bold rounded-lg transition-all text-center ${
              activeStep === 1 ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. मोबाइल इंस्टाल
          </button>
          <button
            onClick={() => setActiveStep(2)}
            className={`py-1.5 px-2 font-bold rounded-lg transition-all text-center ${
              activeStep === 2 ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. APK / AAB बनाना
          </button>
          <button
            onClick={() => setActiveStep(3)}
            className={`py-1.5 px-2 font-bold rounded-lg transition-all text-center ${
              activeStep === 3 ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Play Store तैयारी
          </button>
          <button
            onClick={() => setActiveStep(4)}
            className={`py-1.5 px-2 font-bold rounded-lg transition-all text-center ${
              activeStep === 4 ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            4. गोपनीयता नीति
          </button>
        </div>

        {/* STEP 1: MOBILE INSTALL (DIRECT PWA) */}
        {activeStep === 1 && (
          <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">1</span>
              बिना प्ले स्टोर के सीधे Android फ़ोन पर ऐप इंस्टॉल करें (PWA)
            </h4>

            <p className="text-slate-300 leading-relaxed">
              F9NEWSINDIA एक अत्याधुनिक प्रोग्रेसिव वेब ऐप (PWA) है। यह आपके फ़ोन में बिना ज्यादा स्टोरेज लिए सामान्य ऐप की तरह काम करता है:
            </p>

            <ol className="list-decimal pl-5 space-y-2 text-slate-300 leading-normal">
              <li>
                अपने Android फ़ोन में <strong>Google Chrome</strong> ब्राउज़र में इस वेबसाइट को खोलें।
              </li>
              <li>
                स्क्रीन के ऊपर दाईं ओर दिए गए <strong>तीन बिंदुओं (Three dots ⋮)</strong> पर टैप करें।
              </li>
              <li>
                मेनू में <strong>“ऐप इंस्टॉल करें” (Install App)</strong> या <strong>“होम स्क्रीन पर जोड़ें” (Add to Home screen)</strong> विकल्प चुनें।
              </li>
              <li>
                <strong>“इंस्टॉल” (Install)</strong> पर क्लिक करें। 5 सेकंड में F9NEWSINDIA का आधिकारिक लोगो आपके फ़ोन की होम स्क्रीन पर आ जाएगा।
              </li>
              <li>
                अब आप इसे सीधे एक क्लिक में खोल सकते हैं — यह फुल स्क्रीन में बिना ब्राउज़र बार के चलेगा!
              </li>
            </ol>

            <div className="pt-2 flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 truncate mr-2 font-mono">
                {appUrl}
              </span>
              <button
                onClick={handleCopyUrl}
                className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] rounded-lg shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'कॉपी हुआ!' : 'लिंक कॉपी करें'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: BUILD APK / AAB VIA PWABUILDER */}
        {activeStep === 2 && (
          <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-400" />
              Google Play Store हेतु APK और AAB फाइल कैसे बनाएं?
            </h4>

            <p className="text-slate-300 leading-relaxed">
              F9NEWSINDIA में सभी PWA मानक (Manifest, Service Worker, 192px/512px Icons) पहले से पूरी तरह कॉन्फ़िगर हैं। इसे मुफ़्त में APK/AAB में बदलने का सबसे आसान तरीका:
            </p>

            <div className="space-y-2 text-slate-300">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="font-bold text-white block mb-1">तरीका 1: PWABuilder (Microsoft द्वारा मुफ़्त टूल)</span>
                <p>1. कंप्यूटर या फ़ोन में <strong>PWABuilder.com</strong> पर जाएं।</p>
                <p>2. अपने ऐप का URL दर्ज करें और <strong>Start</strong> पर क्लिक करें।</p>
                <p>3. <strong>Package for Android</strong> बटन दबाएं।</p>
                <p>4. पैकेज नाम में <code className="text-amber-400">com.f9newsindia.app</code> डालें।</p>
                <p>5. <strong>Generate Package</strong> पर क्लिक करें — आपको Google Play Store के लिए तैयार <strong>.AAB (Android App Bundle)</strong> और सीधे इंस्टॉल के लिए <strong>.APK</strong> फ़ाइल तुरंत डाउनलोड हो जाएगी!</p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="font-bold text-white block mb-1">तरीका 2: Google Bubblewrap CLI (डेवलपर विकल्प)</span>
                <p className="font-mono text-[11px] text-emerald-400 bg-slate-950 p-2 rounded">
                  npm install -g @bubblewrap/cli<br />
                  bubblewrap init --manifest={appUrl}/manifest.webmanifest<br />
                  bubblewrap build
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PLAY STORE PREPARATION */}
        {activeStep === 3 && (
          <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Google Play Console पब्लिशिंग चेकलिस्ट
            </h4>

            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>ऐप का नाम:</strong> F9NEWSINDIA - सच की आवाज़ (Hindi News)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>आधिकारिक लोगो व आइकन:</strong> 512x512 PNG लोगो (icon.svg से उपलब्ध)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>श्रेणी:</strong> News & Magazines (समाचार एवं पत्रिकाएँ)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>कंटेंट रेटिंग:</strong> Everyone (सार्वजनिक समाचार)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>डेवलपर ईमेल:</strong> f9newsindia@gmail.com</span>
              </li>
            </ul>
          </div>
        )}

        {/* STEP 4: PRIVACY POLICY MANDATE */}
        {activeStep === 4 && (
          <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-bold text-white">
              गोपनीयता नीति (Privacy Policy for Play Store & AdMob)
            </h4>

            <div className="max-h-48 overflow-y-auto space-y-2 text-slate-300 pr-2">
              <p>
                <strong>F9NEWSINDIA</strong> उपयोगकर्ताओं की गोपनीयता का पूर्ण सम्मान करता है। हम केवल समाचार पढ़ने के अनुभव को बेहतर बनाने के लिए स्थानीय वरीयताएँ (Saved Articles, Bookmarks, Push Notification Preferences) उपयोगकर्ता के डिवाइस पर ही सुरक्षित रखते हैं।
              </p>
              <p>
                <strong>Google AdMob एवं कुकीज:</strong> ऐप विज्ञापन प्रदर्शन के लिए Google AdMob का उपयोग कर सकता है, जो Google की मानक गोपनीयता नीति का पालन करता है।
              </p>
              <p>
                <strong>संवाददाता डेटा:</strong> अधिकृत संवाददाताओं द्वारा सबमिट की गई सामग्री जनहित में पत्रकारिता मानकों के तहत प्रकाशित की जाती है।
              </p>
              <p>
                <strong>संपर्क:</strong> किसी भी प्रश्न के लिए <span className="text-amber-400">f9newsindia@gmail.com</span> पर संपर्क करें।
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow"
          >
            समझ गया, धन्यवाद
          </button>
        </div>
      </div>
    </div>
  );
};
