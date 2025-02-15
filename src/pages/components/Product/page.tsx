"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "../common/SearchBar";

export default function Product() {
    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState<string | null>(null);

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

    // Handle search functionality
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = products.filter((product) =>
            product.name?.toLowerCase().includes(query.toLowerCase()) ||
            product.description?.toLowerCase().includes(query.toLowerCase()) ||
            product.category?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                        Our Services
                    </h1>
                    <div className="max-w-2xl mx-auto">
                        <SearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={handleSearch}
                            placeholder="Search services by name, description, or category..."
                        />
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
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
            </div>
        </div>
    );
}