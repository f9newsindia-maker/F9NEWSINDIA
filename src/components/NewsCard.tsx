import React from 'react';
import { NewsArticle } from '../types/news';
import { Volume2, Bookmark, Share2, MapPin, Eye, Clock, ShieldCheck, Flame } from 'lucide-react';
import { speechReader } from '../utils/speech';

interface NewsCardProps {
  article: NewsArticle;
  onSelect: (article: NewsArticle) => void;
  onToggleBookmark: (id: string) => void;
  isBookmarked: boolean;
  compact?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onSelect,
  onToggleBookmark,
  isBookmarked,
  compact = false,
}) => {
  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    speechReader.speak(article.summary, article.title);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `*${article.title}*\n\n${article.summary}\n\nपूरी खबर पढ़ें F9NEWSINDIA ऐप पर: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(article.id);
  };

  // Compact layout (used in list views, search results, or related news)
  if (compact) {
    return (
      <div
        onClick={() => onSelect(article)}
        className="flex gap-3 p-3 bg-slate-900/90 hover:bg-slate-850 border border-slate-800 rounded-xl cursor-pointer transition-all active:scale-[0.99] group"
      >
        <div className="relative w-24 h-20 sm:w-28 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-slate-950">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {article.isBreaking && (
            <span className="absolute top-1 left-1 px-1.5 py-0.5 text-[9px] font-bold text-white bg-red-600 rounded">
              ब्रेकिंग
            </span>
          )}
        </div>
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] text-red-400 font-bold mb-1">
              <span>{article.category}</span>
              <span>•</span>
              <span className="text-slate-400">{article.location}</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
              {article.title}
            </h4>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
            <span>{article.reporterName}</span>
            <div className="flex items-center gap-1.5">
              <button onClick={handlePlayAudio} className="p-1 hover:text-amber-300">
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              <button onClick={handleShare} className="p-1 hover:text-emerald-400">
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full Feed Card Layout
  return (
    <article
      onClick={() => onSelect(article)}
      className="bg-slate-900/95 hover:bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-red-950/20 transition-all cursor-pointer group active:scale-[0.99] flex flex-col justify-between"
    >
      <div>
        {/* Cover Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Badges on image */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
            {article.isBreaking && (
              <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-black text-white bg-red-600 rounded-md shadow-md animate-pulse">
                <Flame className="w-3 h-3 fill-white" /> ब्रेकिंग
              </span>
            )}
            <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-blue-600 rounded-md shadow">
              {article.category}
            </span>
            {article.isSponsored && (
              <span className="px-2 py-0.5 text-[10px] font-extrabold text-slate-900 bg-amber-400 rounded-md shadow">
                प्रायोजित
              </span>
            )}
          </div>

          {/* Location & Quick Audio Listen */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-xs text-white">
            <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-medium">
              <MapPin className="w-3 h-3 text-red-400" />
              {article.location}
            </span>

            <button
              onClick={handlePlayAudio}
              title="ख़बर सुनें"
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 hover:bg-red-600 backdrop-blur-md text-[11px] font-bold transition-all text-amber-300"
            >
              <Volume2 className="w-3 h-3" />
              <span>सुनें</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-3.5">
          <h3 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
            {article.title}
          </h3>

          <p className="mt-1.5 text-xs text-slate-300 line-clamp-2 font-normal leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="px-3.5 pb-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5 truncate max-w-[60%]">
          <span className="font-semibold text-slate-300 truncate">{article.reporterName}</span>
          <span title="सत्यापित संवाददाता" className="inline-flex shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {/* Views count */}
          <span className="flex items-center gap-1 text-[11px] text-slate-400 mr-1.5">
            <Eye className="w-3 h-3 text-blue-400" />
            {article.views > 999 ? `${(article.views / 1000).toFixed(1)}k` : article.views}
          </span>

          {/* Bookmark */}
          <button
            onClick={handleBookmark}
            title={isBookmarked ? 'सेव्ड से हटाएं' : 'सेव करें'}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <Bookmark
              className={`w-4 h-4 ${
                isBookmarked ? 'fill-red-500 text-red-500' : 'text-slate-300'
              }`}
            />
          </button>

          {/* Share on WhatsApp */}
          <button
            onClick={handleShare}
            title="WhatsApp पर शेयर करें"
            className="p-1.5 rounded-lg hover:bg-emerald-950/80 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
