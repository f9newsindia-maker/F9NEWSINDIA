import React, { useState } from 'react';
import { EPaperEdition } from '../types/news';
import { newsStore } from '../data/newsStore';
import {
  Newspaper,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  MapPin,
  X,
  FileText,
} from 'lucide-react';
import { F9Logo } from './F9Logo';

interface EPaperModalProps {
  onClose: () => void;
}

export const EPaperModal: React.FC<EPaperModalProps> = ({ onClose }) => {
  const epapers = newsStore.getEPapers();
  const [selectedEdition, setSelectedEdition] = useState<EPaperEdition>(epapers[0]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const activePageData = selectedEdition.pages.find((p) => p.pageNumber === currentPage) || selectedEdition.pages[0];

  const handleNextPage = () => {
    if (currentPage < selectedEdition.pages.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleShare = () => {
    const text = `F9NEWSINDIA दैनिक ई-अख़बार (${selectedEdition.city} संस्करण - ${selectedEdition.date})\nपृष्ठ ${currentPage}: ${activePageData.title}\n\nपढ़ें: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({ title: 'F9NEWSINDIA E-Paper', text, url: window.location.href }).catch(() => {});
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/95 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col h-[94vh] overflow-hidden my-auto">
        {/* Top Header Bar */}
        <div className="p-3 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 truncate">
            <F9Logo variant="badge" size="sm" />
            <div className="truncate">
              <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2 truncate">
                F9 डिजिटल ई-अख़बार (E-Paper)
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] bg-red-600 text-white rounded font-bold">
                  दैनिक संस्करण
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-red-500" />
                <span>{selectedEdition.date}</span>
                <span>•</span>
                <span>{selectedEdition.editionName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              title="अख़बार शेयर करें"
              className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Edition Switcher & Control Bar */}
        <div className="px-3 py-2 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs">
          {/* Edition City Pills */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-400" /> संस्करण:
            </span>
            {epapers.map((ed) => (
              <button
                key={ed.id}
                onClick={() => {
                  setSelectedEdition(ed);
                  setCurrentPage(1);
                  setZoomLevel(1);
                }}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  selectedEdition.id === ed.id
                    ? 'bg-red-600 text-white shadow'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {ed.city}
              </button>
            ))}
          </div>

          {/* Zoom & Page Nav controls */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden xs:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
                className="p-1 text-slate-300 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1 text-[10px] text-slate-400 font-mono">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.2))}
                className="p-1 text-slate-300 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
                className="p-1 rounded bg-slate-800 disabled:opacity-30 text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-bold text-white px-1.5">
                {currentPage} / {selectedEdition.pages.length}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= selectedEdition.pages.length}
                className="p-1 rounded bg-slate-800 disabled:opacity-30 text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* E-Paper Newspaper Page Viewer (Scrollable / Zoomable) */}
        <div className="flex-1 overflow-auto bg-slate-950 p-3 sm:p-6 flex flex-col items-center justify-start">
          <div
            className="w-full max-w-2xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-300 transition-transform duration-200 origin-top"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Newspaper Masthead */}
            <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white p-3 border-b-2 border-amber-400 flex items-center justify-between">
              <div>
                <span className="text-xl sm:text-2xl font-black italic tracking-tighter">
                  F9 NEWS INDIA
                </span>
                <span className="text-xs font-bold text-amber-200 block">
                  सच की आवाज़ • दैनिक ई-अख़बार
                </span>
              </div>
              <div className="text-right text-[11px] text-slate-100 font-semibold">
                <span>{selectedEdition.city} संस्करण</span>
                <span className="block text-[10px] text-amber-200">{selectedEdition.date}</span>
                <span className="inline-block mt-0.5 px-1.5 py-0.2 bg-black/40 rounded text-[9px]">
                  पृष्ठ संख्या: {currentPage}
                </span>
              </div>
            </div>

            {/* Headline Banner of Page */}
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-300">
              <h4 className="text-xs sm:text-sm font-bold text-red-950 line-clamp-1">
                {activePageData.title}
              </h4>
            </div>

            {/* Newspaper Image/Illustration */}
            <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden">
              <img
                src={activePageData.imageUrl}
                alt={activePageData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="px-2 py-0.5 bg-red-600 text-[10px] font-bold rounded w-fit mb-1">
                  विशेष डिजिटल कवरेज
                </span>
                <h5 className="text-sm sm:text-base font-extrabold leading-tight">
                  {activePageData.title}
                </h5>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  पूरा विस्तृत समाचार पढ़ने और लाइव वीडियो देखने के लिए होम स्क्रीन पर जाएं।
                </p>
              </div>
            </div>

            {/* Newspaper Bottom Footer */}
            <div className="p-3 bg-slate-100 border-t border-slate-300 text-center text-[10px] text-slate-600 font-medium">
              F9NEWSINDIA मीडिया नेटवर्क • सर्वाधिकार सुरक्षित • RNI / Digital Media Approved
            </div>
          </div>
        </div>

        {/* Bottom Page Thumbnails Bar */}
        <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-center gap-2 overflow-x-auto shrink-0">
          {selectedEdition.pages.map((p) => (
            <button
              key={p.pageNumber}
              onClick={() => {
                setCurrentPage(p.pageNumber);
                setZoomLevel(1);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentPage === p.pageNumber
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>पेज {p.pageNumber}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
