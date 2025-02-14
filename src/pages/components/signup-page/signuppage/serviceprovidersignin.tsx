import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaUserPlus, FaHandshake, FaCalendarCheck, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
// import logo from '../../public/logo.png'; // Adjust the path as necessary

const ServiceProviderSignin: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1); // Add step state for OTP verification
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'confirmPassword' || name === 'password') {
      if (name === 'confirmPassword' && formData.password !== value) {
        setPasswordError('Passwords do not match');
      } else if (name === 'password' && formData.confirmPassword && formData.confirmPassword !== value) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  };

  const sendOTP = async () => {
    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: formData.email, 
          action: "send",
          type: "service_provider"
        })
      });
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password,
          businessName: formData.businessName,
          phone: formData.phone,
          categories: selectedCategories,
          otp,
          action: "verify",
          type: "service_provider"
        })
      });
      if (res.ok) {
        router.push('/service-page');
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (selectedCategories.length === 0) {
      alert('Please select at least one service category');
      return;
    }
    await sendOTP();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 bg-black text-white p-10 flex flex-col justify-between">
             <div>
               <h1 className="text-5xl font-bold mb-2">HelperBuddy</h1>
               <h2 className="text-3xl mb-10">Join Our Service Provider Network</h2>
               
               <p className="text-xl  mb-8">Become a part of our growing network of professional service providers and:</p>
               
               <div className="space-y-12">
                 <div className="flex items-center space-x-4 transform hover:translate-x-2 transition-transform duration-300">
                   <div className="bg-white/10 p-3 rounded-full">
                     <FaUserPlus className="w-6 h-6" />
                   </div>
                   <p className="text-xl">Grow your business</p>
                 </div>
                 
                 <div className="flex items-center space-x-4 transform hover:translate-x-2 transition-transform duration-300">
                   <div className="bg-white/10 p-3 rounded-full">
                     <FaHandshake className="w-6 h-6" />
                   </div>
                   <p className="text-xl">Get more clients</p>
                 </div>
                 
                 <div className="flex items-center space-x-4 transform hover:translate-x-2 transition-transform duration-300">
                   <div className="bg-white/10 p-3 rounded-full">
                     <FaCalendarCheck className="w-6 h-6" />
                   </div>
                   <p className="text-xl">Manage bookings easily</p>
                 </div>
                 
                 <div className="flex items-center space-x-4 transform hover:translate-x-2 transition-transform duration-300">
                   <div className="bg-white/10 p-3 rounded-full">
                     <FaShieldAlt className="w-6 h-6" />
                   </div>
                   <p className="text-xl">Receive secure payments</p>
                 </div>
                 
                 <div className="flex items-center space-x-4 transform hover:translate-x-2 transition-transform duration-300">
                   <div className="bg-white/10 p-3 rounded-full">
                     <FaCheckCircle className="w-6 h-6" />
                   </div>
                   <p className="text-xl">Build your reputation</p>
                 </div>
               </div>
             </div>
     
             <button className="w-full bg-white text-black py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] mt-8">
               LEARN MORE
             </button>
           </div>
     

      {/* Right Side */}
      <div className="flex-1 bg-white p-10 flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-xl w-96">
          {step === 1 ? (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Service Provider Sign Up</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
                />
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}

                <div className="space-y-2">
                  <label className="block text-lg text-gray-700 mb-2">Select Service Categories</label>
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
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Sign Up
                </button>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Already a service provider?{" "}
                    <button
                      onClick={handleLogin}
                      className="text-black font-semibold hover:underline"
                    >
                      Log In
                    </button>
                  </p>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Verify Email</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
                />
                <button
                  onClick={verifyOTP}
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Verify OTP
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderSignin;
