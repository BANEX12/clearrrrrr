import React from 'react';
import { Bell, X } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'New Search Result',
    message: 'Found 3 new matches for your recent search.',
    time: '2 mins ago',
    unread: true,
  },
  {
    id: 2,
    title: 'System Update',
    message: 'New features have been added to the platform.',
    time: '1 hour ago',
    unread: false,
  },
  {
    id: 3,
    title: 'Security Alert',
    message: 'Unusual activity detected on your account.',
    time: '2 hours ago',
    unread: true,
  },
];

export function NotificationCenter() {
  return (
    <div className="absolute right-0 mt-2 w-80 glass rounded-xl shadow-lg z-50">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell size={16} />
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <button className="text-gray-400 hover:text-white">
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-white/10 ${
              notification.unread ? 'bg-white/5' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              {notification.unread && (
                <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full" />
              )}
              <div>
                <h4 className="font-medium">{notification.title}</h4>
                <p className="text-sm text-gray-400">{notification.message}</p>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-white/10">
        <button className="w-full text-center text-sm text-blue-400 hover:text-blue-300">
          Mark all as read
        </button>
      </div>
    </div>
  );
}