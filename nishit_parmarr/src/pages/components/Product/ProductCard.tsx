"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button, ButtonGroup } from "@material-tailwind/react";
import Link from "next/link";

interface Product {
    id: number;
    imageUrl: string;
    Brand: string;
    title: string;
    discountedPrice: number;
    price: number;
    discountPersent: number;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const router = useRouter();

    const handleNavigation = () => {
        router.push(`/product/${product.id}`); // Update dynamic id logic as needed
    };

    return (
        <div onClick={handleNavigation}>
            <div className="mx-auto mt-11 h-[400px] w-80 transform overflow-hidden rounded-[5px] bg-white dark:bg-slate-800 shadow-lg duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                <Image
                    className="h-[200px] w-full object-cover object-left-right"
                    src={product.imageUrl}
                    alt="Product Image"
                    width={320}
                    height={300}
                    loading="lazy"
                />
                <div className="p-3">
                    {/* <Link href={`/product/${product.id}`} key={product.id} /> */}

                    <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{product.Brand}</h2>
                    <p className="mb-2 text-base dark:text-gray-300 text-gray-700">Product {product.title}</p>
                    <div className="flex items-center">
                        <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">₹{product.discountedPrice}</p>
                        <p className="text-base font-medium text-gray-500 line-through dark:text-gray-300">₹{product.price}</p>

                    </div>
                    <div>
                        <Link href={`/products/${product.id}`}>
                            <button className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded mt-[10px]">
                                View Details
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
