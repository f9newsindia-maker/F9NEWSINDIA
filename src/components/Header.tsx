import React, { useState, useEffect } from 'react';
import { Search, Bell, Radio, Shield, PenTool, Globe, Info, Share2, X } from 'lucide-react';
import { F9Logo } from './F9Logo';
import { PWAInstallButton } from './PWAInstallButton';
import { NewsArticle } from '../types/news';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenLiveTv: () => void;
  onOpenReporterPortal: () => void;
  onOpenAdmin: () => void;
  onOpenAbout: () => void;
  onOpenAndroidGuide: () => void;
  unreadAlertCount: number;
  onOpenAlerts: () => void;
  currentLanguage: 'hi' | 'en';
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenLiveTv,
  onOpenReporterPortal,
  onOpenAdmin,
  onOpenAbout,
  onOpenAndroidGuide,
  unreadAlertCount,
  onOpenAlerts,
  currentLanguage,
  onToggleLanguage,
}) => {
  const [currentDateStr, setCurrentDateStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      const datePart = now.toLocaleDateString('hi-IN', options);
      const timePart = now.toLocaleTimeString('hi-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setCurrentDateStr(`${datePart} | ${timePart}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-red-900/30 text-white shadow-xl">
      {/* Top micro-bar: Date, Live status, Reporter link */}
      <div className="bg-slate-900/90 px-3 py-1 text-[11px] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-slate-300">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="truncate font-medium">{currentDateStr || 'बुधवार, 28 अक्टूबर 2026'}</span>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenLiveTv}
            className="flex items-center gap-1 text-red-400 hover:text-red-300 font-bold tracking-wide"
          >
            <Radio className="w-3 h-3 text-red-500 animate-pulse" />
            <span className="hidden xs:inline">लाइव टीवी</span>
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={onOpenReporterPortal}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium"
          >
            <PenTool className="w-3 h-3" />
            <span>पत्रकार पोर्टल</span>
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={onToggleLanguage}
            className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[10px]"
          >
            {currentLanguage === 'hi' ? 'EN' : 'हिन्दी'}
          </button>
        </div>
      </div>

      {/* Main Brand Header */}
      <div className="px-3 py-2.5 flex items-center justify-between gap-2 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <F9Logo variant="horizontal" size="md" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* In-App Android PWA Install */}
          <PWAInstallButton variant="header" onOpenAndroidGuide={onOpenAndroidGuide} />

          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            aria-label="Search News"
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-full transition-all active:scale-95"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Breaking News Alerts Bell */}
          <button
            onClick={onOpenAlerts}
            aria-label="Breaking Alerts"
            className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-full transition-all active:scale-95"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {unreadAlertCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-600 rounded-full animate-bounce">
                {unreadAlertCount}
              </span>
            )}
          </button>

          {/* Admin shortcut button */}
          <button
            onClick={onOpenAdmin}
            title="प्रशासक लॉगिन (Admin)"
            className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 rounded-full transition-all active:scale-95"
          >
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
