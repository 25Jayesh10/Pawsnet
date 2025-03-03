'use client';

import { useEffect, useState } from 'react';
import { FaTimes, FaPaw, FaCoins, FaHeart, FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';

interface NotificationPopupProps {
  onClose: () => void;
}

interface Notification {
  id: number;
  type: string;
  message: string;
  time: string;
  icon: string;
  read: boolean;
  details?: any;
}

export default function NotificationPopup({ onClose }: NotificationPopupProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  useEffect(() => {
    // Load notifications from localStorage
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      // Default notifications if none exist
      const defaultNotifications = [
        {
          id: 1,
          type: 'pet',
          message: 'Your pet vaccination reminder: Max is due for a checkup next week.',
          time: '2 hours ago',
          icon: 'FaPaw',
          read: false
        },
        {
          id: 2,
          type: 'coins',
          message: 'You earned 50 community coins for participating in the weekend cleanup drive!',
          time: '1 day ago',
          icon: 'FaCoins',
          read: false
        },
        {
          id: 3,
          type: 'adoption',
          message: 'Good news! Your adoption application for Luna has been approved.',
          time: '3 days ago',
          icon: 'FaHeart',
          read: true
        }
      ];
      setNotifications(defaultNotifications);
      localStorage.setItem('notifications', JSON.stringify(defaultNotifications));
    }
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FaPaw':
        return <FaPaw className="text-indigo-500" />;
      case 'FaCoins':
        return <FaCoins className="text-yellow-500" />;
      case 'FaHeart':
        return <FaHeart className="text-red-500" />;
      case 'FaExclamationTriangle':
        return <FaExclamationTriangle className="text-amber-500" />;
      default:
        return <FaPaw className="text-indigo-500" />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    
    // Update notification count
    const unreadCount = updatedNotifications.filter(n => !n.read).length;
    localStorage.setItem('notificationCount', unreadCount.toString());
    
    // Show notification details
    setSelectedNotification(notification);
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    localStorage.setItem('notificationCount', '0');
  };

  const handleBackToList = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        {selectedNotification ? (
          // Notification detail view
          <div>
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={handleBackToList}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
              >
                ← Back to notifications
              </button>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="mr-3 mt-1">{getIconComponent(selectedNotification.icon)}</div>
                <h2 className="text-xl font-bold">
                  {selectedNotification.type === 'lost-pet' ? 'Lost Pet Report' : 
                   selectedNotification.type === 'stray-animal' ? 'Stray Animal Report' : 
                   'Notification'}
                </h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{selectedNotification.time}</p>
              <p className="text-lg mb-4">{selectedNotification.message}</p>
            </div>
            
            {selectedNotification.type === 'lost-pet' && selectedNotification.details && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Pet Details:</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                    <p>{selectedNotification.details.petName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
                    <p>{selectedNotification.details.petType}</p>
                  </div>
                  {selectedNotification.details.breed && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Breed</p>
                      <p>{selectedNotification.details.breed}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Color/Markings</p>
                    <p>{selectedNotification.details.color}</p>
                  </div>
                </div>
                
                <h3 className="font-semibold mb-3">Last Seen:</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                    <p>{selectedNotification.details.lastSeenDate}</p>
                  </div>
                  {selectedNotification.details.lastSeenTime && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</p>
                      <p>{selectedNotification.details.lastSeenTime}</p>
                    </div>
                  )}
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                    <p>{selectedNotification.details.lastSeenLocation}</p>
                  </div>
                </div>
                
                <h3 className="font-semibold mb-3">Description:</h3>
                <p className="mb-4">{selectedNotification.details.description}</p>
                
                <h3 className="font-semibold mb-3">Contact:</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                    <p>{selectedNotification.details.contactName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                    <p>{selectedNotification.details.contactPhone}</p>
                  </div>
                  {selectedNotification.details.contactEmail && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                      <p>{selectedNotification.details.contactEmail}</p>
                    </div>
                  )}
                  {selectedNotification.details.reward && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Reward</p>
                      <p>{selectedNotification.details.reward}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex justify-center">
                  <Link 
                    href="/services/report-sighting"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    I've Seen This Pet
                  </Link>
                </div>
              </div>
            )}

            {selectedNotification.type === 'stray-animal' && selectedNotification.details && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Animal Details:</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
                    <p>{selectedNotification.details.animalType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Condition</p>
                    <p>{selectedNotification.details.condition}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
                    <p>{selectedNotification.details.animalDescription}</p>
                  </div>
                </div>
                
                <h3 className="font-semibold mb-3">Sighting Information:</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                    <p>{selectedNotification.details.sightingDate}</p>
                  </div>
                  {selectedNotification.details.sightingTime && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</p>
                      <p>{selectedNotification.details.sightingTime}</p>
                    </div>
                  )}
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                    <p>{selectedNotification.details.location}</p>
                  </div>
                </div>
                
                <h3 className="font-semibold mb-3">Urgency Level:</h3>
                <p className={`mb-4 font-medium ${
                  selectedNotification.details.urgencyLevel === 'Critical' ? 'text-red-600 dark:text-red-400' :
                  selectedNotification.details.urgencyLevel === 'High' ? 'text-orange-600 dark:text-orange-400' :
                  selectedNotification.details.urgencyLevel === 'Medium' ? 'text-amber-600 dark:text-amber-400' :
                  'text-green-600 dark:text-green-400'
                }`}>
                  {selectedNotification.details.urgencyLevel}
                </p>
                
                {selectedNotification.details.additionalInfo && (
                  <>
                    <h3 className="font-semibold mb-3">Additional Information:</h3>
                    <p className="mb-4">{selectedNotification.details.additionalInfo}</p>
                  </>
                )}
                
                <h3 className="font-semibold mb-3">Reported By:</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                    <p>{selectedNotification.details.contactName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                    <p>{selectedNotification.details.contactPhone}</p>
                  </div>
                  {selectedNotification.details.contactEmail && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                      <p>{selectedNotification.details.contactEmail}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex justify-center">
                  <Link 
                    href="/services/rescue"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    Volunteer to Help
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Notification list view
          <>
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
                    className={`p-3 border ${notification.read ? 'border-gray-200 dark:border-gray-700' : 'border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20'} rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">{getIconComponent(notification.icon)}</div>
                      <div className="flex-1">
                        <p className={`text-sm ${notification.read ? '' : 'font-semibold'}`}>{notification.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 bg-indigo-600 rounded-full"></div>
                      )}
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
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}