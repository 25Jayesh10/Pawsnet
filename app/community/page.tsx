import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaUsers, FaPaw, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function CommunityPage() {
  // Mock data for community events
  const events = [
    {
      id: 1,
      title: 'Weekend Stray Feeding Drive',
      date: '2023-11-18',
      time: '9:00 AM - 12:00 PM',
      location: 'Central Park',
      image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c',
      participants: 12,
      description:
        "Join us for our weekly feeding drive for stray animals in the city. We'll be providing food, water, and basic medical care.",
    },
    {
      id: 2,
      title: 'Pet Adoption Fair',
      date: '2023-11-25',
      time: '10:00 AM - 4:00 PM',
      location: 'City Convention Center',
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7',
      participants: 45,
      description:
        'Find your perfect companion at our monthly adoption fair. Meet rescued animals looking for their forever homes.',
    },
    {
      id: 3,
      title: 'Stray Animal Rescue Workshop',
      date: '2023-12-02',
      time: '2:00 PM - 5:00 PM',
      location: 'Community Center',
      image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8',
      participants: 18,
      description:
        'Learn safe and effective techniques for rescuing stray animals. Workshop includes hands-on training with professional rescuers.',
    },
  ];

  // Mock data for community members
  const members = [
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      role: 'Volunteer',
      animalsSaved: 15,
      joined: '2022-05-12',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      role: 'Rescuer',
      animalsSaved: 23,
      joined: '2021-11-08',
    },
    {
      id: 3,
      name: 'Michael Brown',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      role: 'Foster Parent',
      animalsSaved: 8,
      joined: '2023-01-15',
    },
    {
      id: 4,
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      role: 'Veterinarian',
      animalsSaved: 42,
      joined: '2022-03-22',
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-indigo-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Community
            </h1>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              Together we can make a difference in the lives of pets and stray
              animals. Connect with fellow animal lovers, participate in events,
              and contribute to our mission.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#events"
                className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Upcoming Events
              </Link>
              <Link
                href="#members"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Meet Our Members
              </Link>
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
                  <FaUsers size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-2">1,250+</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Community Members
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                  <FaPaw size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-2">350+</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Strays Rescued
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mb-4">
                  <FaCalendarAlt size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-2">120+</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Events Organized
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section id="events" className="py-12 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">
              Upcoming Community Events
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                      <FaCalendarAlt className="mr-2" />
                      <span>
                        {new Date(event.date).toLocaleDateString()} •{' '}
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {event.participants} participants
                      </span>
                      <Link
                        href={`/community/events/${event.id}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                      >
                        Join Event
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/community/events"
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
              >
                View All Events
              </Link>
            </div>
          </div>
        </section>

        {/* Community Members */}
        <section id="members" className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">
              Meet Our Top Contributors
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center"
                >
                  <div className="relative h-24 w-24 mx-auto mb-4">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 mb-3">
                    {member.role}
                  </p>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <span className="font-medium">{member.animalsSaved}</span>{' '}
                    animals saved
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Member since {new Date(member.joined).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">
                Want to Get Involved?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                Join our community of animal lovers and make a difference in the
                lives of pets and stray animals. Participate in events, share
                your experiences, and connect with like-minded individuals.
              </p>
              <Link
                href="/community/join"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
