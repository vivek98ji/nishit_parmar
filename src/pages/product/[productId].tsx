// "use client"; // Not necessary with getServerSideProps

// import { useState } from "react";
// import Image from "next/image";
// import { CheckCircleIcon } from "@heroicons/react/24/outline";
// import { GetServerSideProps } from "next";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const { productId } = context.params as { productId: string };

//     try {
//         const res = await fetch(`http://localhost:3000/api/services/${productId}`);

//         if (!res.ok) {
//             console.error("Failed to fetch product:", res.status);
//             return { notFound: true };
//         }

//         const product = await res.json();
//         return { props: { product } };
//     } catch (error) {
//         console.error("Fetch error:", error);
//         return { props: { product: null } };
//     }
// };

// interface Product {
//     _id: string;
//     imageUrl: string;
//     name: string;
//     price: number;
//     discountedPrice?: number;
//     serviceDetails?: string[];
//     description: string;
//     category: string,
//     available: boolean
// }

// const ProductPage = ({ product }: { product: Product | null }) => {
//     const [quantity, setQuantity] = useState(1);
//     const [showPopup, setShowPopup] = useState(false);

//     if (!product) {
//         return (
//             <div className="text-center text-red-500 text-xl font-bold mt-10">
//                 Product not found! 🚨
//             </div>
//         );
//     }



//     // const incrementQuantity = () => setQuantity((prev) => prev + 1);
//     // const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

//     // const handleAddService = () => {
//     //     setShowPopup(true);
//     //     setTimeout(() => setShowPopup(false), 3000);
//     // };
//     // const handleAddService = async () => {
//     //     try {
//     //         const response = await fetch("http://localhost:3000/api/cart", {
//     //             method: "POST",
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //             },
//     //             body: JSON.stringify({
//     //                 productId: product._id,
//     //                 name: product.name,
//     //                 imageUrl: product.imageUrl,
//     //                 price: product.price,

//     //             }),
//     //         });
//     //         const data = await response.json();
//     //         console.log("Response:", data);
//     //         if (!response.ok) {
//     //             throw new Error("Failed to add service to cart");
//     //         }

//     //         setShowPopup(true);
//     //         setTimeout(() => setShowPopup(false), 3000);
//     //     } catch (error) {
//     //         console.error("Error adding service:", error);
//     //     }
//     // };

//     // const handleAddService = async () => {
//     //     try {

//     //         const productData = {
//     //             productId: product._id,
//     //             name: product.name,
//     //             imageUrl: product.imageUrl,
//     //             price: product.price,
//     //             description: product.description
//     //         };

//     //         console.log("Sending Data:", productData);
//     //         const response = await fetch("/api/cart", {
//     //             method: "POST",
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //             },
//     //             body: JSON.stringify({
//     //                 productId: product._id,
//     //                 name: product.name,
//     //                 imageUrl: product.imageUrl,
//     //                 price: product.price,
//     //                 // description: product.description,  // ✅ Added
//     //                 // category: product.category,        // ✅ Added
//     //                 available: product.available || true,  // ✅ Optional field
//     //             }),
//     //         });

//     //         const data = await response.json();
//     //         console.log("Response:", data);

//     //         if (!response.ok) {
//     //             throw new Error("Failed to add service to cart");
//     //         }

//     //         setShowPopup(true);
//     //         setTimeout(() => setShowPopup(false), 3000);
//     //     } catch (error) {
//     //         console.error("Error adding service:", error);
//     //     }
//     // };

//     const handleAddService = async () => {
//         try {
//             const productData = {
//                 productId: product._id,
//                 name: product.name,
//                 imageUrl: product.imageUrl,
//                 price: product.price,
//                 description: product.description, // Include description
//                 category: product.category,       // Include category
//                 available: product.available || true, // Include available (default to true if not provided)
//             };

//             console.log("Sending Data:", productData);

//             const response = await fetch("/api/cart", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(productData), // Send all required fields
//             });

//             const data = await response.json();
//             console.log("Response:", data);

//             if (!response.ok) {
//                 throw new Error("Failed to add service to cart");
//             }

//             setShowPopup(true);
//             setTimeout(() => setShowPopup(false), 3000);
//         } catch (error) {
//             console.error("Error adding service:", error);
//         }
//     };


