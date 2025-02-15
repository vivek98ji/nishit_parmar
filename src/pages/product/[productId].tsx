"use client"; // Not necessary with getServerSideProps

import { useState } from "react";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { productId } = context.params as { productId: string };

    try {
        const res = await fetch(`http://localhost:3000/api/services/${productId}`);

        if (!res.ok) {
            console.error("Failed to fetch product:", res.status);
            return { notFound: true };
        }

        const product = await res.json();
        return { props: { product } };
    } catch (error) {
        console.error("Fetch error:", error);
        return { props: { product: null } };
    }
};

interface Product {
    _id: string;
    imageUrl: string;
    name: string;
    price: number;
    discountedPrice?: number;
    serviceDetails?: string[];
    description: string;
}

const ProductPage = ({ product }: { product: Product | null }) => {
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);

    if (!product) {
        return (
            <div className="text-center text-red-500 text-xl font-bold mt-10">
                Product not found! 🚨
            </div>
        );
    }

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

    const handleAddService = () => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    return (
        <>
            {/* Full-page Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                    <div className="bg-white p-10 rounded-xl text-center shadow-xl">
                        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800">Service Added!</h2>
                        <p className="text-gray-500 mt-2">
                            You successfully added {quantity} service(s) of {product.name} to your cart.
                        </p>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-center p-8">
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={500}
                        height={300}
                        className="rounded-lg object-cover"
                    />
                </div>

                {/* Product Details Section */}
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-4xl font-bold">{product.name}</h1>
                    <br />
                    {/* Price Display */}
                    <div className="flex items-center my-4">
                        {product.description !== undefined && (
                            <p className="text-2xl font-semibold text-gray-500  mr-4">
                                {product.description}
                            </p>
                        )}
                    </div>
                    <div className="my-4">
                        {product.price !== undefined && (
                            <p className="text-2xl font-bold text-gray-600">
                                ₹{product.price.toFixed(2)}
                            </p>
                        )}
                    </div>


                    {/* Add Service Button */}
                    <button
                        onClick={handleAddService}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 w-full text-lg mb-6"
                    >
                        Add Service
                    </button>

                    {/* Service Details */}
                    {product.serviceDetails && product.serviceDetails.length > 0 ? (
                        <ul className="text-left">
                            {product.serviceDetails.map((detail, index) => {
                                const parts = detail.split(":");
                                return (
                                    <li key={index} className="text-gray-600 my-2">
                                        <span className="font-bold">{parts[0]}:</span>{" "}
                                        {parts.slice(1).join(":")}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No service details available.</p>
                    )}
                </div>
            </div >
        </>
    );
};

export default ProductPage;