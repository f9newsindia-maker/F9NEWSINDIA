import React, { useState } from 'react';
import { PushNotificationItem, NewsArticle } from '../types/news';
import { newsStore } from '../data/newsStore';
import { Bell, Check, Trash2, X, ExternalLink, Flame, ShieldAlert, Trophy, TrendingUp } from 'lucide-react';

interface NotificationCenterModalProps {
  onClose: () => void;
  onSelectArticleById: (id: string) => void;
  onNotificationsChanged: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  onClose,
  onSelectArticleById,
  onNotificationsChanged,
}) => {
  const [notifications, setNotifications] = useState<PushNotificationItem[]>(newsStore.getNotifications());

  const handleItemClick = (item: PushNotificationItem) => {
    newsStore.markNotificationRead(item.id);
    setNotifications([...newsStore.getNotifications()]);
    onNotificationsChanged();
    if (item.articleId) {
      onSelectArticleById(item.articleId);
      onClose();
    }
  };

  const handleClearAll = () => {
    newsStore.clearNotifications();
    setNotifications([]);
    onNotificationsChanged();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-6 my-auto text-left max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-600/20 text-red-500 rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                सूचना केंद्र (Notification Alerts)
              </h3>
              <span className="text-[11px] text-slate-400">
                {notifications.filter((n) => !n.isRead).length} नई सूचनाएं
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                title="सभी हटाएं"
                className="p-1.5 text-slate-400 hover:text-red-400 text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">साफ़ करें</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List of Alerts */}
        <div className="my-3 space-y-2.5 overflow-y-auto flex-1 pr-1">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs space-y-2">
              <Bell className="w-10 h-10 mx-auto text-slate-600" />
              <p className="font-semibold text-slate-400">कोई नई सूचना उपलब्ध नहीं है</p>
              <p className="text-[11px]">सभी ब्रेकिंग और महत्वपूर्ण अलर्ट्स यहां दिखाई देंगे।</p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                  !item.isRead
                    ? 'bg-slate-950 border-red-500/40 hover:border-red-500'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-950'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 animate-ping" />
                    )}
                    <span className="px-2 py-0.5 bg-red-950 text-red-400 text-[10px] font-bold rounded">
                      {item.category}
                    </span>
                    <span className="font-bold text-white text-xs">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{item.timeAgo}</span>
                </div>

                <p className="text-slate-300 leading-relaxed mt-1 font-normal">
                  {item.message}
                </p>

                {item.articleId && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-blue-400 font-semibold mt-2 hover:underline">
                    <span>खबर पढ़ें</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 text-center shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
};
