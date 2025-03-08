'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { FaTimes, FaPaw, FaCoins, FaHeart, FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';

interface Notification {
  id: number;
  type: string;
  message: string;
  time: string;
  icon: keyof typeof iconMap;
  read: boolean;
  details?: any;
}

interface NotificationPopupProps {
  onClose: () => void;
}

const iconMap = {
  FaPaw: <FaPaw className="text-indigo-500" />,
  FaCoins: <FaCoins className="text-yellow-500" />,
  FaHeart: <FaHeart className="text-red-500" />,
  FaExclamationTriangle: <FaExclamationTriangle className="text-amber-500" />,
};

const defaultNotifications: Notification[] = [
  { id: 1, type: 'pet', message: 'Your pet vaccination reminder: Max is due for a checkup next week.', time: '2 hours ago', icon: 'FaPaw', read: false },
  { id: 2, type: 'coins', message: 'You earned 50 community coins for participating in the weekend cleanup drive!', time: '1 day ago', icon: 'FaCoins', read: false },
  { id: 3, type: 'adoption', message: 'Good news! Your adoption application for Luna has been approved.', time: '3 days ago', icon: 'FaHeart', read: true },
];

export default function NotificationPopup({ onClose }: NotificationPopupProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    setNotifications(storedNotifications ? JSON.parse(storedNotifications) : defaultNotifications);
  }, []);

  const updateNotifications = useCallback((updated: Notification[]) => {
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
    localStorage.setItem('notificationCount', updated.filter(n => !n.read).length.toString());
  }, []);

  const handleNotificationClick = useCallback((notification: Notification) => {
    if (!notification.read) {
      const updatedNotifications = notifications.map(n =>
        n.id === notification.id ? { ...n, read: true } : n
      );
      updateNotifications(updatedNotifications);
    }
    setSelectedNotification(notification);
  }, [notifications, updateNotifications]);

  const handleMarkAllAsRead = useCallback(() => {
    updateNotifications(notifications.map(n => ({ ...n, read: true })));
  }, [notifications, updateNotifications]);

  const getIconComponent = useMemo(() => (iconName: keyof typeof iconMap) => iconMap[iconName] || iconMap.FaPaw, []);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        {selectedNotification ? (
          <NotificationDetail notification={selectedNotification} onBack={() => setSelectedNotification(null)} onClose={onClose} getIconComponent={getIconComponent} />
        ) : (
          <NotificationList notifications={notifications} onClick={handleNotificationClick} onClose={onClose} onMarkAllAsRead={handleMarkAllAsRead} getIconComponent={getIconComponent} />
        )}
      </div>
    </div>
  );
}

const NotificationList = ({ notifications, onClick, onClose, onMarkAllAsRead, getIconComponent }: { notifications: Notification[], onClick: (n: Notification) => void, onClose: () => void, onMarkAllAsRead: () => void, getIconComponent: (iconName: keyof typeof iconMap) => JSX.Element }) => (
  <>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Notifications</h2>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
        <FaTimes size={20} />
      </button>
    </div>
    <div className="space-y-4">
      {notifications.length ? (
        notifications.map(notification => (
          <div key={notification.id} className={`p-3 border ${notification.read ? 'border-gray-200 dark:border-gray-700' : 'border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20'} rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer`} onClick={() => onClick(notification)}>
            <div className="flex items-start">
              <div className="mr-3 mt-1">{getIconComponent(notification.icon)}</div>
              <div className="flex-1">
                <p className={`text-sm ${notification.read ? '' : 'font-semibold'}`}>{notification.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
              </div>
              {!notification.read && <div className="h-2 w-2 bg-indigo-600 rounded-full"></div>}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">No notifications yet</p>
      )}
    </div>
    {notifications.length > 0 && (
      <button className="mt-4 w-full py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300" onClick={onMarkAllAsRead}>
        Mark all as read
      </button>
    )}
  </>
);

const NotificationDetail = ({ notification, onBack, onClose, getIconComponent }: { notification: Notification, onBack: () => void, onClose: () => void, getIconComponent: (iconName: keyof typeof iconMap) => JSX.Element }) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <button onClick={onBack} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center">
        ← Back to notifications
      </button>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
        <FaTimes size={20} />
      </button>
    </div>
    <div className="mb-6">
      <div className="flex items-center mb-3">
        <div className="mr-3 mt-1">{getIconComponent(notification.icon)}</div>
        <h2 className="text-xl font-bold">{notification.type.replace('-', ' ')}</h2>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{notification.time}</p>
      <p className="text-lg mb-4">{notification.message}</p>
    </div>
    {notification.details && (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Details:</h3>
        {Object.entries(notification.details).map(([key, value]) => (
          <div key={key} className="mb-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
            <p>{String(value)}</p>
          </div>
        ))}
      </div>
    )}
    {notification.type === 'lost-pet' && (
      <div className="mt-4 flex justify-center">
        <Link href="/services/report-sighting" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors" onClick={onClose}>
          I've Seen This Pet
        </Link>
      </div>
    )}
  </div>
);