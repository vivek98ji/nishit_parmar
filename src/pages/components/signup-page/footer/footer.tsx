import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Helper Buddy Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Helper Buddy</h2>
            <p className="text-gray-300">
              Your trusted partner for finding reliable household services and professionals.
            </p>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <p className="text-gray-300">Email: info@helperbuddy.in</p>
              <p className="text-gray-300">Phone: +91 XXXXX XXXXX</p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/components/homepage/homepage" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                Services
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white">
                 Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  SignUp
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Services</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/services/house-cleaning" className="text-gray-300 hover:text-white">
                  House Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/cook" className="text-gray-300 hover:text-white">
                  Cook Services
                </Link>
              </li>
              <li>
                <Link href="/services/elderly-care" className="text-gray-300 hover:text-white">
                  Elderly Care
                </Link>
              </li>
              <li>
                <Link href="/services/kitchen-cleaning" className="text-gray-300 hover:text-white">
                  Kitchen Cleaning
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Follow us</h2>
            <p className="text-gray-300">
              Stay connected with us on social media for updates and offers.
            </p>
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;