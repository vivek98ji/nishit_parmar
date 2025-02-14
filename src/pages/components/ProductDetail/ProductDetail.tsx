"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface Product {
    id: number;
    imageUrl: string;
    title: string;
    originalPrice: number;
    discountedPrice: number;
    serviceDetails: string[];
}

const productData: Product = {
    id: 1,
    imageUrl: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734719510714-Washing-machine-repair-costs-explained-Featured-image-scaled1.webp",
    title: "Exhaust fan cleaning",
    originalPrice: 180,
    discountedPrice: 89,
    serviceDetails: [
        "Dry dusting: Removal of dust using dry cloth",
        "Stain removal: Spraying chemical and scrubbing the surfaces to remove stains",
        "Wet wiping: Wiping the surface using a damp microfiber cloth",
    ],
};

const ProductPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

    const handleAddService = () => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Auto-close the popup after 3 seconds
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
                            You successfully added {quantity} service(s) of {productData.title} to your cart.
                        </p>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-center p-8">
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <Image
                        src={productData.imageUrl}
                        alt={productData.title}
                        width={500}
                        height={300}
                        className="rounded-lg object-cover"
                    />
                </div>

                {/* Product Details Section */}
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-4xl font-bold">{productData.title}</h1>
                    <div className="flex items-center my-4">
                        {/* <p className="text-2xl font-semibold text-gray-500 line-through mr-4">
                            ₹{productData.originalPrice.toFixed(2)}
                        </p> */}
                        <p className="text-2xl font-bold text-gray-600">
                            ₹{productData.discountedPrice.toFixed(2)}
                        </p>
                    </div>

                    {/* Quantity Counter */}
                    {/* <div className="flex items-center mb-4">
                        <button
                            onClick={decrementQuantity}
                            className="px-4 py-2 bg-gray-300 text-black rounded-l-lg"
                        >
                            -
                        </button> */}
                    {/* <span className="px-6 py-2 text-lg">{quantity}</span>
                        <button
                            onClick={incrementQuantity}
                            className="px-4 py-2 bg-gray-300 text-black rounded-r-lg"
                        >
                            +
                        </button> */}
                    {/* </div> */}

                    {/* Add Service Button */}
                    <button
                        onClick={handleAddService}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 w-full text-lg mb-6"
                    >
                        Add Service
                    </button>

                    {/* Service Details */}
                    <ul className="text-left">
                        {productData.serviceDetails.map((detail, index) => (
                            <li key={index} className="text-gray-600 my-2">
                                <span className="font-bold">{detail.split(":")[0]}: </span>
                                {detail.split(":")[1]}
                            </li>
                        ))}
                    </ul>
                </div>
            </div >
        </>
    );
};

export default ProductPage;
