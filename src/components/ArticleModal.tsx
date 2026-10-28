import React, { useState, useEffect } from 'react';
import { NewsArticle, CommentItem } from '../types/news';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Heart,
  Volume2,
  VolumeX,
  MapPin,
  Clock,
  Eye,
  ShieldCheck,
  MessageSquare,
  Send,
  Type,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { speechReader } from '../utils/speech';
import { newsStore } from '../data/newsStore';

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  onSelectRelated: (article: NewsArticle) => void;
  allArticles: NewsArticle[];
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onSelectRelated,
  allArticles,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commenterName, setCommenterName] = useState('');

  useEffect(() => {
    if (!article) return;
    newsStore.incrementViews(article.id);
    setIsLiked(newsStore.isLiked(article.id));
    setIsBookmarked(newsStore.isBookmarked(article.id));
    setComments(article.comments || []);

    const unsubscribe = speechReader.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });

    return () => {
      speechReader.stop();
      unsubscribe();
    };
  }, [article?.id]);

  if (!article) return null;

  const handleToggleAudio = () => {
    if (isSpeaking) {
      speechReader.stop();
    } else {
      speechReader.speak(article.content, article.title);
    }
  };

  const handleToggleLike = () => {
    const newState = newsStore.toggleLike(article.id);
    setIsLiked(newState);
  };

  const handleToggleBookmark = () => {
    const newState = newsStore.toggleBookmark(article.id);
    setIsBookmarked(newState);
  };

  const handleShareWhatsApp = () => {
    const text = `*${article.title}*\n\n${article.summary}\n\nविस्तृत समाचार पढ़ें F9NEWSINDIA आधिकारिक ऐप पर: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: `${article.title}\n${article.summary}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleShareWhatsApp();
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    newsStore.addComment(article.id, commentInput.trim(), commenterName.trim() || undefined);
    const updated = newsStore.getArticleById(article.id);
    if (updated) {
      setComments([...updated.comments]);
    }
    setCommentInput('');
  };

  const relatedList = allArticles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.isTrending))
    .slice(0, 3);

  const fontClass =
    fontSize === 'normal'
      ? 'text-base leading-relaxed'
      : fontSize === 'large'
      ? 'text-lg leading-loose'
      : 'text-xl leading-loose font-medium';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex justify-center">
      <div className="w-full max-w-3xl min-h-screen bg-slate-950 border-x border-slate-800 flex flex-col shadow-2xl">
        {/* Sticky Top Navigation */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-3 py-2.5 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-2 py-1 text-sm font-semibold hover:bg-slate-800 rounded-lg text-slate-200 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5 text-red-500" />
            <span className="hidden xs:inline">वापस</span>
          </button>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Font Size Adjuster */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 text-xs font-bold rounded ${fontSize === 'normal' ? 'bg-red-600 text-white' : 'text-slate-400'}`}
                title="सामान्य फ़ॉन्ट"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 text-sm font-bold rounded ${fontSize === 'large' ? 'bg-red-600 text-white' : 'text-slate-400'}`}
                title="बड़ा फ़ॉन्ट"
              >
                A+
              </button>
            </div>

            {/* Audio Listen */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-950 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden xs:inline">{isSpeaking ? 'रोकें' : 'सुनें'}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={handleToggleBookmark}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>

            {/* Native Share */}
            <button
              onClick={handleNativeShare}
              className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Article Body */}
        <div className="p-4 sm:p-6 flex-1">
          {/* Category & Badges */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {article.isBreaking && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-black text-white bg-red-600 rounded">
                <Flame className="w-3.5 h-3.5" /> ब्रेकिंग न्यूज़
              </span>
            )}
            <span className="px-2.5 py-0.5 text-xs font-bold text-white bg-blue-600 rounded">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
              <MapPin className="w-3 h-3 text-red-400" />
              {article.location}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
            {article.title}
          </h1>

          {/* Reporter & Metadata Bar */}
          <div className="p-3 mb-4 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-600/30 border border-red-500/50 flex items-center justify-center font-black text-white">
                F9
              </div>
              <div>
                <div className="flex items-center gap-1 font-bold text-white">
                  <span>{article.reporterName}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(article.publishedAt).toLocaleString('hi-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-blue-400 font-semibold">
                <Eye className="w-3.5 h-3.5" />
                {article.views.toLocaleString('hi-IN')}
              </span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-4 shadow-xl border border-slate-800">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded text-[10px] text-slate-300">
              फोटो: F9NEWSINDIA विशेष कवरेज
            </div>
          </div>

          {/* Key Highlights Bullet Card */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-slate-900 to-blue-950/30 border-l-4 border-red-600">
            <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-1.5">
              मुख्य बिंदु (Key Highlights)
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {article.summary}
            </p>
          </div>

          {/* Article Text Content */}
          <div className={`text-slate-200 whitespace-pre-line space-y-4 ${fontClass}`}>
            {article.content}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-semibold">संबंधित टैग्स:</span>
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs rounded-full bg-slate-900 text-slate-300 border border-slate-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* One-Tap Share Strip (WhatsApp, FB) */}
          <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <h4 className="text-xs font-bold text-slate-300 mb-3">
              यह महत्वपूर्ण खबर अपने परिजनों और मित्रों के साथ साझा करें
            </h4>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                onClick={handleShareWhatsApp}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                WhatsApp पर शेयर करें
              </button>
              <button
                onClick={handleShareFacebook}
                className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95"
              >
                Facebook
              </button>
              <button
                onClick={handleToggleLike}
                className={`flex items-center gap-1.5 px-4 py-2 font-bold text-xs rounded-xl border transition-all active:scale-95 ${
                  isLiked
                    ? 'bg-red-600 text-white border-red-500'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                <span>पसंद ({article.likes + (isLiked ? 1 : 0)})</span>
              </button>
            </div>
          </div>

          {/* Interactive Comments Section */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-red-500" />
                पाठकों की राय व टिप्पणियाँ ({comments.length})
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="mb-6 space-y-2">
              <input
                type="text"
                placeholder="आपका नाम (वैकल्पिक)"
                value={commenterName}
                onChange={(e) => setCommenterName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="इस खबर पर अपनी राय लिखें..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-md shrink-0 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  भेजें
                </button>
              </div>
            </form>

            {/* Comments List */}
            {comments.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">
                अभी कोई टिप्पणी नहीं है। सबसे पहले अपनी राय साझा करें!
              </p>
            ) : (
              <div className="space-y-3">
                {comments.map((c) => (
                  <div key={c.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="font-bold text-white">{c.userName}</span>
                      <span className="text-[10px]">{c.timestamp}</span>
                    </div>
                    <p className="text-slate-300 leading-normal">{c.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Related Articles */}
          {relatedList.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                संबंधित अन्य ख़बरें
              </h3>
              <div className="space-y-2.5">
                {relatedList.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectRelated(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 cursor-pointer transition-all"
                  >
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-16 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-red-400 block mb-0.5">
                        {rel.category}
                      </span>
                      <h4 className="text-xs font-semibold text-white line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
