'use client';

import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { FaTimes, FaQrcode } from 'react-icons/fa';

interface QRScannerPopupProps {
  onClose: () => void;
  onScan: (result: string) => void;
}

export default function QRScannerPopup({
  onClose,
  onScan,
}: QRScannerPopupProps) {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = (result: any) => {
    if (result) {
      const scannedData = result?.text;
      setScanResult(scannedData);
      onScan(scannedData);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    setError(
      'Error accessing camera. Please make sure you have granted camera permissions.'
    );
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-content max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">QR Code Scanner</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {error ? (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg mb-4">
            {error}
          </div>
        ) : null}

        <div className="mb-4">
          <div className="relative overflow-hidden rounded-lg">
            <QrReader
              constraints={{ facingMode: 'environment' }}
              onResult={handleScan}
              scanDelay={500}
              className="w-full"
              videoStyle={{ objectFit: 'cover' }}
            />
            <div className="absolute inset-0 border-2 border-indigo-500 pointer-events-none"></div>
          </div>
        </div>

        {scanResult && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Scan Result:</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg break-all">
              {scanResult}
            </div>
          </div>
        )}

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Position the QR code within the frame to scan. Make sure the code is
          well-lit and clearly visible.
        </p>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          {scanResult && (
            <button
              onClick={() => {
                // Here you would typically handle the scanned result
                // For example, navigate to the URL or process the data
                onClose();
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Use This Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
