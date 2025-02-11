import React from 'react'
import ProductCard from './ProductCard'
import ProductData from './ProductData'

export default function Product() {
    return (
        <div className="grid grid-cols-4 gap-2 p-10 ">

            {ProductData.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
