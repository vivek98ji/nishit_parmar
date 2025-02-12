// import React, { useState } from 'react';
// import Image from 'next/image';
// // import logo from '../../public/logo.png'; // Adjust the path as necessary

// const Signup: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");
//   const sendOtp = async () => {
//     setMessage("");
//     const res = await fetch("/api/send-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email })
//     });
//     const data = await res.json();
//     if (data.success) setOtpSent(true);
//     setMessage(data.message);
//   };
//   const verifyOtp = async () => {
//     setMessage("");
//     const res = await fetch("/api/verify-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, otp })
//     });
//     const data = await res.json();
//     setMessage(data.message);
//   };
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Left Side */}
//       <div className="flex-1 bg-black text-white p-10 flex flex-col justify-center">
//         <div className="flex items-center mb-4">
//           {/* <Image src={logo} alt="HelperBuddy Logo" width={50} height={50} /> */}
//           <h1 className="text-5xl font-bold ml-2">HelperBuddy</h1>
//         </div>
//         <h2 className="text-3xl mt-2 mb-6">Your Home Service Partner</h2>
//         <p className="mt-4 text-lg leading-relaxed">
//           Streamline your home services, increase convenience, and improve your living experience with:
//         </p>
//         <ul className="list-disc list-inside mt-4 space-y-2">
//           <li className="text-lg">Home cleaning services</li>
//           <li className="text-lg">Plumbing and electrical repairs</li>
//           <li className="text-lg">Gardening and landscaping</li>
//           <li className="text-lg">Handyman services</li>
//           <li className="text-lg">And much more!</li>
//         </ul>
//         <a href="#" className="inline-block mt-6 bg-white text-black py-3 px-6 rounded-lg shadow hover:bg-gray-200 transition">
//           LEARN MORE
//         </a>
//       </div>

//       {/* Right Side */}
//       <div className="flex-1 bg-white p-10 flex flex-col justify-center items-center">
//         <h2 className="text-2xl font-bold mb-6 text-gray-600">Sign Up</h2>
//         <form className="w-80">
//           <input
//             type="email"
//             placeholder="Email"
//             required
//             className="border border-gray-300 rounded p-2 mb-4 w-full"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             required
//             className="border border-gray-300 rounded p-2 mb-4 w-full"
//           />
//           <button
//             type="submit"
//             onClick={sendOtp}
//             className="bg-black text-white py-2 rounded w-full hover:bg-gray-700"
//           >
//             SIGN UP
//           </button>
//           <p className="mt-4">
//             <a href="#" className="text-blue-600">Forgot password?</a>
//           </p>
//           <p className="mt-2">
//             Already have an account? <a href="#" className="text-blue-600">Log In</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import Image from "next/image";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (data.success) setOtpSent(true);
    setMessage(data.message);
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });
    const data = await res.json();
    if (data.success) setIsVerified(true);
    setMessage(data.message);
  };




  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side */}
      <div className="flex-1 bg-black text-white p-10 flex flex-col justify-center">
        <h1 className="text-5xl font-bold">HelperBuddy</h1>
        <h2 className="text-3xl mt-2 mb-6">Your Home Service Partner</h2>
        <p className="text-lg">Convenient home services like cleaning, plumbing, and more.</p>
      </div>

      {/* Right Side */}
      <div className="flex-1 bg-white p-10 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-600">Sign Up</h2>
        <form className="w-80" onSubmit={sendOtp}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
          />
          {!otpSent ? (
            <button type="submit" className="bg-black text-white py-2 rounded w-full hover:bg-gray-700">
              SEND OTP
            </button>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-300 rounded p-2 mb-4 w-full"
              />
              <button onClick={verifyOtp} className="bg-green-600 text-white py-2 rounded w-full hover:bg-green-700">
                VERIFY OTP
              </button>
            </>
          )}
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;

