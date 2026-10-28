import React, { useState } from 'react';
import { newsStore } from '../data/newsStore';
import { NewsArticle } from '../types/news';
import {
  Shield,
  CheckCircle,
  XCircle,
  Trash2,
  Plus,
  Bell,
  BarChart3,
  DollarSign,
  Radio,
  FileCheck,
  Zap,
  Users,
  Eye,
  Settings,
  Lock,
  Unlock,
  AlertCircle,
  Check,
} from 'lucide-react';
import { F9Logo } from './F9Logo';

interface AdminDashboardProps {
  onNewsUpdated: () => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNewsUpdated,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'all-news' | 'ticker' | 'ads' | 'stats'>('pending');
  const [notificationMsg, setNotificationMsg] = useState('');
  const [notificationBroadcasted, setNotificationBroadcasted] = useState(false);

  // New Ticker input
  const [newTickerText, setNewTickerText] = useState('');

  // Store data
  const articles = newsStore.getAllArticlesForAdmin();
  const pendingArticles = articles.filter((a) => a.status === 'pending');
  const breakingList = newsStore.getBreakingNews();
  const analytics = newsStore.getAnalytics();
  const admobActive = newsStore.isAdmobEnabled();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master PIN 9999 or any valid admin pin
    if (pinInput === '9999' || pinInput === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('गलत पिन! डेमो पिन: 9999 दर्ज करें।');
    }
  };

  const handleApprove = (id: string) => {
    newsStore.updateArticleStatus(id, 'published');
    onNewsUpdated();
  };

  const handleReject = (id: string) => {
    const reason = prompt('अस्वीकृति का कारण दर्ज करें:') || 'संपादकीय मानकों के अनुरूप नहीं';
    newsStore.updateArticleStatus(id, 'rejected', reason);
    onNewsUpdated();
  };

  const handleDelete = (id: string) => {
    if (confirm('क्या आप वाकई इस समाचार को हटाना चाहते हैं?')) {
      newsStore.deleteArticle(id);
      onNewsUpdated();
    }
  };

  const handleAddTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTickerText.trim()) return;
    newsStore.addBreakingNews(newTickerText.trim());
    setNewTickerText('');
    onNewsUpdated();
  };

  const handleRemoveTicker = (idx: number) => {
    newsStore.removeBreakingNews(idx);
    onNewsUpdated();
  };

  const handleBroadcastPush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificationMsg.trim()) return;
    setNotificationBroadcasted(true);
    setTimeout(() => {
      setNotificationBroadcasted(false);
      setNotificationMsg('');
    }, 3000);
  };

  const handleToggleAdmob = () => {
    newsStore.toggleAdmob(!admobActive);
    onNewsUpdated();
  };

  // If locked, show pin entry
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <div className="w-full max-w-sm p-6 bg-slate-900 border border-red-500/30 rounded-2xl shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-red-800 text-white flex items-center justify-center mx-auto mb-4 shadow-lg border border-red-400/30">
            <Shield className="w-8 h-8" />
          </div>

          <F9Logo variant="badge" size="md" className="mx-auto mb-2" />

          <h3 className="text-base font-extrabold text-white">
            F9NEWSINDIA प्रशासक नियंत्रण कक्ष
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            सुरक्षित संपादक लॉगिन (Master Admin Access)
          </p>

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <input
                type="password"
                placeholder="सुरक्षा पिन दर्ज करें (उदा. 9999)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-2.5 text-center text-lg font-bold tracking-widest bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-500"
                autoFocus
              />
              <p className="text-[11px] text-amber-400 mt-1">
                डेमो सुरक्षा पिन: <strong className="underline">9999</strong>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Unlock className="w-4 h-4" />
              प्रशासक पोर्टल खोलें
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-xs text-slate-400 hover:text-white"
            >
              रद्द करें और होम पर लौटें
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-md p-3 sm:p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden my-auto min-h-[90vh]">
        {/* Top Admin Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <F9Logo variant="badge" size="sm" />
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                F9NEWSINDIA संपादक व प्रशासक डैशबोर्ड
                <span className="text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-black">
                  ACTIVE
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                न्यूज़ स्वीकृति, टिकर नियंत्रण और मुद्रीकरण प्रबंधन
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg"
            >
              लॉगआउट
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg"
            >
              डैशबोर्ड बंद करें
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-slate-950/50 border-b border-slate-800">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block">सक्रिय पाठक (Live)</span>
            <span className="text-lg font-black text-emerald-400">{analytics.activeReadersNow}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block">कुल पाठक संख्या (Views)</span>
            <span className="text-lg font-black text-blue-400">{analytics.totalViews.toLocaleString('hi-IN')}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block">समीक्षाधीन समाचार</span>
            <span className="text-lg font-black text-amber-400">{pendingArticles.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block">कुल प्रकाशित समाचार</span>
            <span className="text-lg font-black text-white">{analytics.publishedCount}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-slate-950 border-b border-slate-800 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'pending'
                ? 'bg-red-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            समीक्षाधीन ख़बरें ({pendingArticles.length})
          </button>
          <button
            onClick={() => setActiveTab('all-news')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'all-news'
                ? 'bg-red-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            सभी समाचार ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab('ticker')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'ticker'
                ? 'bg-red-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            ब्रेकिंग न्यूज़ टिकर
          </button>
          <button
            onClick={() => setActiveTab('ads')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'ads'
                ? 'bg-red-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            AdMob व विज्ञापन
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'stats'
                ? 'bg-red-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-blue-400" />
            पुश नोटिफिकेशन
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          {/* TAB 1: PENDING NEWS APPROVAL */}
          {activeTab === 'pending' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white">
                  संवाददाताओं द्वारा भेजी गई ख़बरों की समीक्षा (Editorial Review)
                </h3>
              </div>

              {pendingArticles.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-slate-800">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-white">कोई नई खबर समीक्षा हेतु लंबित नहीं है।</p>
                  <p className="text-xs text-slate-400 mt-1">
                    सभी प्रेषित समाचारों की समीक्षा पूरी हो चुकी है।
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingArticles.map((article) => (
                    <div
                      key={article.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex gap-3">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-20 h-16 rounded-lg object-cover shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-red-400 bg-red-950 px-2 py-0.5 rounded">
                              {article.category}
                            </span>
                            <span className="text-[10px] text-slate-400">{article.location}</span>
                            <span className="text-[10px] text-amber-400 font-semibold">
                              द्वारा: {article.reporterName}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-white">
                            {article.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                            {article.summary}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button
                          onClick={() => handleApprove(article.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow transition-all active:scale-95"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          अनुमोदित करें (Approve)
                        </button>
                        <button
                          onClick={() => handleReject(article.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg transition-all active:scale-95"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          अस्वीकार
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ALL ARTICLES */}
          {activeTab === 'all-news' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white pb-2 border-b border-slate-800">
                वेबसाइट व ऐप पर लाइव समाचार
              </h3>
              <div className="space-y-2">
                {articles.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-12 h-10 rounded object-cover shrink-0"
                      />
                      <div className="truncate">
                        <span className="text-[10px] text-red-400 font-bold mr-2">
                          [{item.category}]
                        </span>
                        <span className="text-white font-medium">{item.title}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-slate-400 text-[11px]">
                        {item.views} व्यूज
                      </span>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-slate-400 hover:text-red-500"
                        title="हटाएं"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BREAKING NEWS TICKER CONTROL */}
          {activeTab === 'ticker' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white pb-2 border-b border-slate-800 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                चलती ब्रेकिंग न्यूज़ टिकर नियंत्रण (Live Ticker Control)
              </h3>

              {/* Add form */}
              <form onSubmit={handleAddTicker} className="flex gap-2">
                <input
                  type="text"
                  placeholder="नया ब्रेकिंग न्यूज़ अलर्ट लिखें (उदा. दिल्ली में महत्वपूर्ण घोषणा...)"
                  value={newTickerText}
                  onChange={(e) => setNewTickerText(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  टिकर में जोड़ें
                </button>
              </form>

              {/* Current ticker items */}
              <div className="space-y-2 pt-2">
                {breakingList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs text-white"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveTicker(idx)}
                      className="p-1 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ADMOB & ADS */}
          {activeTab === 'ads' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white pb-2 border-b border-slate-800">
                Google AdMob एवं डिजिटल विज्ञापन प्रबंधन
              </h3>

              {/* AdMob Toggle Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    Google AdMob मुद्रीकरण (Monetization)
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${admobActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'}`}>
                      {admobActive ? 'सक्रिय (ENABLED)' : 'निष्क्रिय (PAUSED)'}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Android ऐप में Google AdMob बैनर एवं इंटरस्टिशियल विज्ञापन स्लॉट्स प्रदर्शित करें।
                  </p>
                </div>

                <button
                  onClick={handleToggleAdmob}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow ${
                    admobActive
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {admobActive ? 'AdMob चालू है' : 'चालू करें'}
                </button>
              </div>

              {/* AdMob Slots Specification */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  AdMob यूनिट आईडी विन्यास (Google AdMob Unit IDs)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block font-semibold">Banner Unit ID:</span>
                    <span className="font-mono text-emerald-400 text-[11px]">ca-app-pub-3940256099942544/6300978111 (Test)</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block font-semibold">Interstitial Unit ID:</span>
                    <span className="font-mono text-emerald-400 text-[11px]">ca-app-pub-3940256099942544/1033173712 (Test)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PUSH NOTIFICATIONS */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white pb-2 border-b border-slate-800 flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-400" />
                तत्काल पुश नोटिफिकेशन ब्रॉडकास्ट (Breaking Push Alert)
              </h3>

              {notificationBroadcasted && (
                <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-bounce">
                  <Check className="w-4 h-4 text-emerald-400" />
                  पुश नोटिफिकेशन सभी ऐप उपयोगकर्ताओं को सफलतापूर्वक भेजा गया!
                </div>
              )}

              <form onSubmit={handleBroadcastPush} className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <label className="block text-xs font-bold text-slate-300">
                  अलर्ट संदेश लिखें (Android Notification Text):
                </label>
                <textarea
                  rows={3}
                  value={notificationMsg}
                  onChange={(e) => setNotificationMsg(e.target.value)}
                  placeholder="उदा. ब्रेकिंग: सरकार का बड़ा फैसला, तुरंत पढ़ें F9NEWSINDIA पर..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  सभी उपयोगकर्ताओं को पुश अलर्ट भेजें
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
