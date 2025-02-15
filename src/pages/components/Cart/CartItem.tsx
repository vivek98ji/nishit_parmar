import React from "react";
import Image from "next/image";

interface CartItemProps {
    productId: string;
    item: {
        _id: string;
        name: string;
        description: string;
        price: number;
        imageUrl: string
    };
    onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ productId, item, onRemove }) => {
    const handleRemove = (id: string) => {
        onRemove(id);
        // Update cart in localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedCart = cart.filter((item: any) => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        // Dispatch custom event to update cart count
        window.dispatchEvent(new Event('cartUpdated'));
    };

    return (
        <div className="p-3 shadow-lg border rounded-[20px] m-[30px]">
            <div className="flex items-center">
                <div className="w-[5rem] h-[7rem] lg:w-[15rem] lg:h-[15rem]">
                    <Image
                        src={item.imageUrl}// Replace with your actual image URL or placeholder
                        alt={item.name}
                        width={574}
                        height={322}
                        priority
                        className="object-cover"
                    />
                </div>

                <div className="ml-10 space-y-1">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <div className="flex space-x-5 items-center text-gray-900 pt-6">
                        <p className="font-semibold">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="lg:flex items-center lg:space-x-10 pt-4">
                        <div>
                            <button
                                onClick={() => handleRemove(productId)}
                                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;