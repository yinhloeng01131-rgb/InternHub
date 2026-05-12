import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Check, MessageSquare, Briefcase, Award, Info } from 'lucide-react';
import { Notification } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface NotificationsProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  t: (key: string, params?: any) => string;
}

export const Notifications: React.FC<NotificationsProps> = ({
  notifications,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  t
}) => {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'application': return <Briefcase className="w-5 h-5 text-blue-500" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'achievement': return <Award className="w-5 h-5 text-yellow-500" />;
      default: return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:items-center sm:pt-0"
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-lg">{t('notifications')}</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>{t('noNotifications')}</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${
                    notification.read ? 'bg-white border-gray-100' : 'bg-emerald-50/50 border-emerald-100 shadow-sm'
                  }`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {notification.companyLogo ? (
                        <img 
                          src={notification.companyLogo} 
                          alt={notification.companyName}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-100"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                          {getIcon(notification.type)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`font-bold text-sm truncate ${notification.read ? 'text-gray-900' : 'text-emerald-900'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-0.5">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </span>
                        {notification.companyName && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                              {notification.companyName}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {notifications.length > 0 && unreadCount > 0 && (
          <div className="p-3 border-t bg-gray-50">
            <button
              onClick={onMarkAllAsRead}
              className="w-full py-2 flex items-center justify-center gap-2 text-sm font-bold text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
              {t('markAllRead')}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
