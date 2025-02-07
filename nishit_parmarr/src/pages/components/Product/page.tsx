import React from 'react'
import ProductCard from './ProductCard'
import ProductData from './ProductData'
import Link from "next/link";
export default function Product() {
    return (
        <div className="grid grid-cols-4 gap-2 p-4">
            {ProductData.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
