import React from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const router = useRouter();

  const handleAdminClick = () => {
    router.push('/admin/login');
  };

  const handleProviderClick = () => {
    router.push('/provider/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side */}
      <div className="flex-1 bg-black text-white p-10 flex flex-col justify-center">
        <div className="flex items-center mb-4">
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
        <div className="w-full max-w-md">
          {/* User Type Selection */}
          <div className="mb-8 flex gap-4">
            <button 
              onClick={handleAdminClick}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
            >
              ADMIN LOGIN
            </button>
            <button 
              onClick={handleProviderClick}
              className="flex-1 bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition shadow-lg"
            >
              SERVICE PROVIDER
            </button>
          </div>

          {/* Customer Signup Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Customer Sign Up</h2>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                required
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                className="bg-black text-white py-3 rounded-lg w-full hover:bg-gray-800 transition font-semibold"
              >
                SIGN UP
              </button>
              
              <div className="mt-4 text-center">
                <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
                <p className="mt-2 text-gray-600">
                  Already have an account? 
                  <a href="#" className="text-blue-600 font-semibold hover:underline ml-1">Log In</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;