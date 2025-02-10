"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
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
        // router.push(`/product/${5}`) // Update dynamic id logic as needed
        console.log(product.id)
    };

    return (
        <div onClick={handleNavigation}>
            <div className="mx-auto mt-11 h-[400px] w-80 transform overflow-hidden rounded-[5px] bg-white dark:bg-white shadow-lg duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                <Image
                    className="h-[200px] w-full object-cover object-left-right"
                    src={product.imageUrl}
                    alt="Product Image"
                    width={320}
                    height={300}
                    loading="lazy"
                />
                <div className="p-3">


                    <h2 className="mb-2 text-lg font-medium dark:text-black text-black">{product.Brand}</h2>
                    <p className="mb-2 text-base dark:black text-white-700">Product {product.title}</p>
                    <div className="flex items-center">
                        <p className="mr-2 text-lg font-semibold text-black dark:text-black">₹{product.discountedPrice}</p>
                        <p className="text-base font-medium text-black line-through dark:text-black">₹{product.price}</p>

                    </div>
                    <div>
                        {/* <Link href={`Product${5}`} key={product.id}> */}
                        {/* <Link href={`/product/${5}`}> */}
                        <button className="bg-black hover:bg-black text-blackfont-bold py-2 px-4 rounded mt-[10px]">
                            View Details
                        </button>
                        {/* </Link> */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
