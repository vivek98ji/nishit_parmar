import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaUserPlus, FaHandshake, FaCalendarCheck, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

const Login: React.FC = () => {
  const router = useRouter();
  const { isServiceProvider } = router.query;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isServiceProvider: isServiceProvider === 'true'
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  // Update isServiceProvider when query parameter changes
  React.useEffect(() => {
    setFormData(prev => ({
      ...prev,
      isServiceProvider: isServiceProvider === 'true'
    }));
  }, [isServiceProvider]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors when user types
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: ""
    };

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Directly check provider credentials
        const res = await fetch(`/api/provider/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });
  
        const data = await res.json();
        
        if (data.success) {
          // Redirect with provider ID in URL
          router.push(`/service-page?providerId=${data.providerId}`);
        } else {
          setErrors({ email: "Invalid credentials", password: "Invalid credentials" });
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side */}
      <div className="flex-1 bg-black text-white p-16 flex flex-col justify-center">
        <div className="flex items-center mb-8">
          <h1 className="text-6xl font-bold ml-2">HelperBuddy</h1>
        </div>
        <h2 className="text-4xl mt-4 mb-10">Welcome Back!</h2>
        <p className="mt-8 text-xl leading-relaxed text-gray-300">
          Log in to access your account and manage your services:
        </p>
        <ul className="list-none mt-8 space-y-6">
          <li className="flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <FaUserPlus className="w-6 h-6" />
            </div>
            <span className="text-xl">Manage your bookings</span>
          </li>
          <li className="flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <FaShieldAlt className="w-6 h-6" />
            </div>
            <span className="text-xl">Track your earnings</span>
          </li>
          <li className="flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <FaHandshake className="w-6 h-6" />
            </div>
            <span className="text-xl">Connect with clients</span>
          </li>
          <li className="flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <FaCalendarCheck className="w-6 h-6" />
            </div>
            <span className="text-xl">View your schedule</span>
          </li>
          <li className="flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <FaCheckCircle className="w-6 h-6" />
            </div>
            <span className="text-xl">Access premium features</span>
          </li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="flex-1 bg-white p-10 flex flex-col justify-center items-center w-full">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-[500px]">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login to Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="w-full">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-6 py-4 rounded-lg border-2 border-gray-300
                         text-gray-700 placeholder-gray-400 text-lg
                         transition-all duration-300 ease-in-out
                         focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5
                         hover:border-gray-400 hover:shadow-md"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="w-full">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-6 py-4 rounded-lg border-2 border-gray-300
                         text-gray-700 placeholder-gray-400 text-lg
                         transition-all duration-300 ease-in-out
                         focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5
                         hover:border-gray-400 hover:shadow-md"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                name="isServiceProvider"
                id="isServiceProvider"
                checked={formData.isServiceProvider}
                onChange={handleInputChange}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <label htmlFor="isServiceProvider" className="text-gray-700">
                I am a service provider
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 
                       transition-all duration-300 transform hover:scale-[1.02] 
                       text-lg font-semibold mt-6"
            >
              Log In
            </button>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => router.push('/components/signup-page/forgotpassword')}
                className="text-gray-600 hover:text-black transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => router.push('/components/signup-page/signuppage/signup')}
                className="text-black font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 