import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types/news';
import { ChevronLeft, ChevronRight, Volume2, Flame, Eye, Clock, Share2, Bookmark } from 'lucide-react';
import { speechReader } from '../utils/speech';

interface FeaturedNewsCarouselProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onToggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

export const FeaturedNewsCarousel: React.FC<FeaturedNewsCarouselProps> = ({
  articles,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featured = articles.filter((a) => a.isFeatured || a.isBreaking).slice(0, 5);

  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [featured.length]);

  if (featured.length === 0) return null;

  const current = featured[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % featured.length);
  };

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    speechReader.speak(current.summary, current.title);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `*${current.title}*\n\n${current.summary}\n\nपूरी खबर पढ़ें F9NEWSINDIA आधिकारिक ऐप पर: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({
        title: current.title,
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  return (
    <div className="relative mx-3 mt-3 overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl group">
      <div
        onClick={() => onSelectArticle(current)}
        className="relative block h-72 sm:h-96 w-full cursor-pointer overflow-hidden"
      >
        {/* Background Image with smooth zoom effect */}
        <img
          src={current.imageUrl}
          alt={current.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {current.isBreaking && (
              <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-black text-white bg-red-600 rounded-md shadow-md animate-pulse">
                <Flame className="w-3.5 h-3.5" /> ब्रेकिंग
              </span>
            )}
            <span className="px-2.5 py-1 text-xs font-bold text-white bg-blue-600/90 backdrop-blur-md rounded-md shadow-sm">
              {current.category}
            </span>
            <span className="hidden xs:inline-block px-2 py-0.5 text-[11px] font-medium text-slate-200 bg-slate-800/80 backdrop-blur-md rounded">
              {current.location}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio Listen */}
            <button
              onClick={handlePlayAudio}
              title="ख़बर सुनें"
              className="p-2 text-white bg-slate-900/80 hover:bg-red-600 backdrop-blur-md rounded-full shadow transition-all active:scale-95"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
            </button>
            {/* Bookmark */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(current.id);
              }}
              title="सेव करें"
              className="p-2 text-white bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md rounded-full shadow transition-all active:scale-95"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isBookmarked(current.id) ? 'fill-red-500 text-red-500' : 'text-slate-200'
                }`}
              />
            </button>
            {/* WhatsApp Share */}
            <button
              onClick={handleShare}
              title="शेयर करें"
              className="p-2 text-white bg-emerald-600 hover:bg-emerald-500 backdrop-blur-md rounded-full shadow transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-10">
          <h2 className="text-lg sm:text-2xl font-bold text-white leading-snug drop-shadow-md line-clamp-2 sm:line-clamp-3">
            {current.title}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2 font-normal drop-shadow">
            {current.summary}
          </p>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2.5">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-200">{current.reporterName}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(current.publishedAt).toLocaleDateString('hi-IN', {
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                {current.views.toLocaleString('hi-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows for desktop/tablet */}
      {featured.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-red-600 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hidden sm:flex items-center justify-center z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-red-600 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hidden sm:flex items-center justify-center z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Indicators */}
      {featured.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {featured.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === idx ? 'w-6 bg-red-500' : 'w-1.5 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
