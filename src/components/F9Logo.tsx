import React from 'react';

interface F9LogoProps {
  variant?: 'horizontal' | 'badge' | 'stacked' | 'splash';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export const F9Logo: React.FC<F9LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showTagline = true,
}) => {
  if (variant === 'badge') {
    const badgeSizes = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-11 h-11 text-base',
      lg: 'w-16 h-16 text-2xl',
      xl: 'w-24 h-24 text-4xl',
    };

    return (
      <div
        className={`relative inline-flex items-center justify-center font-black rounded-xl overflow-hidden shadow-lg select-none ${badgeSizes[size]} ${className}`}
        style={{
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)',
          border: '1.5px solid rgba(255, 255, 255, 0.25)',
        }}
      >
        {/* Blue diagonal slice on right edge */}
        <div
          className="absolute -right-2 top-0 bottom-0 w-1/3 bg-gradient-to-b from-blue-600 to-blue-900 -skew-x-12 opacity-90"
        />
        {/* Golden bottom accent */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-amber-400" />

        <div className="relative z-10 flex items-center tracking-tighter text-white font-extrabold italic drop-shadow-md">
          <span className="text-white">F</span>
          <span className="text-amber-200">9</span>
        </div>
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center select-none ${className}`}>
        <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 via-red-700 to-red-950 shadow-2xl border-2 border-red-500/30 overflow-hidden">
          <div className="absolute -right-3 top-0 bottom-0 w-7 bg-blue-600 -skew-x-12" />
          <div className="absolute bottom-0 inset-x-0 h-1.5 bg-amber-400" />
          <span className="relative z-10 text-4xl font-black italic tracking-tighter text-white drop-shadow">
            F<span className="text-amber-200">9</span>
          </span>
        </div>
        <div className="mt-2 text-center">
          <span className="block text-xl font-black tracking-wider text-white">
            NEWS <span className="text-blue-500">INDIA</span>
          </span>
          {showTagline && (
            <span className="inline-block px-2.5 py-0.5 mt-1 text-xs font-bold text-white bg-red-600 rounded shadow-sm tracking-wide">
              सच की आवाज़
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'splash') {
    return (
      <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
        <div className="relative flex items-center justify-center w-28 h-28 rounded-3xl bg-gradient-to-tr from-slate-950 via-red-700 to-red-600 shadow-2xl border-2 border-red-400/30 overflow-hidden mb-4">
          <div className="absolute -right-4 top-0 bottom-0 w-10 bg-gradient-to-b from-blue-500 to-blue-800 -skew-x-12" />
          <div className="absolute bottom-0 inset-x-0 h-2 bg-amber-400" />
          <span className="relative z-10 text-6xl font-black italic tracking-tighter text-white drop-shadow-lg">
            F<span className="text-amber-300">9</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black tracking-tight text-white">
            F9 NEWS <span className="px-2 py-0.5 text-2xl font-black text-white bg-blue-600 rounded">INDIA</span>
          </span>
        </div>
        {showTagline && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-red-600 to-red-700 border border-red-400/30 shadow-md">
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
            <span className="text-sm font-bold text-white tracking-widest">
              सच की आवाज़
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default: Horizontal Header Logo
  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const badgeSize = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
    xl: 'w-14 h-14 text-xl',
  };

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Icon Badge */}
      <div
        className={`relative flex items-center justify-center font-black rounded-lg overflow-hidden shadow-md shrink-0 ${badgeSize[size]}`}
        style={{
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="absolute -right-2 top-0 bottom-0 w-2.5 bg-blue-600 -skew-x-12" />
        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-amber-400" />
        <span className="relative z-10 italic text-white font-black tracking-tighter">
          F<span className="text-amber-200">9</span>
        </span>
      </div>

      {/* Brand Text & Tagline */}
      <div className="flex flex-col leading-none">
        <div className={`flex items-center font-black tracking-tight ${textSizes[size]}`}>
          <span className="text-white">F9 NEWS</span>
          <span className="ml-1 px-1.5 py-0.5 text-[0.65em] font-extrabold text-white bg-blue-600 rounded">
            INDIA
          </span>
        </div>
        {showTagline && (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[10px] font-bold text-red-400 tracking-wider">
              सच की आवाज़
            </span>
            <span className="text-[9px] text-slate-400">• डिजिटल न्यूज़</span>
          </div>
        )}
      </div>
    </div>
  );
};
