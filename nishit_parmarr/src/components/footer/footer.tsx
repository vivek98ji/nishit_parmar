import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

interface ContactFormData {
  name: string;
  lastName: string;
  email: string;
  message: string;
}

const Footer = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">Connect with us</h2>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Address</h3>
              <p className="text-gray-300">
                123 Business Street
                <br />
                Your City, State 12345
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Contacts</h3>
              <p className="text-gray-300">+1 (555) 123-4567</p>
              <p className="text-gray-300">contact@yourcompany.com</p>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
          
          {/* Right Column - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded bg-white text-black"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-2 rounded bg-white text-black"
                  placeholder="Your last name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Your email*
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded bg-white text-black"
                  placeholder="Your email address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message*
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded bg-white text-black"
                  placeholder="Enter your message"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="bg-white text-black px-8 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;