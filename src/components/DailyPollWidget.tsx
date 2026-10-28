import React, { useState } from 'react';
import { DailyPoll } from '../types/news';
import { newsStore } from '../data/newsStore';
import { BarChart2, CheckCircle2, Users, Clock, Share2 } from 'lucide-react';

interface DailyPollWidgetProps {
  onPollUpdated?: () => void;
}

export const DailyPollWidget: React.FC<DailyPollWidgetProps> = ({ onPollUpdated }) => {
  const [poll, setPoll] = useState<DailyPoll>(newsStore.getPoll());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const hasVoted = !!poll.userVotedOptionId;

  const handleVote = () => {
    if (!selectedOption || hasVoted) return;
    const updated = newsStore.votePoll(selectedOption);
    setPoll({ ...updated });
    if (onPollUpdated) onPollUpdated();
  };

  const handleSharePoll = () => {
    const text = `F9NEWSINDIA दैनिक जनमत (Poll of the Day):\n"${poll.question}"\n\nअपनी राय दर्ज करें: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({ title: 'F9NEWSINDIA जनमत', text, url: window.location.href }).catch(() => {});
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div className="mx-3 my-4 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-600/20 text-red-400">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold text-white">
              आज का जनमत संग्रह (Poll of the Day)
            </h3>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" /> समाप्त: {poll.endsAt}
            </span>
          </div>
        </div>

        <button
          onClick={handleSharePoll}
          title="पोल शेयर करें"
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Poll Question */}
      <h4 className="text-sm font-bold text-white mt-3 mb-3 leading-snug">
        {poll.question}
      </h4>

      {/* Options List */}
      <div className="space-y-2.5">
        {poll.options.map((option) => {
          const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
          const isSelected = selectedOption === option.id;
          const isVotedChoice = poll.userVotedOptionId === option.id;

          return (
            <div
              key={option.id}
              onClick={() => {
                if (!hasVoted) setSelectedOption(option.id);
              }}
              className={`relative overflow-hidden p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                hasVoted
                  ? isVotedChoice
                    ? 'border-emerald-500 bg-slate-950/80'
                    : 'border-slate-800 bg-slate-950/40'
                  : isSelected
                  ? 'border-red-500 bg-red-950/30'
                  : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
              }`}
            >
              {/* Progress fill bar if voted */}
              {hasVoted && (
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-700 ${
                    isVotedChoice ? 'bg-emerald-600/25' : 'bg-slate-800/40'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative z-10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      hasVoted
                        ? isVotedChoice
                          ? 'border-emerald-400 bg-emerald-500'
                          : 'border-slate-600'
                        : isSelected
                        ? 'border-red-500 bg-red-600'
                        : 'border-slate-600'
                    }`}
                  >
                    {(isVotedChoice || (!hasVoted && isSelected)) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </span>
                  <span className={`font-semibold ${isVotedChoice ? 'text-emerald-300' : 'text-slate-200'}`}>
                    {option.text}
                  </span>
                </div>

                {hasVoted && (
                  <span className="font-extrabold text-white text-xs shrink-0">
                    {percentage}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer & Submit */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1 text-[11px]">
          <Users className="w-3.5 h-3.5 text-blue-400" />
          कुल मत: {poll.totalVotes.toLocaleString('hi-IN')}
        </span>

        {!hasVoted ? (
          <button
            onClick={handleVote}
            disabled={!selectedOption}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-bold rounded-lg shadow transition-all active:scale-95"
          >
            वोट दें (Submit Vote)
          </button>
        ) : (
          <span className="flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" /> आपकी राय दर्ज कर ली गई है
          </span>
        )}
      </div>
    </div>
  );
};
