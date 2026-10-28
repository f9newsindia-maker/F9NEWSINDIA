/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { newsStore } from './data/newsStore';
import { NewsArticle, NewsCategory } from './types/news';
import { Header } from './components/Header';
import { BreakingTicker } from './components/BreakingTicker';
import { CategoryBar } from './components/CategoryBar';
import { FeaturedNewsCarousel } from './components/FeaturedNewsCarousel';
import { NewsCard } from './components/NewsCard';
import { ArticleModal } from './components/ArticleModal';
import { VideoHub } from './components/VideoHub';
import { ReporterPortal } from './components/ReporterPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutUsModal } from './components/AboutUsModal';
import { BusinessAdModal } from './components/BusinessAdModal';
import { AndroidGuideModal } from './components/AndroidGuideModal';
import { SearchModal } from './components/SearchModal';
import { UserMenuModal } from './components/UserMenuModal';
import { BottomNavigation, MainNavTab } from './components/BottomNavigation';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SplashScreen } from './components/SplashScreen';
import { F9Logo } from './components/F9Logo';

// NEW FEATURE COMPONENTS
import { EPaperModal } from './components/EPaperModal';
import { DailyPollWidget } from './components/DailyPollWidget';
import { WeatherWidget } from './components/WeatherWidget';
import { RashifalModal } from './components/RashifalModal';
import { WebStoriesCarousel } from './components/WebStoriesCarousel';
import { NotificationCenterModal } from './components/NotificationCenterModal';

