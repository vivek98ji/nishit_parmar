import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import logo from '../../public/logo.png'; // Adjust the path as necessary

const SignupWithUser: React.FC = () => {
  const router = useRouter();

  const handleForgotPassword = () => {
    router.push('/components/signup-page/forgotpassword');
  };

  const handleLogin = () => {
    router.push('/components/signup-page/login');
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
        <h2 className="text-3xl font-bold mb-16 text-gray-700">User SignIn </h2>
        <form className="w-80">
          <input
            type="email"
            placeholder="Email"
            required
            className="border-2 border-gray-700 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-600"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="border-2      border-gray-700 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-600"
          />
          <button
            type="submit"
            className="bg-black text-white py-3 rounded w-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            SIGN UP
          </button>

          {/* Updated Account Options */}
          <div className="mt-6 flex flex-col items-center space-y-4">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-gray-600 hover:text-black transition-colors duration-300 text-sm font-medium hover:underline transform hover:scale-105"
            >
              Forgot password?
            </button>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Already have an account?</span>
              <button
                type="button"
                onClick={handleLogin}
                className="text-black font-semibold hover:text-gray-800 transition-colors duration-300 hover:underline transform hover:scale-105"
              >
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupWithUser;
