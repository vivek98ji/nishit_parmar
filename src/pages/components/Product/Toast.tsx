import { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, show, onHide }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out">
      <div className="bg-black text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
        <svg 
          className="w-6 h-6 text-green-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Toast;