import React from 'react';
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
    searchQuery, 
    setSearchQuery, 
    placeholder = "Search for services...",
    onFocus,
    onBlur
}) => {
    return (
        <div className="w-full relative">
            <div className="relative flex items-center group w-full">
                <div className="absolute left-4 text-gray-400 transition-transform duration-300 group-hover:scale-110">
                    <FaSearch className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className="w-full pl-14 pr-6 py-4 bg-white border-2 border-gray-300
                             rounded-full text-gray-700 placeholder-gray-400 text-lg
                             transition-all duration-300 ease-in-out
                             focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5
                             hover:border-gray-400 hover:shadow-md"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 text-gray-400 hover:text-gray-600 
                                 transition-colors duration-200 focus:outline-none"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar; 