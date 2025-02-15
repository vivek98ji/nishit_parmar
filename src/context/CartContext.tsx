"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartContextType {
  cartCount: number;
  updateCartCount: (count: number) => void;
  incrementCartCount: () => void;
  decrementCartCount: () => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  updateCartCount: () => {},
  incrementCartCount: () => {},
  decrementCartCount: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Fetch initial cart count from API
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const response = await fetch('/api/cart/count');
      if (response.ok) {
        const data = await response.json();
        setCartCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const updateCartCount = (count: number) => setCartCount(count);
  const incrementCartCount = () => setCartCount(prev => prev + 1);
  const decrementCartCount = () => setCartCount(prev => Math.max(0, prev - 1));

  return (
    <CartContext.Provider value={{ 
      cartCount, 
      updateCartCount, 
      incrementCartCount, 
      decrementCartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 