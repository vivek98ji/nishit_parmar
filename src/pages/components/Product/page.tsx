"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function Product() {
    const [products, setProducts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/services/service-user")
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