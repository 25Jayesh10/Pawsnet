'use client';

import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { FaTimes } from 'react-icons/fa';

interface QRScannerPopupProps {
  onClose: () => void;
  onScan: (result: string) => void;
}

export default function QRScannerPopup({ onClose, onScan }: QRScannerPopupProps) {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content max-w-md" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">QR Code Scanner</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* QR Scanner */}
        <div className="relative overflow-hidden rounded-lg mb-4">
          <QrReader
            constraints={{ facingMode: 'environment' }}
            onResult={(result, qrError) => {
              if (qrError) {
                setError('Error accessing camera. Please ensure you granted camera permissions.');
              }
              if (result?.getText()) {
                onScan(result.getText());
                onClose();
              }
            }}
            className="w-full"
          />
          <div className="absolute inset-0 border-2 border-indigo-500 pointer-events-none"></div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Position the QR code within the frame to scan. Ensure it is well-lit and clearly visible.
        </p>

        {/* Buttons */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
