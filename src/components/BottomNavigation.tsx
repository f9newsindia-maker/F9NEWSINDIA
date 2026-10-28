import React from 'react';
import { Home, Grid, PlayCircle, Bookmark, Menu, Shield } from 'lucide-react';

export type MainNavTab = 'home' | 'categories' | 'videos' | 'saved' | 'menu';

interface BottomNavigationProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
  savedCount: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onSelectTab,
  savedCount,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 text-white shadow-2xl safe-bottom">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
        {/* Home */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all select-none active:scale-95 ${
            activeTab === 'home' ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">होम</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => onSelectTab('categories')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all select-none active:scale-95 ${
            activeTab === 'categories' ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">विभाग</span>
        </button>

        {/* Video News */}
        <button
          onClick={() => onSelectTab('videos')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all select-none active:scale-95 ${
            activeTab === 'videos' ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <PlayCircle className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-600 animate-ping" />
          </div>
          <span className="text-[10px] mt-0.5">वीडियो</span>
        </button>

        {/* Saved */}
        <button
          onClick={() => onSelectTab('saved')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all select-none active:scale-95 ${
            activeTab === 'saved' ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1 text-[9px] font-black text-white bg-red-600 rounded-full">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">सेव्ड</span>
        </button>

        {/* More Menu */}
        <button
          onClick={() => onSelectTab('menu')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all select-none active:scale-95 ${
            activeTab === 'menu' ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">मेनू</span>
        </button>
      </div>
    </nav>
  );
};
