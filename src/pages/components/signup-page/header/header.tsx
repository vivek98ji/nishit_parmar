import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { FaReact } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/components/homepage/homepage' },
    { label: 'Services', href: '/components/Product/page' },
    { label: 'Blog', href: '/components/blog/blog' },
    { label: 'Signup', href: '/components/signup-page/signuppage/signup' },
    { label: 'About', href: '/components/About/about' },
  ];
  const router = useRouter();

  const handleIconClick = async () => {
    // First navigate to signup page
    router.push('/components/signup-page/signuppage/serviceprovidersignin');
  };

  const handleCartClick = () => {
    router.push('/components/Cart/Cart');
  };

  return (
    <header className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold">
              HB
            </a>
          </div>

          {/* Centered Navigation */}
          <nav className="flex-grow flex justify-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white hover:text-gray-300 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Icons on the right */}
          <div className="flex items-center space-x-4">
            <FaReact 
              onClick={handleIconClick} 
              className="cursor-pointer h-6 w-6 hover:text-gray-300 transition-colors duration-300 transform hover:scale-110" 
              title="Service Provider Portal"
            />
            <div className="hidden md:flex items-center">
              <button 
                onClick={handleCartClick}
                className="text-white p-2 hover:text-gray-300 transition-colors duration-300 transform hover:scale-110"
                title="Shopping Cart"
              >
                <ShoppingBag className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-white hover:text-gray-300 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button 
                className="block w-full text-left px-3 py-2 text-white hover:text-gray-300 transition-colors duration-200" 
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push('/components/Cart');
                }}
              >
                <ShoppingBag className="h-6 w-6 inline mr-2" />
                Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;