//     return (
//         <>
//             {showPopup && (
//                 <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
//                     <div className="bg-white p-10 rounded-2xl text-center shadow-2xl w-96">
//                         <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
//                         <h2 className="text-2xl font-bold text-gray-800">Service Added!</h2>
//                         <p className="text-gray-500 mt-2">
//                             You successfully added {quantity} service(s) of {product.name} to your cart.
//                         </p>
//                         <button
//                             className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
//                             onClick={() => setShowPopup(false)}
//                         >
//                             OK
//                         </button>
//                     </div>
//                 </div>
//             )}

//             <div className="flex flex-col md:flex-row items-center justify-center p-8">
//                 {/* Image Section */}
//                 <div className="w-full md:w-1/2 flex justify-center">

//                     <div className="rounded-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">
//                         <Image
//                             src={product.imageUrl}
//                             alt={product.name}
//                             width={500}
//                             height={300}

//                             className="rounded-lg object-cover"
//                         />
//                     </div>
//                 </div>


//                 {/* Product Details Section */}
//                 <div className="w-full md:w-1/2 p-8 bg-white shadow-xl rounded-2xl">
//                     <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

//                     {/* Price & Description */}
//                     <div className="mt-4">
//                         {product.description && (
//                             <p className="text-lg text-gray-600 mb-2">{product.description}</p>
//                         )}
//                         {product.price !== undefined && (
//                             <p className="text-2xl font-bold text-gray-700">₹{product.price.toFixed(2)}</p>
//                         )}
//                     </div>

//                     {/* Add Service Button */}
//                     <button
//                         onClick={handleAddService}
//                         className="mt-6 px-6 py-3 bg-black text-white rounded-xl shadow-lg hover:bg-gray-800 transition w-full text-lg"
//                     >
//                         Add Service
//                     </button>

//                     {/* Service Details */}
//                     {product.serviceDetails && product.serviceDetails.length > 0 ? (
//                         <ul className="mt-6 text-left bg-gray-100 p-4 rounded-lg shadow-inner">
//                             <h3 className="text-lg font-bold text-gray-500">Service Details</h3>
//                             {product.serviceDetails.map((detail, index) => {
//                                 const parts = detail.split(":");
//                                 return (
//                                     <li key={index} className="text-gray-700 my-2">
//                                         <span className="font-bold text-gray-900">{parts[0]}.</span>{" "}
//                                         {parts.slice(1).join(":")}
//                                     </li>
//                                 );
//                             })}
//                         </ul>
//                     ) : (
//                         <p className="text-gray-500 mt-4">No service details available.</p>
//                     )}
//                 </div>
//             </div>

//         </>
//     )
// };

// export default ProductPage;




"use client"; // Not necessary with getServerSideProps

import { useState, useEffect } from "react";
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
    category: string,
    available: boolean,
    product: string
}



