import React from 'react'
import ProductCard from './ProductCard'
import ProductData from './ProductData'
import Header from "../signup-page/header/header";
import Footer from "../signup-page/footer/footer";

export default function Product() {
    return (
        <>
        <Header/>
        <div className="grid grid-cols-4 gap-2 p-10 ">
            {ProductData.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <Footer/>
        </>
    )
}
