// import React, { useState } from 'react'
// import ProductCard from './ProductCard'
// import ProductData from '../../../data/ProductData'
// import SearchBar from '../common/SearchBar'

// export default function Product() {
//     const [searchQuery, setSearchQuery] = useState('');

//     // Filter products based on search query
//     const filteredProducts = ProductData.filter(product =>
//         product.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <div className="max-w-7xl mx-auto">
//             <SearchBar
//                 searchQuery={searchQuery}
//                 setSearchQuery={setSearchQuery}
//             />

//             {/* Products Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
//                 {filteredProducts.length > 0 ? (
//                     filteredProducts.map((product) => (
//                         <ProductCard key={product.id} product={product} />
//                     ))
//                 ) : (
//                     <div className="col-span-full text-center py-10">
//                         <p className="text-gray-500 text-lg">No services found matching your search.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }



"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function Product() {
    const [products, setProducts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/service-user")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                return res.json();
            })
            .then((data) => setProducts(data))
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Failed to load products");
            });
    }, []);

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <div className="grid grid-cols-4 gap-2 p-10">
            {products.length > 0 ? (
                products.map((product) => <ProductCard key={product._id} product={product} />)
            ) : (
                <p className="text-center">No products available</p>
            )}
        </div>
    );
}