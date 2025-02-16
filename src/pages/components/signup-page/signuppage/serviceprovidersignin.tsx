import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaUserPlus, FaHandshake, FaCalendarCheck, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import MultiStepSignupForm from './MultiStepSignupForm'; // Add this import statement

const ServiceProviderSignin: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1); // Add step state for OTP verification
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    ownerName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bankName: '',
    accountNumber: '',
    swiftCode: '',
    branchName: '',
    branchAddress: '',
    identifierCode: '',
    codeNumber: '',
    userId: '',
    username: ''
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
    // Redirect to login page and set service provider flag
    router.push('/components/signup-page/signuppage/login?isServiceProvider=true');
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
      // First verify OTP
      // const otpVerification = await fetch("/api/auth", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ 
      //     email: formData.email, 
      //     otp,
      //     action: "verify",
      //     type: "service_provider"
      //   })
      // });

      // if (!otpVerification.ok) {
      //   throw new Error("OTP verification failed");
      // }

      // If OTP is verified, proceed with signup
      const signupRes = await fetch("/api/provider/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.businessName,
          category: selectedCategories,
          owner_name: formData.ownerName,
          contact: {
            phone: formData.phone,
            email: formData.email
          },
          location: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip_code: formData.zipCode
          },
          bank_info: {
            bank_name: formData.bankName,
            account_number: formData.accountNumber,
            swift_code: formData.swiftCode,
            branch_name: formData.branchName,
            branch_address: formData.branchAddress,
            identifier_code: formData.identifierCode,
            code_number: formData.codeNumber
          },
          user_info: {
            user_id: formData.userId,
            username: formData.username,
            email: formData.email,
            password: formData.password // Include password in the request
          }
        })
      });

      if (signupRes.ok) {
        router.push('/service-page');
      } else {
        const error = await signupRes.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error in signup process:", error);
      // Handle error appropriately (show error message to user)
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.businessName || !formData.email || !formData.phone || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    
    if (selectedCategories.length === 0) {
      alert('Please select at least one service category');
      return;
    }
    
    //await sendOTP();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left div - hidden on mobile */}
      <div className="hidden md:flex md:flex-1 bg-black text-white p-10 flex-col justify-between">
        <div>
          <h1 className="text-5xl font-bold mb-2">HelperBuddy</h1>
          <h2 className="text-3xl mb-10">Join Our Service Provider Network</h2>
          
          <p className="text-xl mb-8">Become a part of our growing network of professional service providers and:</p>
          
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

      {/* Right Side - full width on mobile */}
      <div className="flex-1 md:flex-1">
        <MultiStepSignupForm/>
      </div>
    </div>
  );
};

export default ServiceProviderSignin;