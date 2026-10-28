import React, { useState } from 'react';
import { NewsArticle, NewsCategory } from '../types/news';
import { newsStore } from '../data/newsStore';
import {
  PenTool,
  Upload,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  ShieldCheck,
  Send,
  Save,
  Image,
  Video,
  MapPin,
  Tag,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import { F9Logo } from './F9Logo';

interface ReporterPortalProps {
  onArticleSubmitted?: () => void;
  onClose?: () => void;
}

const CATEGORIES_LIST: NewsCategory[] = [
  'देश',
  'महाराष्ट्र',
  'उत्तर प्रदेश',
  'राजनीति',
  'अपराध',
  'मनोरंजन',
  'खेल',
  'बिजनेस',
  'टेक्नोलॉजी',
  'स्थानीय समाचार',
];

export const ReporterPortal: React.FC<ReporterPortalProps> = ({
  onArticleSubmitted,
  onClose,
}) => {
  const currentUser = newsStore.getCurrentUser();
  const [activeTab, setActiveTab] = useState<'submit' | 'my-submissions' | 'id-card'>('submit');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<NewsCategory>('स्थानीय समाचार');
  const [location, setLocation] = useState(currentUser.district || 'मुंबई, महाराष्ट्र');
  const [reporterName, setReporterName] = useState(currentUser.name || 'F9 विशेष संवाददाता');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1000&auto=format&fit=crop&q=80');
  const [videoUrl, setVideoUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isBreaking, setIsBreaking] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  // My submissions
  const allArticles = newsStore.getAllArticlesForAdmin();
  const mySubmissions = allArticles.filter(
    (a) => a.reporterName.includes(reporterName) || a.reporterId === currentUser.reporterBadgeId
  );

  const handleSubmit = (status: 'pending' | 'draft') => {
    if (!title.trim() || !content.trim()) {
      alert('कृपया शीर्षक (Headline) और समाचार विवरण भरें।');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    newsStore.addArticle({
      title: title.trim(),
      category,
      location: location.trim(),
      reporterName: reporterName.trim(),
      reporterId: currentUser.reporterBadgeId || 'REP-F9-ONLINE',
      summary: summary.trim() || title.trim().slice(0, 120),
      content: content.trim(),
      imageUrl: imageUrl.trim(),
      videoUrl: videoUrl.trim() || undefined,
      publishedAt: new Date().toISOString(),
      tags: tags.length > 0 ? tags : [category, 'F9NEWS'],
      status: status,
      isBreaking,
    });

    if (status === 'pending') {
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setActiveTab('my-submissions');
      }, 2000);
    } else {
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 2000);
    }

    // Reset form
    setTitle('');
    setSummary('');
    setContent('');
    setTagsInput('');
    setIsBreaking(false);

    if (onArticleSubmitted) onArticleSubmitted();
  };

  return (
    <div className="max-w-4xl mx-auto px-3 py-4 space-y-4">
      {/* Reporter Portal Header */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 border border-blue-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              F9NEWSINDIA पत्रकार एवं संवाददाता पोर्टल
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </h2>
            <p className="text-xs text-slate-300">
              सच की आवाज़ — जमीनी रिपोर्टिंग और ग्राउंड जीरो से सीधी ख़बरें
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('submit')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'submit'
                ? 'bg-red-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            नई खबर भेजें
          </button>
          <button
            onClick={() => setActiveTab('my-submissions')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'my-submissions'
                ? 'bg-red-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            मेरी ख़बरें ({mySubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('id-card')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'id-card'
                ? 'bg-red-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            प्रेस कार्ड
          </button>
        </div>
      </div>

      {/* Success Toasts */}
      {submitSuccess && (
        <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-lg animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          समाचार सफलतापूर्वक संपादकीय मंडल को समीक्षा हेतु भेज दिया गया है! अनुमोदन के बाद लाइव हो जाएगा।
        </div>
      )}

      {draftSaved && (
        <div className="p-3 rounded-xl bg-amber-950 border border-amber-500/50 text-amber-200 text-xs font-bold flex items-center gap-2 shadow-lg">
          <Save className="w-4 h-4 text-amber-400" />
          ड्राफ्ट सुरक्षित कर लिया गया है।
        </div>
      )}

      {/* TAB 1: SUBMIT NEWS FORM */}
      {activeTab === 'submit' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-500" />
              समाचार प्रविष्टि फॉर्म (News Submission Form)
            </h3>
            <span className="text-[11px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              * प्रशासक अनुमोदन आवश्यक
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                श्रेणी (Category) *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NewsCategory)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
              >
                {CATEGORIES_LIST.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                स्थान / जिला व राज्य (Location) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="उदा. मुंबई, महाराष्ट्र या लखनऊ, उप्र"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                />
                <MapPin className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
              </div>
            </div>

            {/* Reporter Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                संवाददाता का नाम (Reporter Name) *
              </label>
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Breaking News Checkbox */}
            <div className="flex items-center sm:pt-6">
              <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-slate-950 border border-slate-800 w-full hover:border-red-600/50">
                <input
                  type="checkbox"
                  checked={isBreaking}
                  onChange={(e) => setIsBreaking(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded bg-slate-800 border-slate-700"
                />
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                  यह ब्रेकिंग न्यूज़ है (Ticker Alert)
                </span>
              </label>
            </div>
          </div>

          {/* Headline */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              मुख्य शीर्षक (News Headline) *
            </label>
            <input
              type="text"
              placeholder="आकर्षक और निष्पक्ष मुख्य समाचार शीर्षक दर्ज करें..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2.5 text-sm font-semibold bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              संक्षिप्त विवरण / मुख्य बिंदु (Summary / Highlights)
            </label>
            <textarea
              rows={2}
              placeholder="1-2 वाक्यों में मुख्य खबर का सार लिखें..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Full Story Content */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              विस्तृत समाचार विवरण (Full News Content) *
            </label>
            <textarea
              rows={6}
              placeholder="पूरी खबर विस्तार से लिखें (स्थान, घटना, प्रत्यक्षदर्शियों के बयान, प्रशासन की प्रतिक्रिया)..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white leading-relaxed focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Media Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5 text-blue-400" />
                समाचार फोटो URL
              </label>
              <input
                type="text"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-red-400" />
                वीडियो या YouTube लिंक (वैकल्पिक)
              </label>
              <input
                type="text"
                placeholder="https://youtube.com/..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              टैग्स (अल्पविराम से अलग करें)
            </label>
            <input
              type="text"
              placeholder="महाराष्ट्र, विकास, स्थानीय, F9NEWS"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => handleSubmit('draft')}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              ड्राफ्ट सहेजें
            </button>
            <button
              type="button"
              onClick={() => handleSubmit('pending')}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold rounded-xl shadow-lg transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              संपादकीय समीक्षा हेतु भेजें
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: MY SUBMISSIONS */}
      {activeTab === 'my-submissions' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">
              मेरी प्रेषित ख़बरें एवं स्थिति (My Submissions & Status)
            </h3>
            <span className="text-xs text-slate-400">कुल: {mySubmissions.length}</span>
          </div>

          {mySubmissions.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              आपने अभी कोई खबर नहीं भेजी है।
            </div>
          ) : (
            <div className="space-y-3">
              {mySubmissions.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-slate-400">{item.location}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3 self-end sm:self-center">
                    {item.status === 'published' && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        <CheckCircle className="w-3.5 h-3.5" /> प्रकाशित (Live)
                      </span>
                    )}
                    {item.status === 'pending' && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30">
                        <Clock className="w-3.5 h-3.5" /> समीक्षाधीन (Under Review)
                      </span>
                    )}
                    {item.status === 'rejected' && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-red-400 bg-red-950/80 px-2.5 py-1 rounded-full border border-red-500/30">
                        <XCircle className="w-3.5 h-3.5" /> अस्वीकृत
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: REPORTER PRESS ID CARD */}
      {activeTab === 'id-card' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col items-center">
          <h3 className="text-sm font-bold text-white mb-4">
            आधिकारिक F9NEWSINDIA डिजिटल प्रेस पहचान पत्र
          </h3>

          {/* Press Card Graphic */}
          <div className="w-full max-w-sm rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-red-600 shadow-2xl p-4 text-center relative select-none">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-red-600/40">
              <F9Logo variant="badge" size="sm" />
              <div>
                <h4 className="text-xs font-black text-white tracking-widest">
                  F9NEWSINDIA MEDIA
                </h4>
                <p className="text-[9px] text-amber-300 font-bold">सच की आवाज़ • प्रेस कार्ड</p>
              </div>
              <span className="px-1.5 py-0.5 text-[9px] bg-red-600 text-white font-bold rounded">
                PRESS
              </span>
            </div>

            {/* Reporter Photo & Details */}
            <div className="my-4 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-red-500 p-1 mb-2 bg-slate-800 flex items-center justify-center overflow-hidden">
                <span className="text-2xl font-black text-white">F9</span>
              </div>
              <h5 className="text-sm font-extrabold text-white">{reporterName}</h5>
              <p className="text-xs text-blue-400 font-bold">अधिकृत संवाददाता / ब्यूरो</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{location}</p>
            </div>

            {/* ID & Barcode Mockup */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <div className="text-left">
                <span className="block font-bold text-slate-300">कार्ड संख्या:</span>
                <span className="font-mono text-amber-400">F9-MEDIA-2026-9481</span>
              </div>
              <div className="text-right">
                <span className="block font-bold text-slate-300">वैधता:</span>
                <span className="text-emerald-400">31 दिसंबर 2027</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
