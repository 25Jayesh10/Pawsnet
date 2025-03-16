'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaTimes, FaPaw, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheck, FaTimes as FaCancel } from 'react-icons/fa';
import { FaUser, FaCamera } from 'react-icons/fa';
import { useRef } from 'react';
interface EditableFieldProps {
  label: string;
  value: string;
  name: keyof Omit<UserData, 'pets' | 'avatar'>;
  type?: string;
  isEditing: boolean;
  onChange: (value: string) => void;
}

// Create EditableField as a separate component
const EditableField = ({ label, value, name, type = 'text', isEditing, onChange }: EditableFieldProps) => {
  return (
    <div className="flex items-center space-x-3 w-full">
      {!isEditing ? (
        <UserInfoItem
          icon={
            name === 'email' ? FaEnvelope :
            name === 'phone' ? FaPhone :
            name === 'address' ? FaMapMarkerAlt :
            FaUser
          }
          text={value}
        />
      ) : (
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
          />
        </div>
      )}
    </div>
  );
};


interface ProfilePopupProps {
  onClose: () => void;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  pets: Array<{
    id: number;
    name: string;
    type: string;
    breed: string;
    age: number;
  }>;
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
  const [originalData, setOriginalData] = useState<UserData | null>(null);
  
  // Modify the editing state handler
  const handleStartEditing = () => {
    setOriginalData(userData); // Backup current data
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (originalData) {
      setUserData(originalData); // Restore original data
    }
    setIsEditing(false);
    setOriginalData(null);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    pets: [
      { id: 1, name: 'Max', type: 'Dog', breed: 'Golden Retriever', age: 3 },
      { id: 2, name: 'Luna', type: 'Cat', breed: 'Siamese', age: 2 },
    ],
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData(prev => ({
        ...prev,
        avatar: imageUrl
      }));
    }
  };

  const handleSave = async () => {
    try {
      // TODO: Add API call to save user data
      // const response = await updateUserProfile(userData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleFieldChange = (field: keyof Omit<UserData, 'pets' | 'avatar'>) => (value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
            src={userData.avatar}
            alt={userData.name}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
            priority
          />
          {isEditing && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
              <button 
                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <FaCamera size={16} />
              </button>
            </>
            )}
            </div>
          {isEditing ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
              className="text-xl font-semibold text-center border-b border-gray-300 dark:border-gray-600 
                       focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
            />
          ) : (
            <h3 className="text-xl font-semibold">{userData.name}</h3>
          )}
        </div>

        {/* Contact Information */}
    <div className="space-y-3 mb-6">
      <EditableField 
        label="Email" 
        value={userData.email} 
        name="email" 
        type="email" 
        isEditing={isEditing}
        onChange={handleFieldChange('email')}
      />
      <EditableField 
        label="Phone" 
        value={userData.phone} 
        name="phone" 
        type="tel" 
        isEditing={isEditing}
        onChange={handleFieldChange('phone')}
      />
      <EditableField 
        label="Address" 
        value={userData.address} 
        name="address" 
        isEditing={isEditing}
        onChange={handleFieldChange('address')}
      />
    </div>

        {/* Pets Section */}
        <div>
          <h4 className="text-lg font-semibold mb-3 flex items-center">
            <FaPaw className="mr-2 text-indigo-500" />
            My Pets
          </h4>
          <div className="space-y-3">
            {userData.pets.map((pet) => (
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
      {isEditing ? (
        <>
          <button
            onClick={handleCancel}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800"
          >
            <FaCancel className="mr-2" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center text-green-600 hover:text-green-800"
          >
            <FaCheck className="mr-2" />
            Save Changes
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleStartEditing}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800"
          >
            Edit Profile
          </button>
          <button className="text-red-600 hover:text-red-800">
            Sign Out
          </button>
        </>
      )}
    </div>
      </div>
    </div>
  );
}