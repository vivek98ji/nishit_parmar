import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import logo from '../../public/logo.png'; // Adjust the path as necessary

const ServiceProviderSignin: React.FC = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const serviceCategories = [
    { value: "cleaning", label: "Cleaning" },
    { value: "plumbing", label: "Plumbing" },
    { value: "electrical", label: "Electrical" },
    { value: "painting", label: "Painting" },
    { value: "salon", label: "Salon Services" },
    { value: "carpentry", label: "Carpentry" },
    { value: "gardening", label: "Gardening" },
    { value: "appliance_repair", label: "Appliance Repair" }
  ];

  const handleForgotPassword = () => {
    router.push('/components/signup-page/forgotpassword');
  };

  const handleLogin = () => {
    router.push('/components/signup-page/login');
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (selectedCategories.length === 0) {
      alert('Please select at least one service category');
      return;
    }
    try {
      // Add your form submission logic here
      console.log('Selected categories:', selectedCategories);
      router.push('/service-page');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side */}
      <div className="flex-1 bg-black text-white p-10 flex flex-col justify-center">
        <div className="flex items-center mb-4">
          {/* <Image src={logo} alt="HelperBuddy Logo" width={50} height={50} /> */}
          <h1 className="text-5xl font-bold ml-2">HelperBuddy</h1>
        </div>
        <h2 className="text-3xl mt-2 mb-6">Join Our Service Provider Network</h2>
        <p className="mt-4 text-lg leading-relaxed">
          Become a part of our growing network of professional service providers and:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li className="text-lg">Grow your business</li>
          <li className="text-lg">Get more clients</li>
          <li className="text-lg">Manage bookings easily</li>
          <li className="text-lg">Receive secure payments</li>
          <li className="text-lg">Build your reputation</li>
        </ul>
        <a href="#" className="inline-block mt-6 bg-white text-black py-3 px-6 rounded-lg shadow hover:bg-gray-200 transition">
          LEARN MORE
        </a>
      </div>

      {/* Right Side */}
      <div className="flex-1 bg-white p-10 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-16 text-gray-700">Service Provider SignIn</h2>
        <form className="w-80" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Business Name"
            required
            className="border-2 border-gray-700 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-600"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="border-2 border-gray-700 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-600"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            className="border-2 border-gray-700 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="border-2 border-gray-700 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-600"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className="border-2 border-gray-700 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-600"
          />
          {passwordError && (
            <p className="text-red-500 text-sm mb-4">{passwordError}</p>
          )}

          <div className="mb-4">
            <label className="block text-2xl text-gray-700 mb-2">Select Service Categories (Multiple)</label>
            <div className="grid grid-cols-2 gap-2">
              {serviceCategories.map((category) => (
                <div key={category.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category.value}
                    checked={selectedCategories.includes(category.value)}
                    onChange={() => handleCategoryChange(category.value)}
                    className="mr-2"
                  />
                  <label htmlFor={category.value} className="text-sm text-gray-600">
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-black text-white py-3 rounded w-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            SIGN UP AS PROVIDER
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
              <span className="text-gray-500">Already a service provider?</span>
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

export default ServiceProviderSignin;
