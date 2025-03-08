'use client';

import Image from 'next/image';
import { FaTimes, FaPaw, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

interface ProfilePopupProps {
  onClose: () => void;
}

// Mock user data
const user = {
  name: 'Jane Cooper',
  email: 'jane.cooper@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, Anytown, USA',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  pets: [
    { id: 1, name: 'Max', type: 'Dog', breed: 'Golden Retriever', age: 3 },
    { id: 2, name: 'Luna', type: 'Cat', breed: 'Siamese', age: 2 },
  ],
};

// Reusable component for displaying user info items
const UserInfoItem = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <div className="flex items-center space-x-3">
    <Icon className="text-gray-500" />
    <span>{text}</span>
  </div>
);

export default function ProfilePopup({ onClose }: ProfilePopupProps) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Profile</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative h-24 w-24 mb-4">
            <Image
              src={user.avatar}
              alt={user.name}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
              priority
            />
          </div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-6">
          <UserInfoItem icon={FaEnvelope} text={user.email} />
          <UserInfoItem icon={FaPhone} text={user.phone} />
          <UserInfoItem icon={FaMapMarkerAlt} text={user.address} />
        </div>

        {/* Pets Section */}
        <div>
          <h4 className="text-lg font-semibold mb-3 flex items-center">
            <FaPaw className="mr-2 text-indigo-500" />
            My Pets
          </h4>
          <div className="space-y-3">
            {user.pets.map((pet) => (
              <div key={pet.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h5 className="font-medium">{pet.name}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {pet.type} • {pet.breed} • {pet.age} years old
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-6">
          <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
            Edit Profile
          </button>
          <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}