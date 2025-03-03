'use client';

import { FaTimes, FaPaw, FaCoins, FaHeart } from 'react-icons/fa';

interface NotificationPopupProps {
  onClose: () => void;
}

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: 'pet',
    message: 'Your pet vaccination reminder: Max is due for a checkup next week.',
    time: '2 hours ago',
    icon: <FaPaw className="text-indigo-500" />
  },
  {
    id: 2,
    type: 'coins',
    message: 'You earned 50 community coins for participating in the weekend cleanup drive!',
    time: '1 day ago',
    icon: <FaCoins className="text-yellow-500" />
  },
  {
    id: 3,
    type: 'adoption',
    message: 'Good news! Your adoption application for Luna has been approved.',
    time: '3 days ago',
    icon: <FaHeart className="text-red-500" />
  }
];

export default function NotificationPopup({ onClose }: NotificationPopupProps) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Notifications</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <FaTimes size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">{notification.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No notifications yet</p>
          )}
        </div>
        
        {notifications.length > 0 && (
          <button 
            className="mt-4 w-full py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            Mark all as read
          </button>
        )}
      </div>
    </div>
  );
}