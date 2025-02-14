


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
