import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaSearch, FaCheckCircle, FaUserPlus, FaCalendarCheck, FaShieldAlt, FaHandshake } from "react-icons/fa";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    email: "",
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

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      password: "",
      confirmPassword: ""
    };

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
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
        await sendOTP();
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
      {/* Left Side */}
      <div className="flex-1 bg-black text-white p-16 flex flex-col justify-center">
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

     

      {/* Right Side */}
      <div className="flex-1 bg-white p-10 flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-xl w-96">
          {step === 1 ? (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Sign Up
                </button>
              </form>

              <div className="mt-6 text-center">
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

export default Signup;


function setStep(arg0: number) {
  throw new Error("Function not implemented.");
}
