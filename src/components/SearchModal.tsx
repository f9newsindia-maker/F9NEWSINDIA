import React, { useState } from 'react';
import { Search, X, Flame, MapPin } from 'lucide-react';
import { NewsArticle } from '../types/news';
import { newsStore } from '../data/newsStore';

interface SearchModalProps {
  onClose: () => void;
  onSelectArticle: (article: NewsArticle) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('सभी');

  const articles = newsStore.getArticles(
    activeCategory === 'सभी' ? undefined : activeCategory,
    query
  );

  const popularTags = ['महाराष्ट्र', 'उत्तर प्रदेश', 'राजनीति', 'क्रिकेट', 'शेयर बाजार', 'साइबर अपराध', 'जेवर'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 sm:p-6 mt-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <Search className="w-5 h-5 text-red-500" />
          F9NEWSINDIA समाचार खोजें (Search News)
        </h3>

        {/* Search Input */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="कीवर्ड, राज्य, नेता, अपराध, खेल या शहर खोजें..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
            autoFocus
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
        </div>

        {/* Popular Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
            <Flame className="w-3 h-3 text-red-500" /> ट्रेंडिंग खोज:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md border border-slate-700"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="border-t border-slate-800 pt-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>परिणाम: {articles.length} समाचार मिले</span>
            {query && <span>खोज: "{query}"</span>}
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              कोई समाचार नहीं मिला। कृपया अन्य कीवर्ड या श्रेणी आज़माएं।
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
              {articles.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectArticle(item);
                    onClose();
                  }}
                  className="p-3 bg-slate-950 hover:bg-slate-850 rounded-xl border border-slate-800 flex items-center gap-3 cursor-pointer transition-all"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-red-400 font-bold mb-0.5">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span className="text-slate-400">{item.location}</span>
                    </div>
                    <h4 className="text-xs font-semibold text-white line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {item.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
