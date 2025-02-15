// "use client";

// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { FC } from 'react';
// import Link from "next/link";
// import ProductPage from '../ProductDetail/ProductDetail';
// interface Product {
//     id: number;
//     imageUrl: string;
//     Brand: string;
//     title: string;
//     discountedPrice: number;

// }

// interface ProductCardProps {
//     product: Product;
// }

// const ProductCard: FC<ProductCardProps> = ({ product }) => {
//     const router = useRouter();

//     const handleNavigation = () => {
//         // router.push(`/product/${5}`) // Update dynamic id logic as needed
//         console.log(product.id)
//     };

//     if (!product) {
//         return null; // or you can return a fallback UI
//     }

//     return (
//         // <div onClick={handleNavigation}>
//         <div>
//             <div className="mx-auto mt-11 h-[400px] w-80 transform overflow-hidden rounded-[5px] bg-white dark:bg-white shadow-lg duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
//                 <Image
//                     className="h-[200px] w-full object-cover object-left-right"
//                     src={product.imageUrl || "/logo.png"}
//                     alt="Product Image"
//                     width={320}
//                     height={300}
//                     loading="lazy"
//                 />
//                 <div className="p-3">
//                     <h2 className="mb-2 text-lg font-medium dark:text-black text-black">{product.Brand}</h2>
//                     <p className="mb-2 text-base dark:black text-white-700">Product {product.title}</p>
//                     <div className="flex items-center">
//                         <p className="mr-2 text-lg font-semibold text-black dark:text-black">₹{product.discountedPrice}</p>
//                         {/* <p className="text-base font-medium text-black line-through dark:text:black">₹{product.price}</p> */}
//                     </div>
//                     <div>
//                         {/* <Link href={`Product${5}`} key={product.id}> */}
//                         <Link href={`../ProductDetail/ProductDetail`}>
//                             <button className="bg-black text-white hover:bg-black text-blackfont-bold py-2 px-4 rounded mt-[10px]">
//                                 View Details
//                             </button>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;






import Image from "next/image";
import { FC } from "react";
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
                {/* <Link href={`/ProductDetail/${product._id}`}> */}
                <Link href={`/product/${product._id}`}>
                    <button className="bg-black text-white hover:bg-black text-blackfont-bold py-2 px-4 rounded mt-[10px]">
                        View Details
                    </button>
                </Link>
                <button className="bg-black text-white hover:bg-black text-blackfont-bold py-2 px-4 rounded mt-[10px]">
                        Add Service
                    </button>
                    </div>
            </div>
        </div>
    );
};

export default ProductCard;

