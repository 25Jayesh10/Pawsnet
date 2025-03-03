import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  FaPaw,
  FaCoins,
  FaPlus,
  FaExclamationTriangle,
  FaSearch,
} from 'react-icons/fa';

export default function Dashboard() {
  // Mock data
  const communityStats = {
    servicesDone: 12,
    animalsSaved: 8,
    coinsEarned: 350,
  };

  const userPets = [
    {
      id: 1,
      name: 'Max',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Cat',
      breed: 'Siamese',
      age: 2,
      image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6',
    },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      text: 'Paswnet helped me find my perfect companion. The community is so supportive!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sarah Williams',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      text: "I love how easy it is to track my pet's health records and get reminders for vaccinations.",
      rating: 4,
    },
    {
      id: 3,
      name: 'Michael Brown',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      text: "The community service opportunities have been rewarding. I've helped save several strays in my area.",
      rating: 5,
    },
    {
      id: 4,
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      text: 'Earning community coins while helping animals is such a great concept. Highly recommend!',
      rating: 5,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative py-16 bg-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Welcome to Your Pet Community
              </h1>
              <p className="text-lg mb-6">
                Join our mission to improve the lives of pets and stray animals.
                Every adoption and community service makes a difference.
              </p>
              <Link
                href="/services"
                className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Involved
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative h-64 w-full md:h-80 md:w-80">
                <Image
                  src="https://images.unsplash.com/photo-1450778869180-41d0601e046e"
                  alt="People with pets"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Community Stats Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Your Community Impact
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Community Services Block */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Your Contributions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                      {communityStats.servicesDone}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Community Services
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {communityStats.animalsSaved}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Strays Helped
                    </p>
                  </div>
                </div>
              </div>

              {/* Community Coins Block */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Community Coins</h3>
                <div className="flex items-center justify-center bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg">
                  <FaCoins className="text-yellow-500 text-4xl mr-4" />
                  <div>
                    <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                      {communityStats.coinsEarned}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Coins Earned
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  Use your coins to redeem pet supplies, vet services, and more!
                </p>
                <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium transition-colors">
                  Redeem Coins
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Report Section */}
        <section className="py-12 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Report & Help
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Report Stray Animal Block */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8"
                    alt="Stray animal"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">
                        Report Stray Animal
                      </h3>
                      <p className="mb-4">
                        Help us locate and rescue stray animals in your area
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Spotted a stray animal that needs help? Report the sighting
                    to our rescue team and earn community coins.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-amber-600 dark:text-amber-400">
                      <FaExclamationTriangle className="mr-2" />
                      <span>Urgent help needed</span>
                    </div>
                    <Link
                      href="/services/report-stray"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Report Sighting
                    </Link>
                  </div>
                </div>
              </div>

              {/* Report Lost Pet Block */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e"
                    alt="Lost pet"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">
                        Report Lost Pet
                      </h3>
                      <p className="mb-4">
                        Get community help to find your missing pet
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Lost your pet? Report it immediately to alert our community
                    members in your area to help in the search.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-blue-600 dark:text-blue-400">
                      <FaSearch className="mr-2" />
                      <span>Community search</span>
                    </div>
                    <Link
                      href="/services/lost-pet"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Report Lost Pet
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* My Pets Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">My Pets</h2>
              <Link
                href="/pets/add"
                className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <FaPlus className="mr-2" />
                Add Pet
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={pet.image}
                      alt={pet.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-1">{pet.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {pet.type} • {pet.breed} • {pet.age} years old
                    </p>
                    <Link
                      href={`/pets/${pet.id}`}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}

              <div className="bg-gray-50 dark:bg-gray-600 border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg flex flex-col items-center justify-center p-6">
                <FaPaw className="text-gray-400 dark:text-gray-400 text-4xl mb-3" />
                <p className="text-gray-500 dark:text-gray-300 text-center mb-4">
                  Add another pet to your family
                </p>
                <Link
                  href="/pets/add"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                >
                  Register a Pet
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-12 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">
              What Our Community Says
            </h2>

            <div className="relative overflow-hidden">
              <div className="flex review-scroll space-x-6">
                {/* Double the reviews for continuous scrolling effect */}
                {[...reviews, ...reviews].map((review, index) => (
                  <div
                    key={`${review.id}-${index}`}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-w-[300px] max-w-[300px]"
                  >
                    <div className="flex items-center mb-4">
                      <div className="relative h-12 w-12 mr-4">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < review.rating
                                  ? 'text-yellow-500'
                                  : 'text-gray-300'
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
