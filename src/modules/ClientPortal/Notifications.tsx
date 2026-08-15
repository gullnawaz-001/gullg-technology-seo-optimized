import { useState } from 'react';
import { notificationsMock } from '../../data';
import { Notification } from '../../types';
import { Bell, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(notificationsMock);
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-700"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 z-50 overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h4 className="font-bold text-slate-900">Notifications</h4>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="text-xs font-semibold text-slate-500 hover:text-slate-900">
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(n => (
                    <div 
                      key={n.id} 
                      className={`p-4 border-b border-slate-50 flex gap-3 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-blue-50/50' : ''}`}
                    >
                      <div className="flex-1">
                        <p className={`text-sm ${!n.read ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>{n.message}</p>
                        <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wider">{new Date(n.timestamp).toLocaleString()}</p>
                      </div>
                      {!n.read && (
                        <button onClick={() => markAsRead(n.id)} className="text-blue-500 hover:text-blue-700 shrink-0">
                          <Check size={16} />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    No notifications
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
