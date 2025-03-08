import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaHandHoldingHeart, FaCoins, FaPaw, FaClinicMedical, FaHome, FaGraduationCap } from 'react-icons/fa';

export default function ServicesPage() {
  // Mock data for services
  const services = [
    {
      id: 1,
      title: 'Stray Animal Rescue',
      icon: <FaHandHoldingHeart className="text-4xl text-indigo-600 dark:text-indigo-400 mb-4" />,
      description: 'Report stray animals in need or volunteer to help with rescue operations in your area.',
      coinReward: 50,
      link: '/services/rescue'
    },
    {
      id: 2,
      title: 'Pet Adoption',
      icon: <FaPaw className="text-4xl text-indigo-600 dark:text-indigo-400 mb-4" />,
      description: 'Find your perfect companion from our database of rescued animals looking for forever homes.',
      coinReward: 100,
      link: '/services/adoption'
    },
    {
      id: 3,
      title: 'Veterinary Services',
      icon: <FaClinicMedical className="text-4xl text-indigo-600 dark:text-indigo-400 mb-4" />,
      description: 'Access discounted veterinary care for your pets and help provide medical care for strays.',
      coinReward: 30,
      link: '/services/veterinary'
    },
    {
      id: 4,
      title: 'Foster Program',
      icon: <FaHome className="text-4xl text-indigo-600 dark:text-indigo-400 mb-4" />,
      description: 'Temporarily house animals in need until they find their permanent homes.',
      coinReward: 80,
      link: '/services/foster'
    },
    {
      id: 5,
      title: 'Pet Education',
      icon: <FaGraduationCap className="text-4xl text-indigo-600 dark:text-indigo-400 mb-4" />,
      description: 'Learn about proper pet care, training, and behavior through our workshops and resources.',
      coinReward: 20,
      link: '/services/education'
    },
    {
      id: 6,
      title: 'Community Coins',
      icon: <FaCoins className="text-4xl text-yellow-500 mb-4" />,
      description: 'Earn and redeem community coins for various pet services and products.',
      coinReward: null,
      link: '/services/coins'
    }
  ];

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-indigo-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              Discover how you can contribute to animal welfare while earning community coins. 
              Our services are designed to help both pets and stray animals.
            </p>
          </div>
        </section>
        
        {/* Services Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  {service.icon}
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                  
                  {service.coinReward && (
                    <div className="flex items-center justify-center mb-4 text-yellow-600 dark:text-yellow-400">
                      <FaCoins className="mr-2" />
                      <span>Earn {service.coinReward} community coins</span>
                    </div>
                  )}
                  
                  <Link 
                    href={service.link}
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-12 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Choose a Service</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Browse our available services and select the one that matches your interests and skills.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Participate & Contribute</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete tasks, volunteer your time, or provide resources to help animals in need.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Earn & Redeem Coins</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Earn community coins for your contributions and redeem them for pet services and products.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonial */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0 md:mr-8">
                  <div className="relative h-48 w-48 mx-auto">
                    <Image 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                      alt="Testimonial" 
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <p className="text-lg italic text-gray-600 dark:text-gray-300 mb-6">
                    "I started volunteering with Paswnet's stray rescue program last year, and it's been one of the most rewarding experiences of my life. Not only have I helped save 15 stray animals, but I've also earned enough community coins to cover my own pet's annual checkups!"
                  </p>
                  <div>
                    <h4 className="font-semibold">Sarah Williams</h4>
                    <p className="text-gray-500 dark:text-gray-400">Community Member since 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-12 bg-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              Join our community today and start contributing to animal welfare while earning rewards.
            </p>
            <Link 
              href="/services/register"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}