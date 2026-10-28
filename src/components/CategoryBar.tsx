import React, { useRef } from 'react';
import { NewsCategory } from '../types/news';
import { Flame, Landmark, MapPin, Building, Vote, ShieldAlert, Film, Trophy, TrendingUp, Cpu, Map } from 'lucide-react';

interface CategoryBarProps {
  selectedCategory: NewsCategory;
  onSelectCategory: (cat: NewsCategory) => void;
}

const CATEGORIES_CONFIG: { id: NewsCategory; label: string; icon: React.ReactNode }[] = [
  { id: 'सभी', label: 'सभी ख़बरें', icon: <Flame className="w-3.5 h-3.5 text-amber-400" /> },
  { id: 'देश', label: 'देश', icon: <Landmark className="w-3.5 h-3.5 text-blue-400" /> },
  { id: 'महाराष्ट्र', label: 'महाराष्ट्र', icon: <MapPin className="w-3.5 h-3.5 text-orange-400" /> },
  { id: 'उत्तर प्रदेश', label: 'उत्तर प्रदेश', icon: <Building className="w-3.5 h-3.5 text-emerald-400" /> },
  { id: 'राजनीति', label: 'राजनीति', icon: <Vote className="w-3.5 h-3.5 text-purple-400" /> },
  { id: 'अपराध', label: 'अपराध', icon: <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> },
  { id: 'मनोरंजन', label: 'मनोरंजन', icon: <Film className="w-3.5 h-3.5 text-pink-400" /> },
  { id: 'खेल', label: 'खेल', icon: <Trophy className="w-3.5 h-3.5 text-yellow-400" /> },
  { id: 'बिजनेस', label: 'बिजनेस', icon: <TrendingUp className="w-3.5 h-3.5 text-cyan-400" /> },
  { id: 'टेक्नोलॉजी', label: 'टेक्नोलॉजी', icon: <Cpu className="w-3.5 h-3.5 text-indigo-400" /> },
  { id: 'स्थानीय समाचार', label: 'स्थानीय समाचार', icon: <Map className="w-3.5 h-3.5 text-teal-400" /> },
];

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative bg-slate-900 border-b border-slate-800 shadow-inner">
      <div
        ref={scrollRef}
        className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {CATEGORIES_CONFIG.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all select-none active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-900/40 ring-1 ring-red-400'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
