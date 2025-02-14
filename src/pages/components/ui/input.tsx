import React from 'react';

interface InputProps {
  type: string;
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, value, onChange, className = '' }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-all ${className}`}
    />
  );
};

export default Input;