import React from "react";
import Image from "next/image";

interface CartItemProps {
  productId: string;
  item: {
    _id: string;
    name: string;
    description: string;
    price: number;
  };
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ productId, item, onRemove }) => {
  return (
    <div className="p-3 shadow-lg border rounded-[20px] m-[30px]">
      <div className="flex items-center">
        <div className="w-[5rem] h-[7rem] lg:w-[15rem] lg:h-[15rem]">
          <Image
            src="/api/placeholder/574/322" // Replace with your actual image URL or placeholder
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
                onClick={() => onRemove(productId)}
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