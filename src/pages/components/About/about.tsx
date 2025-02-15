import React from 'react';
import { FaCheckCircle, FaUsers, FaHandshake, FaStar } from 'react-icons/fa';
import { useState } from 'react';
// app.use(express.static('public'));


const About = () => {
  const features = [
    {
      icon: <FaUsers className="w-8 h-8 text-blue-600" />,
      title: "Expert Team",
      description: "Our professional team is highly trained and experienced"
    },
    {
      icon: <FaCheckCircle className="w-8 h-8 text-green-600" />,
      title: "Quality Assured",
      description: "We maintain the highest standards of cleaning services"
    },
    {
      icon: <FaHandshake className="w-8 h-8 text-purple-600" />,
      title: "Customer First",
      description: "Your satisfaction is our top priority"
    },
    {
      icon: <FaStar className="w-8 h-8 text-yellow-500" />,
      title: "5-Star Service",
      description: "Consistently rated excellent by our customers"
    }
  ];

  // Add these state handlers for the form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            About <span className="text-blue-900">HelperBuddy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            HelperBuddy offers professional house, office, and AC cleaning services across India, 
            delivering top-quality, eco-friendly solutions tailored to your needs. Our trusted team 
            ensures your spaces are spotless, fresh, and well-maintained.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image Grid */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4 relative">
              <img src="/logo.png" alt="Service 1" className="w-full h-56 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
              <img src="/img/showcase/service1.jpg" alt="Service 1" className="w-full h-56 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
              <img src="/img/showcase/service2.jpg" alt="Service 2" className="w-full h-56 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
              <img src="/img/showcase/service3.jpg" alt="Service 3" className="w-full h-56 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We are dedicated to providing the best cleaning services tailored to your needs. 
                Our team is trained to ensure your satisfaction. Our trusted team ensures your 
                spaces are spotless, fresh, and well-maintained.
              </p>
              <button className="bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 
                transform hover:scale-105 transition-all duration-300 shadow-lg">
                Learn More
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4 mb-3">
                    {feature.icon}
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Move this up */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">1000+</div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-400">50+</div>
              <div className="text-gray-400">Cities Covered</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-400">100+</div>
              <div className="text-gray-400">Team Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-400">4.9</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section - Now below stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our services? We'd love to hear from you. Send us a message
            and we'll respond as soon as possible.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-shadow duration-300">
          <div className="flex flex-col md:flex-row">
            {/* Contact Information */}
            <div className="bg-black text-white p-8 md:w-1/3">
              <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
              <div className="space-y-6">
                <div>
                  <p className="font-semibold mb-1">Address</p>
                  <p className="text-gray-300">123 Business Street</p>
                  <p className="text-gray-300">Mumbai, India</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Email</p>
                  <p className="text-gray-300">contact@helperbuddy.com</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Phone</p>
                  <p className="text-gray-300">+91 123 456 7890</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 md:w-2/3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 
                           transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
