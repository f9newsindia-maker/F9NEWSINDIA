import React, { useState } from 'react';
import { CityWeather } from '../types/news';
import { newsStore } from '../data/newsStore';
import { CloudSun, Wind, Droplets, MapPin, X, ArrowUp, ArrowDown } from 'lucide-react';

interface WeatherWidgetProps {
  onClose?: () => void;
  compact?: boolean;
  onOpenFull?: () => void;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  onClose,
  compact = false,
  onOpenFull,
}) => {
  const weatherList = newsStore.getWeatherList();
  const [selectedCity, setSelectedCity] = useState<CityWeather>(weatherList[0]);

  // Compact bar view (placed near top ticker or header)
  if (compact) {
    return (
      <div
        onClick={onOpenFull}
        className="flex items-center gap-2 px-2.5 py-1 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs cursor-pointer select-none transition-all"
        title="मौसम व वायु गुणवत्ता (AQI) देखें"
      >
        <CloudSun className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="font-bold text-white">{selectedCity.city}:</span>
        <span className="font-extrabold text-amber-300">{selectedCity.temp}°C</span>
        <span className="hidden sm:inline text-slate-400">• AQI:</span>
        <span
          className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
            selectedCity.aqiStatus === 'अच्छा'
              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
              : selectedCity.aqiStatus === 'मध्यम'
              ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
              : 'bg-red-950 text-red-400 border border-red-500/30'
          }`}
        >
          {selectedCity.aqi} ({selectedCity.aqiStatus})
        </span>
      </div>
    );
  }

  // Full Weather & AQI Modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-6 my-auto text-left">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">
              लाइव मौसम एवं वायु गुणवत्ता (Weather & AQI)
            </h3>
            <p className="text-xs text-slate-400">
              भारत के प्रमुख शहरों का रियल-टाइम तापमान एवं प्रदूषण सूचकांक
            </p>
          </div>
        </div>

        {/* City Switcher Tabs */}
        <div className="flex items-center gap-1.5 my-3 overflow-x-auto no-scrollbar py-1">
          {weatherList.map((w) => (
            <button
              key={w.city}
              onClick={() => setSelectedCity(w)}
              className={`px-3 py-1 text-xs font-bold rounded-lg shrink-0 transition-all ${
                selectedCity.city === w.city
                  ? 'bg-red-600 text-white shadow'
                  : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {w.city}
            </button>
          ))}
        </div>

        {/* Active City Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-950 to-blue-950/40 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-red-400 font-bold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedCity.city}</span>
              </div>
              <h4 className="text-3xl font-black text-white">
                {selectedCity.temp}°<span className="text-xl text-slate-400 font-normal">C</span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">{selectedCity.condition}</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-semibold mb-1">
                वायु गुणवत्ता (AQI)
              </span>
              <span
                className={`inline-block px-3 py-1 rounded-xl text-sm font-black shadow-md ${
                  selectedCity.aqiStatus === 'अच्छा'
                    ? 'bg-emerald-600 text-white'
                    : selectedCity.aqiStatus === 'मध्यम'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-red-600 text-white'
                }`}
              >
                {selectedCity.aqi} • {selectedCity.aqiStatus}
              </span>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-xs text-center">
            <div className="p-2 bg-slate-900 rounded-xl">
              <span className="text-[10px] text-slate-400 block">उच्चतम / न्यूनतम</span>
              <span className="font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                <ArrowUp className="w-3 h-3 text-red-400" /> {selectedCity.high}° /
                <ArrowDown className="w-3 h-3 text-blue-400" /> {selectedCity.low}°
              </span>
            </div>
            <div className="p-2 bg-slate-900 rounded-xl">
              <span className="text-[10px] text-slate-400 block">आर्द्रता (Humidity)</span>
              <span className="font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                <Droplets className="w-3 h-3 text-blue-400" /> {selectedCity.humidity}%
              </span>
            </div>
            <div className="p-2 bg-slate-900 rounded-xl">
              <span className="text-[10px] text-slate-400 block">स्थिति</span>
              <span className="font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                <Wind className="w-3 h-3 text-emerald-400" /> अनुकूल
              </span>
            </div>
          </div>
        </div>

        {/* AQI Health Advisory Note */}
        <div className="mt-3 p-3 rounded-xl bg-slate-950 text-slate-300 text-xs border border-slate-800 leading-relaxed">
          <strong>स्वास्थ्य सलाह:</strong>{' '}
          {selectedCity.aqiStatus === 'अच्छा'
            ? 'वायु गुणवत्ता संतोषजनक है। खुली हवा में व्यायाम करना सुरक्षित है।'
            : selectedCity.aqiStatus === 'मध्यम'
            ? 'संवेदनशील व्यक्तियों (बुजुर्गों एवं बच्चों) को धूल-धुएं से बचाव की सलाह दी जाती है।'
            : 'प्रदूषण का स्तर अधिक है। बाहर निकलते समय मास्क का उपयोग करें।'}
        </div>

        {onClose && (
          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl"
            >
              बंद करें
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
