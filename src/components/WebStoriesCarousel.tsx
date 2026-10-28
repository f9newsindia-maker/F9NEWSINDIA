import React, { useState, useEffect } from 'react';
import { WebStory, WebStorySlide } from '../types/news';
import { newsStore } from '../data/newsStore';
import { Sparkles, ChevronRight, ChevronLeft, X, Share2, Eye } from 'lucide-react';

export const WebStoriesCarousel: React.FC = () => {
  const stories = newsStore.getWebStories();
  const [activeStory, setActiveStory] = useState<WebStory | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!activeStory) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => {
        if (prev < activeStory.slides.length - 1) {
          return prev + 1;
        } else {
          return prev; // Stay on last slide or close
        }
      });
    }, 5500);

    return () => clearInterval(interval);
  }, [activeStory, activeStory?.slides.length]);

  if (!stories || stories.length === 0) return null;

  const handleOpenStory = (story: WebStory) => {
    setActiveStory(story);
    setSlideIndex(0);
  };

  const handleNextSlide = () => {
    if (!activeStory) return;
    if (slideIndex < activeStory.slides.length - 1) {
      setSlideIndex((prev) => prev + 1);
    } else {
      setActiveStory(null);
    }
  };

  const handlePrevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
    }
  };

  const currentSlide = activeStory?.slides[slideIndex];

  return (
    <div className="mx-3 my-3">
      {/* Title Bar */}
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          तस्वीर में ख़बरें (Web Stories)
        </h3>
        <span className="text-[11px] text-red-400 font-bold">विज़ुअल बुलेटिन</span>
      </div>

      {/* Stories Shelf */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => handleOpenStory(story)}
            className="relative w-28 h-40 sm:w-32 sm:h-44 rounded-2xl overflow-hidden shrink-0 cursor-pointer shadow-lg group border-2 border-red-600/60 active:scale-95 transition-all select-none"
          >
            <img
              src={story.coverImage}
              alt={story.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute top-2 left-2 p-1 rounded-full bg-red-600 text-white">
              <Sparkles className="w-3 h-3" />
            </div>
            <div className="absolute bottom-2 inset-x-2">
              <h5 className="text-[11px] font-bold text-white line-clamp-2 leading-tight">
                {story.title}
              </h5>
              <span className="text-[9px] text-amber-300 mt-1 block">
                {story.views}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Web Story Viewer Modal */}
      {activeStory && currentSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/95 backdrop-blur-md">
          <div className="relative w-full max-w-sm h-full sm:h-[85vh] bg-slate-950 sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
            {/* Top Progress Bars */}
            <div className="absolute top-3 inset-x-3 z-30 flex items-center gap-1">
              {activeStory.slides.map((_, idx) => (
                <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-red-500 transition-all ${
                      idx < slideIndex ? 'w-full' : idx === slideIndex ? 'w-full duration-5000' : 'w-0'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Top Header */}
            <div className="absolute top-6 inset-x-3 z-30 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-red-600 text-[10px] font-bold rounded">
                  {currentSlide.category}
                </span>
                <span className="text-xs font-bold truncate max-w-[160px] drop-shadow">
                  {activeStory.title}
                </span>
              </div>
              <button
                onClick={() => setActiveStory(null)}
                className="p-1 rounded-full bg-black/60 text-white hover:bg-black/90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Background Story Image */}
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/60" />

            {/* Click Navigation Areas (Left for prev, Right for next) */}
            <div
              onClick={handlePrevSlide}
              className="absolute inset-y-0 left-0 w-1/3 z-20 cursor-pointer"
            />
            <div
              onClick={handleNextSlide}
              className="absolute inset-y-0 right-0 w-2/3 z-20 cursor-pointer"
            />

            {/* Bottom Caption */}
            <div className="relative z-30 p-5 mt-auto text-white space-y-2">
              <h4 className="text-base sm:text-lg font-extrabold leading-snug drop-shadow-md">
                {currentSlide.title}
              </h4>
              <p className="text-xs text-slate-200 drop-shadow leading-relaxed">
                {currentSlide.description}
              </p>

              <div className="pt-3 flex items-center justify-between text-xs text-slate-300">
                <span>स्लाइड {slideIndex + 1} / {activeStory.slides.length}</span>
                <span className="text-[11px] text-amber-300">टैप करके आगे बढ़ें ›</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
