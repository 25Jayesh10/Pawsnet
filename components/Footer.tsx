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
  const socialLinks = [
    { href: '#', icon: FaFacebook },
    { href: '#', icon: FaTwitter },
    { href: '#', icon: FaInstagram },
  ];

  const quickLinks = [
    { href: '/dashboard', text: 'Dashboard' },
    { href: '/pets', text: 'My Pets' },
    { href: '/community', text: 'Community' },
    { href: '/services', text: 'Services' },
  ];

  const resources = [
    { href: '#', text: 'Pet Care Tips' },
    { href: '#', text: 'Adoption Guide' },
    { href: '#', text: 'Stray Animal Help' },
    { href: '#', text: 'Community Guidelines' },
  ];

  const contactInfo = [
    { icon: FaEnvelope, href: 'mailto:info@paswnet.com', text: 'info@paswnet.com' },
    { icon: FaPhone, href: 'tel:+15551234567', text: '+1 (555) 123-4567' },
  ];

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Paswnet</h3>
            <p className="mb-4">
              Pet Adoption and Stray Welfare Network - connecting pet lovers with animals in need.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ href, icon: Icon }, index) => (
                <Link key={index} href={href} className="text-white hover:text-indigo-400">
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, text }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-300 hover:text-white">
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map(({ href, text }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-300 hover:text-white">
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              {contactInfo.map(({ icon: Icon, href, text }, index) => (
                <li key={index} className="flex items-center">
                  <Icon className="mr-2" />
                  <a href={href} className="text-gray-300 hover:text-white">
                    {text}
                  </a>
                </li>
              ))}
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-2 mt-1" />
                <span className="text-gray-300">123 Pet Street, Animal City, AC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Paswnet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}