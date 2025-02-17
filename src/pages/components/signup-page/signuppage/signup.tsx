import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaSearch, FaCheckCircle, FaUserPlus, FaCalendarCheck, FaShieldAlt, FaHandshake } from "react-icons/fa";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
          })
        });

        if (response.ok) {
          await sendOTP();
        } else {
          const data = await response.json();
          throw new Error(data.message || "Signup failed");
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  };

  const sendOTP = async () => {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email, action: "send" })
    });
    setStep(2);
  };

  const verifyOTP = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        otp,
        action: "verify"
      })
    });
    if (res.ok) {
      router.push("/components/homepage/homepage");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side - Hidden on mobile, visible on md and up */}
      <div className="hidden md:flex flex-1 bg-black text-white p-16 flex-col justify-center">
        <div className="flex items-center mb-8">
          <h1 className="text-6xl font-bold ml-2">HelperBuddy</h1>
        </div>
        <h2 className="text-4xl mt-4 mb-10">Your Home Service Partner</h2>
        <p className="mt-8 text-xl leading-relaxed text-gray-300">
          Streamline your home services, increase convenience, and improve your living experience with:
        </p>
        <ul className="list-none mt-8 space-y-6">
          <li className="flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <FaUserPlus className="w-6 h-6" />
            </div>
            <span className="text-xl">Home cleaning services</span>
          </li>
          <li className="flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <FaShieldAlt className="w-6 h-6" />
            </div>
            <span className="text-xl">Plumbing and electrical repairs</span>
          </li>
          <li className="flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <FaHandshake className="w-6 h-6" />
            </div>
            <span className="text-xl">Gardening and landscaping</span>
          </li>
          <li className="flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <FaCalendarCheck className="w-6 h-6" />
            </div>
            <span className="text-xl">Handyman services</span>
          </li>
          <li className="flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <FaCheckCircle className="w-6 h-6" />
            </div>
            <span className="text-xl">And much more!</span>
          </li>
        </ul>
        <button className="mt-12 bg-gradient-to-r from-white via-gray-200 to-white text-black py-4 px-8 rounded-lg 
                          hover:from-gray-200 hover:to-white transition-all duration-300 transform hover:scale-[1.02] 
                          font-semibold text-lg shadow-lg w-fit">
          LEARN MORE
        </button>
      </div>

      {/* Mobile Header - Only visible on mobile */}
      <div className="md:hidden bg-black text-white p-6 text-center fixed top-0 w-full z-10">
        <h1 className="text-3xl font-bold">HelperBuddy</h1>
        <p className="text-gray-300 mt-2">Your Home Service Partner</p>
      </div>

      {/* Right Side - Full width on mobile */}
      <div className="flex-1 bg-white p-2 sm:p-10 flex flex-col justify-center items-center w-full">
        {/* Increased width on mobile, max-width on larger screens */}
        <div className="bg-white p-3 sm:p-8 rounded-xl shadow-xl w-[98%] sm:w-full sm:max-w-[500px] mt-[100px] md:mt-0">
          {step === 1 ? (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
              <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <div className="w-full">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all text-lg"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="w-full">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all text-lg"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="w-full">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all text-lg"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] text-lg font-semibold"
                >
                  Sign Up
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => router.push('/components/signup-page/signuppage/login')}
                    className="text-black font-semibold hover:underline"
                  >
                    Log In
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Verify Email</h2>
              <div className="space-y-4 w-full">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all text-lg"
                />
                <button
                  onClick={verifyOTP}
                  className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] text-lg font-semibold"
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

export default Signup;


function setStep(arg0: number) {
  throw new Error("Function not implemented.");
}