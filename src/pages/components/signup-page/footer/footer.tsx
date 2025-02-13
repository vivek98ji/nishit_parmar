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
            <h2 className="text-2xl font-bold hover:text-gray-300 transition-all duration-300 cursor-pointer">
              Helper Buddy
            </h2>
            <p className="text-gray-300">
              Your trusted partner for finding reliable household services and professionals.
            </p>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <p className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer">
                Email: info@helperbuddy.in
              </p>
              <p className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer">
                Phone: +91 XXXXX XXXXX
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Quick Links</h2>
            <ul className="space-y-2">
              {[
                { href: "/components/homepage/homepage", label: "Home" },
                { href: "/components/Product/page", label: "Services" },
                { href: "/components/blog/blog", label: "Blog" },
                { href: "/components/signup-page/signuppage/signup", label: "SignUp" },
                { href: "/components/About/about", label: "About" },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Services</h2>
            <ul className="space-y-2">
              {[
                { href: "/services/house-cleaning", label: "House Cleaning" },
                { href: "/services/cook", label: "Cook Services" },
                { href: "/services/elderly-care", label: "Elderly Care" },
                { href: "/services/kitchen-cleaning", label: "Kitchen Cleaning" },
              ].map((service) => (
                <li key={service.label}>
                  <Link 
                    href={service.href} 
                    className="text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 inline-block hover:scale-105"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Follow us</h2>
            <p className="text-gray-300">
              Stay connected with us on social media for updates and offers.
            </p>
            <div className="flex space-x-6">
              {[
                { href: "http://facebook.com/helperbuddy.in/", Icon: FaFacebook, label: "Facebook" },
                { href: "https://www.instagram.com/helperbuddy.in/", Icon: FaInstagram, label: "Instagram" },
                { href: "#", Icon: FaLinkedin, label: "LinkedIn" },
                { href: "#", Icon: FaTwitter, label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-white hover:text-gray-300 transition-all duration-300 transform hover:scale-125"
                  aria-label={social.label}
                >
                  <social.Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;