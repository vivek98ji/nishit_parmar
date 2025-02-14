// import React from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// // import logo from '../../public/logo.png'; // Adjust the path as necessary

// const SignupWithUser: React.FC = () => {
//   const router = useRouter();

//   const handleForgotPassword = () => {
//     router.push('/components/signup-page/forgotpassword');
//   };

//   const handleLogin = () => {
//     router.push('/components/signup-page/login');
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
//         <h2 className="text-3xl font-bold mb-16 text-gray-700">User SignIn </h2>
//         <form className="w-80">
//           <input
//             type="email"
//             placeholder="Email"
//             required
//             className="border-2 border-gray-700 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-600"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             required
//             className="border-2      border-gray-700 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-600"
//           />
//           <button
//             type="submit"
//             className="bg-black text-white py-3 rounded w-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
//           >
//             SIGN UP
//           </button>

//           {/* Updated Account Options */}
//           <div className="mt-6 flex flex-col items-center space-y-4">
//             <button
//               type="button"
//               onClick={handleForgotPassword}
//               className="text-gray-600 hover:text-black transition-colors duration-300 text-sm font-medium hover:underline transform hover:scale-105"
//             >
//               Forgot password?
//             </button>
            
//             <div className="flex items-center space-x-2">
//               <span className="text-gray-500">Already have an account?</span>
//               <button
//                 type="button"
//                 onClick={handleLogin}
//                 className="text-black font-semibold hover:text-gray-800 transition-colors duration-300 hover:underline transform hover:scale-105"
//               >
//                 Log In
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupWithUser;


import React, { useState } from "react";
import { useRouter } from "next/router";
const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const sendOTP = async () => {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, action: "send" })
    });
    setStep(2);
  };

  const verifyOTP = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, action: "verify" })
    });
    if (res.ok) {

      router.push("/components/homepage/homepage");
    }

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
        {/* <form className="w-80"
        // onSubmit={(e) => handleAuth(e)}
        >
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
            <button type="submit" className="bg-black text-white py-2 rounded w-full hover:bg-gray-700" onClick={sendOTP}>
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
              <button
                // onClick={(e) => handleAuth(e, true)}
                className="bg-green-600 text-white py-2 rounded w-full hover:bg-green-700"
                onClick={verifyOTP}>
                VERIFY OTP
              </button>
            </>
          )}
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </form> */}


        {/* <div className="bg-white p-6 rounded shadow-md w-96">
          {step === 1 ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Sign In</h2>
              <input className="border p-2 w-full mb-2" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="bg-blue-500 text-white p-2 w-full" onClick={sendOTP}>Send OTP</button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
              <input className="border p-2 w-full mb-2" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
              <button className="bg-green-500 text-white p-2 w-full" onClick={verifyOTP}>Verify</button>
            </>
          )}
        </div> */}




        <div className="bg-white p-6 rounded shadow-md w-96">
          {step === 1 ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Sign In</h2>
              <input className="border p-2 w-full mb-2" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="bg-blue-500 text-white p-2 w-full" onClick={sendOTP}>Send OTP</button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
              <input className="border p-2 w-full mb-2" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
              <button className="bg-green-500 text-white p-2 w-full" onClick={verifyOTP}>Verify</button>
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
