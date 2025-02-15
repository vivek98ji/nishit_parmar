"use client";

import Image from "next/image";
import { FC } from "react";
import { useRouter } from 'next/navigation';

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
    const router = useRouter();

    if (!product) return null;

    const handleViewDetails = () => {
        router.push(`/components/ProductDetail/${product._id}`);
    };

    const handleAddService = () => {
        console.log('Adding service to cart:', product._id);
    };

    return (
        <div className="mx-auto mt-11 h-[400px] w-80 transform overflow-hidden rounded-[5px] 
                      bg-gray-200 shadow-lg duration-300 hover:scale-105 hover:shadow-lg">
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
            <div className="p-4">
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
                <div className="flex gap-2">
                    <button
                        onClick={handleViewDetails}
                        className="flex-1 bg-black text-white py-2 px-4 rounded-lg
                                 hover:bg-gray-800 transition-colors duration-200
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        View Details
                    </button>
                    <button
                        onClick={handleAddService}
                        className="flex-1 bg-black text-white py-2 px-4 rounded-lg
                                 hover:bg-gray-800 transition-colors duration-200
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        Add Service
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

