import React, { useState } from 'react';
import { useRouter } from 'next/router';

const MultiStepSignupForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
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
    code_number:'',
    identifier_code:'',
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [passwordError, setPasswordError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceCategories = [
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'gardening', label: 'Gardening' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const nextStep = () => {
    if (step === 1 && (!formData.password || !formData.confirmPassword)) {
      setPasswordError('Please fill in both password fields');
      return;
    }
    if (step === 1 && formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setSubmitError('');
    setIsSubmitting(true);
  
    try {
      const userId = `usr${Math.floor(Math.random() * 1000)}`;
      const generateRandomString = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      };
  
      const codeNumber = generateRandomString(10);
      const identifierCode = generateRandomString(10);
  
      setFormData((prev) => ({
        ...prev,
        code_number: codeNumber,
        identifier_code: identifierCode,
      }));
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
            code_number: formData.code_number,
            identifier_code: formData.identifier_code
          },
          user_info: {
            user_id: userId,
            username: formData.businessName,
            email: formData.email,
            password: formData.password
          }
        })
      });
      console.log('Response status:', signupRes.status);
      console.log('Response body:', await signupRes.text());
  
      if (signupRes.ok) {
        router.push('/service-page');
      } else {
        const error = await signupRes.json();
        throw new Error(error.message);
      }
    } catch (error) {
      setSubmitError(error.message || 'An error occurred during signup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
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
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
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
              type="text"
              name="ownerName"
              placeholder="Owner Name"
              value={formData.ownerName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
              />
            </div>
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Bank Information</h3>
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              value={formData.bankName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
            />
            <input
              type="text"
              name="accountNumber"
              placeholder="Account Number"
              value={formData.accountNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
            />
            <input
              type="text"
              name="swiftCode"
              placeholder="SWIFT Code"
              value={formData.swiftCode}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
            />
            <input
              type="text"
              name="branchName"
              placeholder="Branch Name"
              value={formData.branchName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
            />
            <input
              type="text"
              name="branchAddress"
              placeholder="Branch Address"
              value={formData.branchAddress}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Service Categories</h3>
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-white p-10 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Service Provider Sign Up
        </h2>
        
        {/* Progress indicator */}
        <div className="mb-8 flex justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-3 h-3 rounded-full ${
                stepNumber <= step ? 'bg-black' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStepContent()}
  
          {submitError && (
            <p className="text-red-500 text-sm text-center">{submitError}</p>
          )}
  
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-50 transition-all"
                disabled={isSubmitting}
              >
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
                disabled={isSubmitting}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default MultiStepSignupForm;