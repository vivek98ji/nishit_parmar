"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "../common/SearchBar";

export default function Product() {
    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;
    const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const priceRanges = [
        { label: 'All', value: 'all' },
        { label: 'Under ₹100', value: 'under100' },
        { label: '₹100 - ₹500', value: '100-500' },
        { label: '₹1000 - ₹2000', value: '1000-2000' },
        { label: 'Above ₹2000', value: 'above2000' },
    ];

    const categories = [
        { label: 'All', value: 'all' },
        { label: 'SERVICE', value: 'service' },
        { label: 'REPAIR', value: 'REPAIR' },
        { label: 'Cleaning', value: 'cleaning' },
        { label: 'Furniture', value: 'furniture' },
    ];

    useEffect(() => {
        fetch("/api/services/service-user")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Failed to load products");
            });
    }, []);

    const filterByPrice = (products: any[]) => {
        if (selectedPriceRange === 'all') return products;

        return products.filter((product) => {
            const price = Number(product.price);
            
            switch (selectedPriceRange) {
                case 'under100':
                    return price <= 100;
                case '100-500':
                    return price > 100 && price <= 500;
                case '1000-2000':
                    return price >= 1000 && price <= 2000;
                case 'above2000':
                    return price > 2000;
                default:
                    return true;
            }
        });
    };

    // Combined search and price filter
    const applyFilters = (searchTerm: string, priceRange: string, category: string) => {
        let filtered = products;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter((product) =>
                product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply price filter
        if (priceRange !== 'all') {
            filtered = filterByPrice(filtered);
        }

        // Apply category filter
        if (category !== 'all') {
            filtered = filtered.filter((product) =>
                product.category?.toLowerCase() === category.toLowerCase()
            );
        }

        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        applyFilters(query, selectedPriceRange, selectedCategory);
    };

    const handlePriceRangeChange = (range: string) => {
        setSelectedPriceRange(range);
        applyFilters(searchQuery, range, selectedCategory);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        applyFilters(searchQuery, selectedPriceRange, category);
    };

    // Calculate pagination values
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search Section with Price Filters */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                        Our Services
                    </h1>
                    <div className="max-w-2xl mx-auto mb-4">
                        <SearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={handleSearch}
                            placeholder="Search services by name, description, or category..."
                        />
                    </div>

                    {/* Price Range Filters */}
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {priceRanges.map((range) => (
                            <button
                                key={range.value}
                                onClick={() => handlePriceRangeChange(range.value)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                                    ${selectedPriceRange === range.value
                                        ? 'bg-black text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {categories.map((category) => (
                            <button
                                key={category.value}
                                onClick={() => handleCategoryChange(category.value)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                                    ${selectedCategory === category.value
                                    ? 'bg-black text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Updated Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                              gap-x-12 gap-y-16 px-4 py-8">
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <div key={product._id} className="flex justify-center">
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10">
                            {searchQuery ? (
                                <p className="text-gray-500">
                                    No services found matching "{searchQuery}"
                                </p>
                            ) : (
                                <p className="text-gray-500">No services available</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {filteredProducts.length > productsPerPage && (
                    <div className="flex justify-center items-center space-x-2 py-8">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-gray-300 rounded-md
                                     text-sm font-medium text-gray-700
                                     hover:bg-gray-50 disabled:opacity-50
                                     disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 border rounded-md text-sm font-medium
                                          ${currentPage === index + 1
                                    ? 'bg-black text-white border-black'
                                    : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border border-gray-300 rounded-md
                                     text-sm font-medium text-gray-700
                                     hover:bg-gray-50 disabled:opacity-50
                                     disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}