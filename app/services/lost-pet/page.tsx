'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaMapMarkerAlt, FaCalendarAlt, FaCamera, FaPaw } from 'react-icons/fa';

export default function LostPetReportPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    petName: '',
    petType: 'Dog',
    breed: '',
    age: '',
    gender: 'Male',
    color: '',
    lastSeenDate: '',
    lastSeenTime: '',
    lastSeenLocation: '',
    description: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    reward: '',
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send this data to your backend
      console.log('Lost pet report submitted:', formData);
      
      // Add to local storage to simulate database
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      const newNotification = {
        id: Date.now(),
        type: 'lost-pet',
        message: `URGENT: Lost ${formData.petType} - ${formData.petName} was last seen at ${formData.lastSeenLocation} on ${formData.lastSeenDate}`,
        time: 'Just now',
        icon: 'FaPaw',
        read: false,
        details: formData
      };
      
      notifications.unshift(newNotification);
      localStorage.setItem('notifications', JSON.stringify(notifications));
      
      // Update notification count in local storage
      const count = parseInt(localStorage.getItem('notificationCount') || '0') + 1;
      localStorage.setItem('notificationCount', count.toString());
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }, 1500);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-3xl mx-auto px-6">
          {submitSuccess ? (
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 mb-4">
                <FaPaw size={32} />
              </div>
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">Report Submitted Successfully!</h2>
              <p className="text-green-700 dark:text-green-400 mb-4">
                Your lost pet report has been submitted. The community will be notified to help find your pet.
              </p>
              <p className="text-sm text-green-600 dark:text-green-500">
                Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-2">Report a Lost Pet</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Fill out this form with as much detail as possible to help the community find your pet.
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Pet Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="petName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Pet Name *
                        </label>
                        <input
                          type="text"
                          id="petName"
                          name="petName"
                          value={formData.petName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="petType"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Pet Type *
                        </label>
                        <select
                          id="petType"
                          name="petType"
                          value={formData.petType}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="Dog">Dog</option>
                          <option value="Cat">Cat</option>
                          <option value="Bird">Bird</option>
                          <option value="Small Animal">Small Animal</option>
                          <option value="Reptile">Reptile</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="breed"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Breed
                        </label>
                        <input
                          type="text"
                          id="breed"
                          name="breed"
                          value={formData.breed}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="age"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Age (years)
                        </label>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          min="0"
                          step="0.1"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="gender"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Gender
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Unknown">Unknown</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="color"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Color/Markings *
                        </label>
                        <input
                          type="text"
                          id="color"
                          name="color"
                          value={formData.color}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                          placeholder="e.g., Black with white chest"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Last Seen Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="lastSeenDate"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Date Last Seen *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FaCalendarAlt className="text-gray-400" />
                          </div>
                          <input
                            type="date"
                            id="lastSeenDate"
                            name="lastSeenDate"
                            value={formData.lastSeenDate}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="lastSeenTime"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Time Last Seen
                        </label>
                        <input
                          type="time"
                          id="lastSeenTime"
                          name="lastSeenTime"
                          value={formData.lastSeenTime}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label
                          htmlFor="lastSeenLocation"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Location Last Seen *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FaMapMarkerAlt className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="lastSeenLocation"
                            name="lastSeenLocation"
                            value={formData.lastSeenLocation}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            placeholder="e.g., Central Park, near the lake"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Additional Information
                    </h2>
                    
                    <div className="mb-6">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Description/Distinguishing Features *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Include any distinguishing features, behavior, collar details, microchip information, etc."
                      ></textarea>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Upload Pet Photo
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          <FaCamera className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600 dark:text-gray-400">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none"
                            >
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Contact Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="contactName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="contactName"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contactPhone"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="contactPhone"
                          name="contactPhone"
                          value={formData.contactPhone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contactEmail"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="contactEmail"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="reward"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Reward (if any)
                        </label>
                        <input
                          type="text"
                          id="reward"
                          name="reward"
                          value={formData.reward}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                          placeholder="e.g., $100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => router.push('/dashboard')}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}