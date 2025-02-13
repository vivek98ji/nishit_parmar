import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import logo from '../../public/logo.png'; // Adjust the path as necessary

const Signup: React.FC = () => {
  const router = useRouter();

  const handleUserSignup = () => {
    router.push('/components/signup-page/signuppage/signupwithuser');
  };

  const handleProviderSignup = () => {
    router.push('/components/signup-page/signuppage/signupwithprovider'); // Create this file if needed
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side */}
      <div className="flex-1 bg-black text-white p-10 flex flex-col justify-center">
        <div className="flex items-center mb-4">
          {/* <Image src={logo} alt="HelperBuddy Logo" width={50} height={50} /> */}
          <h1 className="text-5xl font-bold ml-2">HelperBuddy</h1>
        </div>
        <h2 className="text-3xl mt-2 mb-6">Your Home Service Partner</h2>
        <p className="mt-4 text-lg leading-relaxed">
          Streamline your home services, increase convenience, and improve your living experience with:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li className="text-lg">Home cleaning services</li>
          <li className="text-lg">Plumbing and electrical repairs</li>
          <li className="text-lg">Gardening and landscaping</li>
          <li className="text-lg">Handyman services</li>
          <li className="text-lg">And much more!</li>
        </ul>
        <a href="#" className="inline-block mt-6 bg-white text-black py-3 px-6 rounded-lg shadow hover:bg-gray-200 transition">
          LEARN MORE
        </a>
      </div>

      {/* Right Side */}
      <div className="flex-1 bg-white p-10 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-600">Choose Account Type</h2>
        
        {/* Account Type Buttons */}
        <div className="w-80 mb-8 space-y-4">
          <button 
            onClick={handleUserSignup}
            className="w-full bg-black text-white py-3 px-6 rounded-lg shadow hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up as User
          </button>
          <button 
            onClick={handleProviderSignup}
            className="w-full bg-black text-white py-3 px-6 rounded-lg shadow hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up as Service Provider
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
