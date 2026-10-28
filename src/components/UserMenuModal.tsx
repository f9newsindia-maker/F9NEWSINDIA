import React, { useState } from 'react';
import {
  User,
  Shield,
  PenTool,
  Download,
  Bell,
  Globe,
  DollarSign,
  Info,
  ExternalLink,
  ChevronRight,
  LogOut,
  Sparkles,
  Smartphone,
  X,
  FileText,
} from 'lucide-react';
import { F9Logo } from './F9Logo';
import { newsStore } from '../data/newsStore';

interface UserMenuModalProps {
  onClose: () => void;
  onOpenReporterPortal: () => void;
  onOpenAdmin: () => void;
  onOpenAbout: () => void;
  onOpenBusinessAd: () => void;
  onOpenAndroidGuide: () => void;
  currentLanguage: 'hi' | 'en';
  onToggleLanguage: () => void;
}

export const UserMenuModal: React.FC<UserMenuModalProps> = ({
  onClose,
  onOpenReporterPortal,
  onOpenAdmin,
  onOpenAbout,
  onOpenBusinessAd,
  onOpenAndroidGuide,
  currentLanguage,
  onToggleLanguage,
}) => {
  const user = newsStore.getCurrentUser();
  const [breakingAlerts, setBreakingAlerts] = useState(user.breakingAlertsEnabled);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userName, setUserName] = useState(user.name);
  const [district, setDistrict] = useState(user.district || 'नई दिल्ली');

  const handleSaveProfile = () => {
    newsStore.updateUserProfile({
      name: userName,
      district,
      breakingAlertsEnabled: breakingAlerts,
    });
    setIsEditingProfile(false);
  };

  const handleToggleAlerts = () => {
    const nextVal = !breakingAlerts;
    setBreakingAlerts(nextVal);
    newsStore.updateUserProfile({ breakingAlertsEnabled: nextVal });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 my-0 sm:my-auto text-left max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Profile Card */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 via-red-700 to-blue-900 flex items-center justify-center text-white font-black text-xl shadow-lg border border-red-400/30">
            F9
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white truncate">{userName}</h3>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold text-amber-300 bg-amber-950/80 rounded border border-amber-500/30">
              जिला: {district}
            </span>
          </div>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="text-xs text-red-400 hover:underline font-semibold"
          >
            {isEditingProfile ? 'रद्द करें' : 'संपादित करें'}
          </button>
        </div>

        {/* Edit profile form if active */}
        {isEditingProfile && (
          <div className="my-3 p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">नाम</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-bold mb-1">जिला / शहर</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              className="w-full py-1.5 bg-red-600 text-white font-bold rounded-lg mt-2"
            >
              सहेजें
            </button>
          </div>
        )}

        {/* Action Menu List */}
        <div className="my-4 space-y-2 text-xs">
          {/* Reporter Portal */}
          <button
            onClick={() => {
              onClose();
              onOpenReporterPortal();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 transition-all text-white font-semibold"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
                <PenTool className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block font-bold">संवाददाता व पत्रकार पोर्टल</span>
                <span className="text-[10px] text-slate-400">खबरें सबमिट करें व स्थिति देखें</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          {/* Admin Dashboard */}
          <button
            onClick={() => {
              onClose();
              onOpenAdmin();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 transition-all text-white font-semibold"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600/20 text-red-400 rounded-lg">
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block font-bold">प्रशासक / संपादक कंट्रोल पैनल</span>
                <span className="text-[10px] text-slate-400">समाचार अनुमोदन, टिकर और विज्ञापन</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          {/* Android APK & Install Guide */}
          <button
            onClick={() => {
              onClose();
              onOpenAndroidGuide();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 transition-all text-white font-semibold"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600/20 text-emerald-400 rounded-lg">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block font-bold">Android ऐप इंस्टॉलेशन एवं APK गाइड</span>
                <span className="text-[10px] text-slate-400">मोबाइल पर ऐप चलाने की सरल विधि</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          {/* Business Advertising */}
          <button
            onClick={() => {
              onClose();
              onOpenBusinessAd();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 transition-all text-white font-semibold"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-600/20 text-amber-400 rounded-lg">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block font-bold">विज्ञापन एवं डिजिटल मार्केटिंग</span>
                <span className="text-[10px] text-slate-400">व्यापार प्रचार एवं रेट कार्ड</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          {/* About Us */}
          <button
            onClick={() => {
              onClose();
              onOpenAbout();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 transition-all text-white font-semibold"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600/20 text-purple-400 rounded-lg">
                <Info className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block font-bold">हमारे बारे में (About F9NEWSINDIA)</span>
                <span className="text-[10px] text-slate-400">सच की आवाज़ • आधिकारिक ब्लॉग व संपर्क</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Settings Toggle: Notifications & Language */}
        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs mb-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-300 font-bold">
              <Bell className="w-4 h-4 text-red-500" />
              ब्रेकिंग न्यूज़ पुश अलर्ट्स
            </span>
            <button
              onClick={handleToggleAlerts}
              className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                breakingAlerts ? 'bg-red-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  breakingAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="flex items-center gap-2 text-slate-300 font-bold">
              <Globe className="w-4 h-4 text-blue-500" />
              भाषा (Language)
            </span>
            <button
              onClick={onToggleLanguage}
              className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded-lg font-bold text-[11px]"
            >
              {currentLanguage === 'hi' ? 'हिन्दी (Hindi)' : 'English'}
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center pt-2 text-[10px] text-slate-500">
          <p>F9NEWSINDIA Android App v2.4.0</p>
          <p>सच की आवाज़ — डिजिटल पत्रकारिता का नया युग</p>
        </div>
      </div>
    </div>
  );
};
