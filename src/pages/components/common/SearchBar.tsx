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
        <div className="relative w-full max-w-3xl mx-auto">
            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className="w-full px-4 py-4 pl-12 pr-10 text-gray-900 
                             bg-gray-100 border-2 border-black rounded-full
                             focus:outline-none focus:border-black focus:ring-1 focus:ring-black
                             transition-all duration-200 text-lg"
                />
                <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 
                                 hover:text-gray-600 focus:outline-none text-xl"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar; 