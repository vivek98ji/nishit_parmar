"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, UserPlus, UserCog } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaReact } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const router = useRouter();

  const updateCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    } catch (error) {
      console.error('Error updating cart count:', error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    // Initial cart count
    updateCartCount();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        updateCartCount();
      }
    };

    // Listen for custom cart update events
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const navItems = [
    { label: 'Home', href: '/components/homepage/homepage' },
    { label: 'Services', href: '/components/Product/page' },
    { label: 'Blog', href: '/components/blog/blog' },
    { label: 'About', href: '/components/About/about' },
  ];

  const handleIconClick = () => {
    setActiveIcon('provider');
    setActiveNav(null);
    router.push('/components/signup-page/signuppage/serviceprovidersignin');
  };

  const handleCartClick = () => {
    setActiveIcon('cart');
    setActiveNav(null);
    router.push('/components/Cart/Cart');
  };

  const handleSignupClick = () => {
    setActiveIcon('signup');
    setActiveNav(null);
    router.push('/components/signup-page/signuppage/signup');
  };

  const handleNavClick = (label: string, href: string) => {
    setActiveNav(label);
    setActiveIcon(null);
    router.push(href);
  };

  const handleAdminLogin = () => {
    router.push('/admin/login');
  };

  return (
    <header className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              HB
            </Link>
          </div>

          {/* Centered Navigation with rounded rectangle backgrounds */}
          <nav className="hidden md:flex flex-grow justify-center space-x-8 relative">
            {/* Animated white background */}
            {activeNav && (
              <div
                className="absolute h-10 bg-white rounded-lg transition-all duration-300 ease-in-out transform"
                style={{
                  width: '80px',
                  top: '50%',
                  transform: `translateY(-50%) ${
                    activeNav === 'Home' ? 'translateX(-9.2rem)' : 
                    activeNav === 'Services' ? 'translateX(-2.1rem)' : 
                    activeNav === 'Blog' ? 'translateX(4.9rem)' : 
                    activeNav === 'About' ? 'translateX(11rem)' : ''
                  }`
                }}
              />
            )}
            
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative z-10 px-4 py-2 rounded-lg transition-all duration-300
                  ${activeNav === item.label ? 'text-black' : 'text-white hover:text-gray-300'}`}
                onClick={() => handleNavClick(item.label, item.href)}
              >
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Icons section with existing white circle */}
          <div className="flex items-center space-x-6 relative">
            {/* Existing icon background animation */}
            {activeIcon && (
              <div
                className={`absolute w-12 h-12 bg-white rounded-full transition-all duration-300 ease-in-out transform`}
                style={{
                  top: '50%',
                  transform: `translateY(-50%) ${
                    activeIcon === 'signup' ? 'translateX(0.9rem)' : 
                    activeIcon === 'provider' ? 'translateX(5rem)' : 
                    activeIcon === 'admin' ? 'translateX(9.5rem)' : 
                    activeIcon === 'cart' ? 'translateX(13.1rem)' : ''
                  }`
                }}
              />
            )}

            {/* Icons with exact positioning */}
            <div className="p-1 rounded-full z-10 relative flex items-center justify-center">
              <UserPlus 
                onClick={handleSignupClick}
                className={`cursor-pointer h-6 w-6 transition-all duration-300 transform hover:scale-110
                  ${activeIcon === 'signup' ? 'text-black' : 'text-white hover:text-gray-300'}`}
              />
            </div>

            <div className="p-3 rounded-full z-10 relative flex items-center justify-center">
              <FaReact 
                onClick={handleIconClick} 
                className={`cursor-pointer h-6 w-6 transition-all duration-300 transform hover:scale-110
                  ${activeIcon === 'provider' ? 'text-black' : 'text-white hover:text-gray-300'}`}
                title="Service Provider Portal"
              />
            </div>

            <div 
              className="p-1 rounded-full z-10 relative flex items-center justify-center"
              title="Admin Login"
            >
              <UserCog 
                onClick={handleAdminLogin}
                className={`cursor-pointer h-6 w-6 transition-all duration-300 transform hover:scale-110
                  ${activeIcon === 'admin' ? 'text-black' : 'text-white hover:text-gray-300'}`}
              />
            </div>

            <div className="hidden md:flex items-center z-10 relative">
              <div className="p-3 rounded-full">
                <button 
                  onClick={handleCartClick}
                  className="relative"
                  title="Shopping Cart"
                >
                  <ShoppingBag className={`h-6 w-6 transition-all duration-300 transform hover:scale-110
                    ${activeIcon === 'cart' ? 'text-black' : 'text-white hover:text-gray-300'}`} 
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                                   w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
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
            <div className="px-2 pt-2 pb-3 space-y-1 relative">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    handleNavClick(item.label, item.href);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 relative
                    ${activeNav === item.label ? 'text-black' : 'text-white hover:bg-white/10'}`}
                >
                  {activeNav === item.label && (
                    <div className="absolute inset-0 bg-white rounded-lg transition-all duration-300 ease-in-out" />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
              <button 
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 relative
                  ${activeIcon === 'signup' ? 'text-black' : 'text-white hover:bg-white/10'}`}
                onClick={() => {
                  setIsMenuOpen(false);
                  handleSignupClick();
                }}
              >
                {activeIcon === 'signup' && (
                  <div className="absolute inset-0 bg-white rounded-lg transition-all duration-300 ease-in-out" />
                )}
                <span className="relative z-10">
                  <UserPlus className="h-6 w-6 inline mr-2" />
                  Sign Up
                </span>
              </button>

              <button 
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 relative
                  ${activeIcon === 'cart' ? 'text-black' : 'text-white hover:bg-white/10'}`}
                onClick={() => {
                  setIsMenuOpen(false);
                  handleCartClick();
                }}
              >
                {activeIcon === 'cart' && (
                  <div className="absolute inset-0 bg-white rounded-lg transition-all duration-300 ease-in-out" />
                )}
                <span className="relative z-10">
                  <div className="relative inline-block">
                    <ShoppingBag className="h-6 w-6 inline mr-2" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                                     w-5 h-5 flex items-center justify-center rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  Cart
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;