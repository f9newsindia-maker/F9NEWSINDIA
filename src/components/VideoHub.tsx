import React, { useState } from 'react';
import { NewsVideo } from '../types/news';
import { Play, Youtube, Radio, Sparkles, ExternalLink, Share2, Flame, Eye, Clock, X } from 'lucide-react';

interface VideoHubProps {
  videos: NewsVideo[];
}

export const VideoHub: React.FC<VideoHubProps> = ({ videos }) => {
  const [activeVideo, setActiveVideo] = useState<NewsVideo | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'shorts'>('all');

  const liveVideo = videos.find((v) => v.isLive) || videos[0];
  const shortsList = videos.filter((v) => v.isShort);
  const regularVideos = videos.filter((v) => !v.isShort);

  const displayList =
    activeTab === 'live'
      ? [liveVideo]
      : activeTab === 'shorts'
      ? shortsList
      : videos;

  const handleOpenYouTubeChannel = () => {
    window.open('https://www.youtube.com/@f9newsindia', '_blank');
  };

  const handleShareVideo = (video: NewsVideo, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `F9NEWSINDIA वीडियो न्यूज़: ${video.title}\n\nदेखें आधिकारिक F9 YouTube चैनल पर: https://www.youtube.com/@f9newsindia`;
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text,
        url: 'https://www.youtube.com/@f9newsindia',
      }).catch(() => {});
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div className="space-y-4 px-3 py-2 max-w-7xl mx-auto">
      {/* Official Channel Banner & Subscribe Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-red-900 border border-red-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-lg">
            <Youtube className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              F9NEWSINDIA Official YouTube
              <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded text-white font-bold">24x7 HD</span>
            </h3>
            <p className="text-xs text-slate-300">
              लाइव डिबेट, ग्राउंड रिपोर्ट्स, और एक्सक्लूसिव खुलासे सबसे पहले
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenYouTubeChannel}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95"
        >
          <Youtube className="w-4 h-4 fill-white" />
          <span>YouTube पर सब्सक्राइब करें</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'all'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          सभी वीडियो ({videos.length})
        </button>
        <button
          onClick={() => setActiveTab('live')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'live'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          लाइव टीवी
        </button>
        <button
          onClick={() => setActiveTab('shorts')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'shorts'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          F9 Shorts (60 सेकंड)
        </button>
      </div>

      {/* Main Live Broadcast Showcase */}
      {liveVideo && activeTab !== 'shorts' && (
        <div
          onClick={() => setActiveVideo(liveVideo)}
          className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-red-500/40 shadow-2xl cursor-pointer group"
        >
          <img
            src={liveVideo.thumbnailUrl}
            alt={liveVideo.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Live Indicator */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white text-xs font-black rounded-lg shadow-lg">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              F9 LIVE 24x7
            </span>
            <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold rounded-lg">
              {liveVideo.views}
            </span>
          </div>

          {/* Big Play Button in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 fill-white ml-1" />
            </div>
          </div>

          {/* Title bar at bottom */}
          <div className="absolute bottom-3 inset-x-3 p-3 bg-black/60 backdrop-blur-md rounded-xl flex items-center justify-between">
            <div className="truncate mr-2">
              <h4 className="text-sm sm:text-base font-bold text-white truncate">
                {liveVideo.title}
              </h4>
              <p className="text-xs text-red-400">सच की आवाज़ • F9NEWSINDIA</p>
            </div>
            <button
              onClick={(e) => handleShareVideo(liveVideo, e)}
              className="p-2 text-white bg-slate-800 hover:bg-slate-700 rounded-lg shrink-0"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Shorts Section Horizontal Shelf (if not on shorts tab) */}
      {activeTab === 'all' && shortsList.length > 0 && (
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              F9 News Shorts - 60 सेकंड में देश की ख़बरें
            </h3>
            <button
              onClick={() => setActiveTab('shorts')}
              className="text-xs text-red-400 font-semibold hover:underline"
            >
              सभी देखें
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {shortsList.map((short) => (
              <div
                key={short.id}
                onClick={() => setActiveVideo(short)}
                className="relative aspect-[9/16] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer group shadow-lg"
              >
                <img
                  src={short.thumbnailUrl}
                  alt={short.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-red-600 text-[10px] font-bold text-white rounded">
                  Shorts
                </span>
                <div className="absolute bottom-2 inset-x-2">
                  <h5 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                    {short.title}
                  </h5>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {short.views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid of Other Video News */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3">
          ताज़ा वीडियो बुलेटिन एवं रिपोर्ट्स
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayList
            .filter((v) => v.id !== liveVideo?.id)
            .map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow cursor-pointer group hover:border-red-600/40 transition-all"
              >
                <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 text-[10px] font-bold text-white bg-black/80 rounded">
                    {video.duration}
                  </span>
                  <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold text-white bg-blue-600 rounded">
                    {video.category}
                  </span>
                </div>

                <div className="p-3">
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 group-hover:text-red-400 transition-colors">
                    {video.title}
                  </h4>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{video.views}</span>
                    <span>{video.publishedAt}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Embedded Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2 truncate">
                <Youtube className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-xs font-bold text-white truncate">
                  {activeVideo.title}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Live/Video Screen */}
            <div className="relative aspect-video w-full bg-black flex flex-col items-center justify-center text-center p-6">
              <img
                src={activeVideo.thumbnailUrl}
                alt={activeVideo.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 space-y-3">
                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white max-w-md mx-auto">
                  {activeVideo.title}
                </h3>
                <p className="text-xs text-slate-300">
                  F9NEWSINDIA YouTube 24x7 HD ब्रॉडकास्ट
                </p>
                <button
                  onClick={handleOpenYouTubeChannel}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95"
                >
                  <Youtube className="w-4 h-4 fill-white" />
                  <span>YouTube पर देखें</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
              <span>F9NEWSINDIA आधिकारिक वीडियो प्लेयर</span>
              <button
                onClick={(e) => handleShareVideo(activeVideo, e)}
                className="flex items-center gap-1 text-emerald-400 hover:underline"
              >
                <Share2 className="w-3.5 h-3.5" /> शेयर करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
