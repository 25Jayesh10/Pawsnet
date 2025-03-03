import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-indigo-600">Welcome to Paswnet</h1>
        <p className="text-xl mb-12">Pet Adoption and Stray Welfare Network</p>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center mb-12">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex-1">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-4">We connect pet lovers with animals in need, while supporting stray animal welfare initiatives.</p>
            <Image 
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b" 
              alt="People with pets" 
              width={400} 
              height={300}
              className="rounded-lg mx-auto"
            />
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex-1">
            <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
            <p className="mb-4">Become part of a growing network of pet owners and animal welfare advocates.</p>
            <ul className="list-disc list-inside mb-4 text-left">
              <li>Adopt and register your pets</li>
              <li>Participate in community services</li>
              <li>Earn community coins</li>
              <li>Help save stray animals</li>
            </ul>
          </div>
        </div>
        
        <Link 
          href="/dashboard" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}