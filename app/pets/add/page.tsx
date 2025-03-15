'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient';

export default function AddPetPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    age: '',
    gender: 'Male',
    weight: '',
    description: '',
    vaccinations: {
      rabies: false,
      distemper: false,
      parvo: false,
      other: false,
    },
    image: null as File | null, // Add image property
  });

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      vaccinations: {
        ...prev.vaccinations,
        [name]: checked,
      },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
  
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = null;

      // Upload image if one was selected
      if (formData.image) {
        // Validate file size (max 5MB)
        if (formData.image.size > 5 * 1024 * 1024) {
          alert('Image size must be less than 5MB');
          return;
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(formData.image.type)) {
          alert('Please upload a valid image file (JPEG, PNG, or WebP)');
          return;
        }

        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        // Upload the image
        const { error: uploadError } = await supabase.storage
          .from('pet-images')
          .upload(`public/${fileName}`, formData.image, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Image upload error:', uploadError);
          throw new Error('Failed to upload image');
        }

        // Get the public URL
        const { data } = supabase.storage
          .from('pet-images')
          .getPublicUrl(`public/${fileName}`);
        
        imageUrl = data.publicUrl;
      }

      // Insert the pet data into the database
      const { error: insertError } = await supabase
        .from('pets')
        .insert([{
          name: formData.name,
          type: formData.type,
          breed: formData.breed,
          age: Number(formData.age),
          gender: formData.gender,
          weight: formData.weight ? Number(formData.weight) : null,
          description: formData.description,
          vaccinations: formData.vaccinations,
          image_url: imageUrl,
        }]);

      if (insertError) {
        console.error('Database insert error:', insertError);
        throw new Error('Failed to save pet information');
      }

      router.push('/pets');

    } catch (error) {
      console.error('Error details:', error);
      alert(error instanceof Error ? error.message : 'Failed to register pet. Please try again.');
    }
  };
  

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-8">Register a New Pet</h1>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Pet Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Pet Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Fish">Fish</option>
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
                    Age (years) *
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
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
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Add separate div for image upload */}
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Pet Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Tell us about your pet's personality, likes, dislikes, etc."
                ></textarea>
              </div>

              <div className="mb-8">
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Vaccinations
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rabies"
                      name="rabies"
                      checked={formData.vaccinations.rabies}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="rabies"
                      className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      Rabies
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="distemper"
                      name="distemper"
                      checked={formData.vaccinations.distemper}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="distemper"
                      className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      Distemper
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="parvo"
                      name="parvo"
                      checked={formData.vaccinations.parvo}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="parvo"
                      className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      Parvovirus
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="other"
                      name="other"
                      checked={formData.vaccinations.other}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="other"
                      className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      Other
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.push('/pets')}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Register Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}