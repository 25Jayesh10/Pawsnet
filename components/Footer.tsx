import Link from 'next/link';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Paswnet</h3>
            <p className="mb-4">
              Pet Adoption and Stray Welfare Network - connecting pet lovers
              with animals in need.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-indigo-400">
                <FaFacebook size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-indigo-400">
                <FaTwitter size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-indigo-400">
                <FaInstagram size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pets" className="text-gray-300 hover:text-white">
                  My Pets
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-gray-300 hover:text-white"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-white"
                >
                  Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Pet Care Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Adoption Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Stray Animal Help
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <a
                  href="mailto:info@paswnet.com"
                  className="text-gray-300 hover:text-white"
                >
                  info@paswnet.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                <a
                  href="tel:+15551234567"
                  className="text-gray-300 hover:text-white"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-2 mt-1" />
                <span className="text-gray-300">
                  123 Pet Street, Animal City, AC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Paswnet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
