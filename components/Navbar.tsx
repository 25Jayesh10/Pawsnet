'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBell, FaUser, FaBars, FaTimes, FaQrcode } from 'react-icons/fa';
import NotificationPopup from './NotificationPopup';
import ProfilePopup from './ProfilePopup';
import QRScannerPopup from './QRScannerPopup';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Load notification count from localStorage
    const storedCount = localStorage.getItem('notificationCount');
    if (storedCount) {
      setNotificationCount(parseInt(storedCount));
    } else {
      // Default count if none exists
      setNotificationCount(3);
      localStorage.setItem('notificationCount', '3');
    }

    // Set up event listener for storage changes
    const handleStorageChange = () => {
      const updatedCount = localStorage.getItem('notificationCount');
      if (updatedCount) {
        setNotificationCount(parseInt(updatedCount));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes every 2 seconds (for same-tab updates)
    const interval = setInterval(() => {
      const updatedCount = localStorage.getItem('notificationCount');
      if (updatedCount) {
        setNotificationCount(parseInt(updatedCount));
      }
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleQRScan = (result: string) => {
    setScanResult(result);
    // You can add additional logic here to handle the QR code result
    console.log('QR Code scanned:', result);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (showProfile) setShowProfile(false);
    if (showQRScanner) setShowQRScanner(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/dashboard" className="flex items-center">
            <div className="relative h-10 w-10 mr-2">
              <Image
                src="https://images.unsplash.com/photo-1560807707-8cc77767d783"
                alt="Paswnet Logo"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                unoptimized
              />
            </div>
            <span className="text-xl font-bold text-indigo-600">Paswnet</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/dashboard"
            className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Dashboard
          </Link>
          <Link
            href="/pets"
            className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            My Pets
          </Link>
          <Link
            href="/community"
            className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Community
          </Link>
          <Link
            href="/services"
            className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Services
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* QR Scanner Button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowQRScanner(!showQRScanner);
                if (showNotifications) setShowNotifications(false);
                if (showProfile) setShowProfile(false);
              }}
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 p-2"
              aria-label="Scan QR Code"
            >
              <FaQrcode size={20} />
            </button>

            {showQRScanner && (
              <QRScannerPopup
                onClose={() => setShowQRScanner(false)}
                onScan={handleQRScan}
              />
            )}
          </div>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 p-2"
              aria-label="Notifications"
            >
              <FaBell size={20} />
              {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span>
              )}
            </button>

            {showNotifications && (
              <NotificationPopup onClose={() => setShowNotifications(false)} />
            )}
          </div>

          {/* Profile Button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                if (showNotifications) setShowNotifications(false);
                if (showQRScanner) setShowQRScanner(false);
              }}
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 p-2"
              aria-label="User Profile"
            >
              <FaUser size={20} />
            </button>

            {showProfile && (
              <ProfilePopup onClose={() => setShowProfile(false)} />
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col space-y-4 px-4">
            <Link
              href="/dashboard"
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/pets"
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Pets
            </Link>
            <Link
              href="/community"
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              href="/services"
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
          </div>
        </div>
      )}

      {/* Display scan result if available */}
      {scanResult && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-xs z-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">QR Code Scanned</h3>
            <button
              onClick={() => setScanResult(null)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <FaTimes size={16} />
            </button>
          </div>
          <p className="text-sm break-all">{scanResult}</p>
        </div>
      )}
    </nav>
  );
}