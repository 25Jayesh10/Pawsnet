'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaMapMarkerAlt, FaCalendarAlt, FaCamera, FaExclamationTriangle } from 'react-icons/fa';
import { supabase } from '@/lib/supabaseClient';

export default function ReportStrayPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    animalType: 'Dog',
    animalDescription: '',
    condition: 'Healthy',
    sightingDate: '',
    sightingTime: '',
    location: '',
    additionalInfo: '',
    urgencyLevel: 'Medium',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const { error } = await supabase
        .from('stray_reports')
        .insert([{
          animal_type: formData.animalType,
          animal_description: formData.animalDescription,
          condition: formData.condition,
          sighting_date: formData.sightingDate,
          sighting_time: formData.sightingTime || null,
          location: formData.location,
          additional_info: formData.additionalInfo,
          urgency_level: formData.urgencyLevel,
          contact_name: formData.contactName,
          contact_phone: formData.contactPhone,
          contact_email: formData.contactEmail || null
        }]);
  
      if (error) throw error;
  
      // Add to notifications
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      const newNotification = {
        id: Date.now(),
        type: 'stray-animal',
        message: `Stray ${formData.animalType} reported: ${formData.urgencyLevel} urgency at ${formData.location}`,
        time: 'Just now',
        icon: 'FaExclamationTriangle',
        read: false,
        details: formData
      };
      
      notifications.unshift(newNotification);
      localStorage.setItem('notifications', JSON.stringify(notifications));
      
      // Update notification count
      const count = parseInt(localStorage.getItem('notificationCount') || '0') + 1;
      localStorage.setItem('notificationCount', count.toString());
      
      setSubmitSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
  
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-3xl mx-auto px-6">
          {submitSuccess ? (
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 mb-4">
                <FaExclamationTriangle size={32} />
              </div>
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">Report Submitted Successfully!</h2>
              <p className="text-green-700 dark:text-green-400 mb-4">
                Thank you for reporting this stray animal. Our rescue team has been notified and will respond accordingly.
              </p>
              <p className="text-sm text-green-600 dark:text-green-500">
                Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-2">Report a Stray Animal</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Help us locate and rescue stray animals in need. Your report will be sent to our rescue team.
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Animal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="animalType"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Animal Type *
                        </label>
                        <select
                          id="animalType"
                          name="animalType"
                          value={formData.animalType}
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
                          htmlFor="condition"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Animal Condition *
                        </label>
                        <select
                          id="condition"
                          name="condition"
                          value={formData.condition}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="Healthy">Appears Healthy</option>
                          <option value="Minor Injuries">Minor Injuries</option>
                          <option value="Injured">Injured</option>
                          <option value="Critical">Critical Condition</option>
                          <option value="Unknown">Unknown</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="animalDescription"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Animal Description *
                      </label>
                      <textarea
                        id="animalDescription"
                        name="animalDescription"
                        value={formData.animalDescription}
                        onChange={handleChange}
                        rows={3}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Describe the animal (breed, color, size, distinguishing features, behavior, etc.)"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Sighting Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="sightingDate"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Date Seen *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FaCalendarAlt className="text-gray-400" />
                          </div>
                          <input
                            type="date"
                            id="sightingDate"
                            name="sightingDate"
                            value={formData.sightingDate}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="sightingTime"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Time Seen
                        </label>
                        <input
                          type="time"
                          id="sightingTime"
                          name="sightingTime"
                          value={formData.sightingTime}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Location Seen *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FaMapMarkerAlt className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            placeholder="e.g., Behind the grocery store on Main St"
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
                        htmlFor="urgencyLevel"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Urgency Level *
                      </label>
                      <select
                        id="urgencyLevel"
                        name="urgencyLevel"
                        value={formData.urgencyLevel}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="Low">Low - Animal appears fine but needs help</option>
                        <option value="Medium">Medium - Animal needs assistance soon</option>
                        <option value="High">High - Animal needs immediate help</option>
                        <option value="Critical">Critical - Life-threatening situation</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label
                        htmlFor="additionalInfo"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Additional Details
                      </label>
                      <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Any other information that might help (behavior, specific needs, accessibility issues, etc.)"
                      ></textarea>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Upload Photo (if available)
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
                      Your Contact Information
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