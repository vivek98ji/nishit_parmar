"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface Product {
    _id: string;
    imageUrl: string;
    name: string;
    description: string;
    price: number;
    rating: number;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const router = useRouter();
    const [isAdding, setIsAdding] = useState(false);
    const { incrementCartCount } = useCart();

    if (!product) return null;

    const handleViewDetails = () => {
        router.push(`/product/${product._id}`);
    };

    const handleAddToCart = async () => {
        setIsAdding(true);
        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: 'service',
                    available: true,
                    imageUrl: product.imageUrl || "/logo.png",
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }

            const data = await response.json();
            if (data.success) {
                incrementCartCount();
                alert('Service added to cart successfully!');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add service to cart. Please try again.');
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="mx-auto mt-11 h-[400px] w-80 transform overflow-hidden rounded-[10px] 
                      bg-gray-100 border-2 border-gray-200 shadow-lg duration-300 
                      hover:scale-105 hover:shadow-xl hover:border-gray-300">
            <div className="relative h-[200px] w-full">
                <Image
                    className="object-cover"
                    src={product.imageUrl || "/logo.png"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 320px) 100vw"
                    priority
                    quality={75}
                />
            </div>
            <div className="p-4 bg-gray-100">
                <h2 className="mb-2 text-lg font-medium text-gray-900 line-clamp-1">
                    {product.name}
                </h2>
                <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex items-center mb-4">
                    <p className="text-lg font-semibold text-gray-900">
                        ₹{product.price.toLocaleString('en-IN')}
                    </p>
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
                        className="flex-1 bg-black text-white py-2 px-4 rounded-lg
                                 hover:bg-gray-800 transition-colors duration-200
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAdding ? 'Adding...' : 'Add Service'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;