const ProductPage = ({ product }: { product: Product | null }) => {
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    interface Review {
        name: string;
        rating: number;
        comment: string;
    }

    const [reviews, setReviews] = useState<Review[]>([]);

    // useEffect(() => {
    //     const fetchReviews = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:3000/api/reviews/${product?._id}`);

    //             // const res = await fetch(`/api/reviews/${product._id}`);
    //             if (!response.ok) throw new Error("Failed to fetch reviews");
    //             const data = await response.json();
    //             setReviews(data);
    //         } catch (error) {
    //             console.error("Error fetching reviews:", error);
    //         }
    //     };

    //     fetchReviews();
    // }, [product]);


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/reviews/${product?._id}`);
                console.log(`Fetching reviews for productId: ${product?._id}`); // Log the productId
                if (!response.ok) throw new Error("Failed to fetch reviews");
                const data = await response.json();
                console.log(`Reviews fetched: ${data.length}`); // Log the number of reviews fetched
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [product]);

    if (!product) {
        return (
            <div className="text-center text-red-500 text-xl font-bold mt-10">
                Product not found! 🚨
            </div>
        );
    }


    // const handleAddService = async () => {
    //     try {

    //         const productData = {
    //             productId: product._id,
    //             name: product.name,
    //             imageUrl: product.imageUrl,
    //             price: product.price,
    //             description: product.description
    //         };

    //         console.log("Sending Data:", productData);
    //         const response = await fetch("/api/cart", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 productId: product._id,
    //                 name: product.name,
    //                 imageUrl: product.imageUrl,
    //                 price: product.price,
    //                 // description: product.description,  // ✅ Added
    //                 // category: product.category,        // ✅ Added
    //                 available: product.available || true,  // ✅ Optional field
    //             }),
    //         });

    //         const data = await response.json();
    //         console.log("Response:", data);

    //         if (!response.ok) {
    //             throw new Error("Failed to add service to cart");
    //         }

    //         setShowPopup(true);
    //         setTimeout(() => setShowPopup(false), 3000);
    //     } catch (error) {
    //         console.error("Error adding service:", error);
    //     }
    // };

    const handleAddService = async () => {
        try {
            const productData = {
                productId: product._id,
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.price,
                description: product.description, // Include description
                category: product.category,       // Include category
                available: product.available || true, // Include available (default to true if not provided)
            };

            console.log("Sending Data:", productData);

            const response = await fetch("/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData), // Send all required fields
            });

            const data = await response.json();
            console.log("Response:", data);

            if (!response.ok) {
                throw new Error("Failed to add service to cart");
            }

            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } catch (error) {
            console.error("Error adding service:", error);
        }
    };

    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center ">
                    <div className="bg-white p-10 rounded-2xl text-center shadow-2xl w-96">
                        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800">Service Added!</h2>
                        <p className="text-gray-500 mt-2">
                            You successfully added {quantity} service(s) of {product.name} to your cart.
                        </p>
                        <button
                            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            onClick={() => setShowPopup(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-center p-8">
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center">

                    <div className="rounded-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={500}
                            height={300}

                            className="rounded-lg object-cover"
                        />
                    </div>
                </div>


                {/* Product Details Section */}
                <div className="w-full md:w-1/2 p-8 bg-white shadow-xl rounded-2xl">
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                    {/* Price & Description */}
                    <div className="mt-4">
                        {product.description && (
                            <p className="text-lg text-gray-600 mb-2">{product.description}</p>
                        )}
                        {product.price !== undefined && (
                            <p className="text-2xl font-bold text-gray-700">₹{product.price.toFixed(2)}</p>
                        )}
                    </div>

                    {/* Add Service Button */}
                    <button
                        onClick={handleAddService}
                        className="mt-6 px-6 py-3 bg-black text-white rounded-xl shadow-lg hover:bg-gray-800 transition w-full text-lg"
                    >
                        Add Service
                    </button>

                    {/* Service Details */}
                    {product.serviceDetails && product.serviceDetails.length > 0 ? (
                        <ul className="mt-6 text-left bg-gray-100 p-4 rounded-lg shadow-inner">
                            <h3 className="text-lg font-bold text-gray-500">Service Details</h3>
                            {product.serviceDetails.map((detail, index) => {
                                const parts = detail.split(":");
                                return (
                                    <li key={index} className="text-gray-700 my-2">
                                        <span className="font-bold text-gray-900">{parts[0]}.</span>{" "}
                                        {parts.slice(1).join(":")}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="text-gray-500 mt-4">No service details available.</p>
                    )}
                </div>
            </div>







            <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
                <h1 className="text-2xl font-bold text-gray-900 text-center">Customer Reviews</h1>


                <div className="flex gap-6 mt-6 overflow-x-auto p-4">
                    {reviews.map((review, index) => (
                        <div key={index} className="min-w-[300px] border bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                            {/* <img src={review.image} alt={review.name} className="w-16 h-16 mx-auto rounded-full mb-3" /> */}
                            <p className="font-bold text-white text-lg">{review.name}</p>
                            <p className="text-yellow-500 text-lg">{"⭐".repeat(review.rating)}</p>
                            <p className="text-white mt-2">{review.comment}</p>
                        </div>
                    ))}
                </div>

                <h4 className="mt-6 font-semibold text-gray-700 text-center">Write a Review</h4>
                <div className="max-w-lg mx-auto mt-4">
                    <input
                        type="number"
                        min="1"
                        max="5"
                        className="block w-full p-2 border rounded-lg shadow-sm"
                        placeholder="Rating (1-5)"
                    />
                    <textarea
                        placeholder="Write your review here..."
                        className="block w-full p-2 border mt-2 rounded-lg shadow-sm"
                    />
                    <button className="mt-3 px-6 py-3 bg-black text-white rounded-xl shadow-lg hover:bg-gray-800 transition w-full text-lg">
                        Submit Review
                    </button>
                </div>
            </div>


        </>
    )
};

export default ProductPage;