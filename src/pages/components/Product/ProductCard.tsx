"use client";

import Image from "next/image";
import { FC, useState } from "react";
import Link from "next/link";

interface Product {
    _id: string;
    imageUrl: string;
    name: string;
    description: string;
    price: number;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);
        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: 'service', // You might want to make this dynamic
                    available: true
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }

            const data = await response.json();
            if (data.success) {
                alert('Service added to cart successfully!');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add service to cart. Please try again.');
        } finally {
            setIsAdding(false);
        }
    };

    if (!product) return null;

    return (
        <div className="mx-auto mt-11 h-[400px] w-80 transform overflow-hidden rounded-[5px] bg-white dark:bg-white shadow-lg duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
            <Image
                className="h-[200px] w-full object-cover object-left-right"
                src={product.imageUrl || "/logo.png"}
                alt="Product Image"
                width={320}
                height={300}
                loading="lazy"
            />
            <div className="p-3">
                <h2 className="mb-2 text-lg font-medium dark:text-black text-black">{product.name}</h2>
                <p className="mb-2 text-base text-black">{product.description}</p>
                <div className="flex items-center">
                    <p className="mr-2 text-lg font-semibold text-black dark:text-black">₹{product.price}</p>
                </div>
                <div className="space-x-4">
                    <Link href={`/product/${product._id}`}>
                        <button className="bg-black text-white hover:bg-black text-blackfont-bold py-2 px-4 rounded mt-[10px]">
                            View Details
                        </button>
                    </Link>
                    <button 
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="bg-black text-white hover:bg-black text-blackfont-bold py-2 px-4 rounded mt-[10px] disabled:opacity-50"
                    >
                        {isAdding ? 'Adding...' : 'Add Service'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;