import {
  Flame,
  Radio,
  Bookmark,
  TrendingUp,
  Share2,
  ExternalLink,
  ChevronRight,
  Shield,
  Smartphone,
  Eye,
  MessageCircle,
  Newspaper,
  Sparkles,
  CloudSun,
} from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('सभी');
  const [activeNavTab, setActiveNavTab] = useState<MainNavTab>('home');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  // Modals State
  const [showSearch, setShowSearch] = useState(false);
  const [showReporterPortal, setShowReporterPortal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showBusinessAd, setShowBusinessAd] = useState(false);
  const [showAndroidGuide, setShowAndroidGuide] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // NEW FEATURE MODALS STATE
  const [showEPaper, setShowEPaper] = useState(false);
  const [showRashifal, setShowRashifal] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);

  // Live store state
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [breakingNews, setBreakingNews] = useState<string[]>([]);
  const [savedArticles, setSavedArticles] = useState<NewsArticle[]>([]);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const reloadData = () => {
    const list = newsStore.getArticles();
    setArticles(list);
    setBreakingNews(newsStore.getBreakingNews());

    const user = newsStore.getCurrentUser();
    const saved = list.filter((a) => user.savedArticleIds.includes(a.id));
    setSavedArticles(saved);
    setLanguage(user.language);

    const notifs = newsStore.getNotifications();
    setUnreadNotifCount(notifs.filter((n) => !n.isRead).length);
  };

  useEffect(() => {
    reloadData();
  }, [refreshTrigger]);

  const handleSelectCategory = (cat: NewsCategory) => {
    setSelectedCategory(cat);
    if (activeNavTab !== 'home') {
      setActiveNavTab('home');
    }
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleToggleBookmark = (id: string) => {
    newsStore.toggleBookmark(id);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleToggleLanguage = () => {
    const nextLang = language === 'hi' ? 'en' : 'hi';
    setLanguage(nextLang);
    newsStore.updateUserProfile({ language: nextLang });
  };

  const filteredArticles =
    selectedCategory === 'सभी'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  const videos = newsStore.getVideos();
  const ads = newsStore.getAds();
  const topAd = ads.find((a) => a.position === 'top' && a.active);
  const isAdmobActive = newsStore.isAdmobEnabled();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Hind',sans-serif]">
      {/* Splash Screen */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Offline Status Toast */}
      <OfflineIndicator />

      {/* Main Header with Weather, E-Paper, and Alerts */}
      <Header
        onOpenSearch={() => setShowSearch(true)}
        onOpenLiveTv={() => {
          setActiveNavTab('videos');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenReporterPortal={() => setShowReporterPortal(true)}
        onOpenAdmin={() => setShowAdmin(true)}
        onOpenAbout={() => setShowAbout(true)}
        onOpenAndroidGuide={() => setShowAndroidGuide(true)}
        unreadAlertCount={unreadNotifCount}
        onOpenAlerts={() => setShowNotificationCenter(true)}
        onOpenEPaper={() => setShowEPaper(true)}
        onOpenRashifal={() => setShowRashifal(true)}
        onOpenWeather={() => setShowWeather(true)}
        currentLanguage={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Breaking News Ticker */}
      <BreakingTicker
        breakingList={breakingNews}
        onSelectBreaking={(text) => {
          const matched = articles.find((a) => a.title.includes(text) || text.includes(a.category));
          if (matched) setActiveArticle(matched);
        }}
      />

      {/* Horizontal Category Nav */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Quick Action Navigation Strip (E-Paper, Live TV, Horoscope, Poll) */}
      <div className="px-3 py-1.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar text-xs">
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowEPaper(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30 font-bold transition-all active:scale-95"
          >
            <Newspaper className="w-3.5 h-3.5 text-amber-400" />
            <span>दैनिक ई-अख़बार</span>
          </button>

          <button
            onClick={() => setShowRashifal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-500/30 font-bold transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>राशिफल व पंचांग</span>
          </button>

          <button
            onClick={() => setShowWeather(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 font-bold transition-all active:scale-95"
          >
            <CloudSun className="w-3.5 h-3.5 text-cyan-400" />
            <span>मौसम व AQI</span>
          </button>
        </div>

        <button
          onClick={() => setShowReporterPortal(true)}
          className="text-blue-400 hover:text-blue-300 font-bold shrink-0 text-[11px]"
        >
          + न्यूज़ सबमिट करें
        </button>
      </div>

      {/* In-App Android Install Prompt Banner */}
      <PWAInstallButton variant="banner" onOpenAndroidGuide={() => setShowAndroidGuide(true)} />

      {/* VIEW CONTENT BASED ON NAV TAB */}
      <main className="flex-1 pb-20 max-w-7xl w-full mx-auto">
        {/* TAB 1: HOME FEED */}
        {activeNavTab === 'home' && (
          <div className="space-y-4">
            {/* Featured Stories Carousel (When 'सभी' is selected) */}
            {selectedCategory === 'सभी' && (
              <FeaturedNewsCarousel
                articles={articles}
                onSelectArticle={(art) => setActiveArticle(art)}
                onToggleBookmark={handleToggleBookmark}
                isBookmarked={(id) => newsStore.isBookmarked(id)}
              />
            )}

            {/* NEW FEATURE: Web Stories / Visual Photo Stories Shelf */}
            {selectedCategory === 'सभी' && <WebStoriesCarousel />}

            {/* Top AdMob / Sponsored Banner */}
            {isAdmobActive && topAd && (
              <div className="mx-3 my-2 p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  <span className="px-1.5 py-0.5 text-[9px] font-bold text-slate-950 bg-amber-400 rounded">
                    AdMob / प्रायोजित
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {topAd.title}
                  </span>
                </div>
                <button
                  onClick={() => setShowBusinessAd(true)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg shrink-0 flex items-center gap-1 shadow"
                >
                  <span>विज्ञापन पूछताछ</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Category Header */}
            <div className="px-3 pt-2 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                <span>
                  {selectedCategory === 'सभी' ? 'ताज़ा एवं प्रमुख समाचार' : `${selectedCategory} की बड़ी ख़बरें`}
                </span>
                <span className="text-xs text-slate-400 font-normal">
                  ({filteredArticles.length})
                </span>
              </h2>

              <button
                onClick={() => setShowReporterPortal(true)}
                className="text-xs text-blue-400 hover:underline font-bold flex items-center gap-1"
              >
                <span>+ अपनी खबर भेजें</span>
              </button>
            </div>

            {/* News Cards Grid */}
            <div className="px-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.slice(0, 4).map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onSelect={(art) => setActiveArticle(art)}
                  onToggleBookmark={handleToggleBookmark}
                  isBookmarked={newsStore.isBookmarked(article.id)}
                />
              ))}
            </div>

            {/* NEW FEATURE: Daily Interactive Poll of the Day Widget */}
            {selectedCategory === 'सभी' && (
              <DailyPollWidget onPollUpdated={() => setRefreshTrigger((p) => p + 1)} />
            )}

            {/* Remaining News Cards Grid */}
            {filteredArticles.length > 4 && (
              <div className="px-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.slice(4).map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    onSelect={(art) => setActiveArticle(art)}
                    onToggleBookmark={handleToggleBookmark}
                    isBookmarked={newsStore.isBookmarked(article.id)}
                  />
                ))}
              </div>
            )}

            {/* YouTube Channel Promo Banner */}
            <div className="mx-3 mt-6 p-4 rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-red-900 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-lg">
                  <Radio className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    F9NEWSINDIA YouTube चैनल से जुड़ें
                  </h3>
                  <p className="text-xs text-slate-300">
                    सच की आवाज़ — लाइव डिबेट, वीडियो न्यूज़ व ब्रेकिंग बुलेटिन
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="https://www.youtube.com/@f9newsindia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none text-center px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow transition-all active:scale-95"
                >
                  YouTube देखें
                </a>
                <button
                  onClick={() => setShowAndroidGuide(true)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
                >
                  ऐप गाइड
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CATEGORIES EXPLORER */}
        {activeNavTab === 'categories' && (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold text-white pb-2 border-b border-slate-800">
              समाचार श्रेणियां (News Categories)
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { name: 'देश', desc: 'राष्ट्रीय नीति, संसद, रेलवे', count: 12 },
                { name: 'महाराष्ट्र', desc: 'मुंबई, पुणे, नागपुर, विदर्भ', count: 8 },
                { name: 'उत्तर प्रदेश', desc: 'लखनऊ, अयोध्या, नोएडा, बनारस', count: 9 },
                { name: 'राजनीति', desc: 'चुनाव, गठबंधन, राजनीतिक दल', count: 7 },
                { name: 'अपराध', desc: 'क्राइम ब्रांच, पुलिस कार्रवाई', count: 6 },
                { name: 'मनोरंजन', desc: 'सिनेमा, वेब सीरीज, ओटीटी', count: 5 },
                { name: 'खेल', desc: 'क्रिकेट, हॉकी, एथलेटिक्स', count: 8 },
                { name: 'बिजनेस', desc: 'शेयर बाजार, बजट, व्यापार', count: 6 },
                { name: 'टेक्नोलॉजी', desc: 'AI, 5G, मोबाइल सुरक्षा', count: 4 },
                { name: 'स्थानीय समाचार', desc: 'ग्राम-पंचायत व जिला समाचार', count: 11 },
              ].map((c) => (
                <div
                  key={c.name}
                  onClick={() => handleSelectCategory(c.name as NewsCategory)}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-red-600/50 cursor-pointer transition-all active:scale-95"
                >
                  <h3 className="text-base font-extrabold text-white">{c.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{c.desc}</p>
                  <span className="inline-block mt-3 text-[11px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded">
                    खबरें पढ़ें ›
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: VIDEOS & LIVE TV */}
        {activeNavTab === 'videos' && (
          <VideoHub videos={videos} />
        )}

        {/* TAB 4: SAVED NEWS */}
        {activeNavTab === 'saved' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-red-500 fill-red-500" />
                सहेजी गई ख़बरें (Saved Articles)
              </h2>
              <span className="text-xs text-slate-400">
                कुल: {savedArticles.length}
              </span>
            </div>

            {savedArticles.length === 0 ? (
              <div className="p-12 text-center bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-sm font-bold text-white">
                  कोई समाचार सहेजा नहीं गया है
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  किसी भी खबर के बुकमार्क आइकन पर क्लिक करके आप उसे यहां ऑफ़लाइन पढ़ने के लिए सहेज सकते हैं।
                </p>
                <button
                  onClick={() => setActiveNavTab('home')}
                  className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-xl"
                >
                  ताज़ा ख़बरें देखें
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedArticles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    onSelect={(art) => setActiveArticle(art)}
                    onToggleBookmark={handleToggleBookmark}
                    isBookmarked={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation for Android Mobile */}
      <BottomNavigation
        activeTab={activeNavTab}
        onSelectTab={(tab) => {
          if (tab === 'menu') {
            setShowUserMenu(true);
          } else {
            setActiveNavTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        savedCount={savedArticles.length}
      />

      {/* POPUP MODALS */}

      {/* 1. Article Full Reading Modal */}
      {activeArticle && (
        <ArticleModal
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
          onSelectRelated={(art) => setActiveArticle(art)}
          allArticles={articles}
        />
      )}

      {/* 2. Search Modal */}
      {showSearch && (
        <SearchModal
          onClose={() => setShowSearch(false)}
          onSelectArticle={(art) => setActiveArticle(art)}
        />
      )}

      {/* 3. Reporter Submission Portal Modal */}
      {showReporterPortal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-md p-3 sm:p-6 flex justify-center">
          <div className="relative w-full max-w-4xl my-auto">
            <button
              onClick={() => setShowReporterPortal(false)}
              className="absolute top-2 right-2 z-20 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full"
            >
              ✕
            </button>
            <ReporterPortal
              onArticleSubmitted={() => {
                setRefreshTrigger((prev) => prev + 1);
              }}
              onClose={() => setShowReporterPortal(false)}
            />
          </div>
        </div>
      )}

      {/* 4. Administrator Console Modal */}
      {showAdmin && (
        <AdminDashboard
          onNewsUpdated={() => setRefreshTrigger((prev) => prev + 1)}
          onClose={() => setShowAdmin(false)}
        />
      )}

      {/* 5. About Us Modal */}
      {showAbout && (
        <AboutUsModal
          onClose={() => setShowAbout(false)}
          onOpenBusinessAd={() => {
            setShowAbout(false);
            setShowBusinessAd(true);
          }}
        />
      )}

      {/* 6. Business Advertising Inquiry Modal */}
      {showBusinessAd && (
        <BusinessAdModal onClose={() => setShowBusinessAd(false)} />
      )}

      {/* 7. Android App Installation & Play Store APK/AAB Guide */}
      {showAndroidGuide && (
        <AndroidGuideModal onClose={() => setShowAndroidGuide(false)} />
      )}

      {/* 8. User Menu / Settings Modal */}
      {showUserMenu && (
        <UserMenuModal
          onClose={() => setShowUserMenu(false)}
          onOpenReporterPortal={() => setShowReporterPortal(true)}
          onOpenAdmin={() => setShowAdmin(true)}
          onOpenAbout={() => setShowAbout(true)}
          onOpenBusinessAd={() => setShowBusinessAd(true)}
          onOpenAndroidGuide={() => setShowAndroidGuide(true)}
          onOpenEPaper={() => setShowEPaper(true)}
          onOpenRashifal={() => setShowRashifal(true)}
          onOpenWeather={() => setShowWeather(true)}
          currentLanguage={language}
          onToggleLanguage={handleToggleLanguage}
        />
      )}

      {/* 9. NEW: Digital E-Paper Reader Modal */}
      {showEPaper && (
        <EPaperModal onClose={() => setShowEPaper(false)} />
      )}

      {/* 10. NEW: Aaj Ka Rashifal & Panchang Modal */}
      {showRashifal && (
        <RashifalModal onClose={() => setShowRashifal(false)} />
      )}

      {/* 11. NEW: Live Weather & AQI Modal */}
      {showWeather && (
        <WeatherWidget onClose={() => setShowWeather(false)} />
      )}

      {/* 12. NEW: Push Notification Center Modal */}
      {showNotificationCenter && (
        <NotificationCenterModal
          onClose={() => setShowNotificationCenter(false)}
          onSelectArticleById={(id) => {
            const match = articles.find((a) => a.id === id);
            if (match) setActiveArticle(match);
          }}
          onNotificationsChanged={() => setRefreshTrigger((prev) => prev + 1)}
        />
      )}
    </div>
  );
}
