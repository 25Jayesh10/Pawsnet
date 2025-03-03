import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaPlus } from 'react-icons/fa';

export default function PetsPage() {
  // Mock data for pets
  const pets = [
    {
      id: 1,
      name: 'Max',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
      description: 'Max is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks.',
      vaccinations: ['Rabies', 'DHPP', 'Bordetella'],
      nextCheckup: '2023-12-15'
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Cat',
      breed: 'Siamese',
      age: 2,
      image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6',
      description: 'Luna is a curious and affectionate Siamese cat who enjoys lounging in sunny spots and playing with string toys.',
      vaccinations: ['Rabies', 'FVRCP', 'FeLV'],
      nextCheckup: '2023-11-20'
    }
  ];

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Pets</h1>
            <Link 
              href="/pets/add" 
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaPlus className="mr-2" />
              Add Pet
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pets.map((pet) => (
              <div key={pet.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <Image 
                      src={pet.image} 
                      alt={pet.name} 
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h2 className="text-2xl font-bold mb-2">{pet.name}</h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-sm">
                        {pet.type}
                      </span>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                        {pet.breed}
                      </span>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                        {pet.age} years old
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{pet.description}</p>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Vaccinations</h3>
                      <div className="flex flex-wrap gap-2">
                        {pet.vaccinations.map((vaccine, index) => (
                          <span key={index} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                            {vaccine}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Next checkup: </span>
                        <span className="font-medium">{new Date(pet.nextCheckup).toLocaleDateString()}</span>
                      </div>
                      <Link 
                        href={`/pets/${pet.id}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {pets.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">You don't have any pets registered yet</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Register your pets to keep track of their health records, vaccinations, and more.
              </p>
              <Link 
                href="/pets/add" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Register Your First Pet
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}