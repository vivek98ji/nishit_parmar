import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CartItem = () => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="p-3 shadow-lg border rounded-md m-[30px]">
            <div className="flex items-center">
                <div className="w-[5rem] h-[5rem] lg:w-[10rem] lg:h-[10rem]">
                    <img
                        className="w-full h-full object-cover object-top"
                        src="https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734719510714-Washing-machine-repair-costs-explained-Featured-image-scaled1.webp"
                        alt="Product Image"
                    />
                </div>

                <div className="ml-5 space-y-1">
                    <div className="flex space-x-5 items-center text-gray-900 pt-6">
                        <p className="font-semibold">₹7199</p>
                        <p className="opacity-50 line-through">₹7211</p>
                    </div>

                    <div className="lg:flex items-center lg:space-x-10 pt-4">
                        <div className="flex items-center space-x-2">
                            <IconButton onClick={handleDecrease}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <span className="py-1 px-7 border rounded-sm">{quantity}</span>
                            <IconButton onClick={handleIncrease}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </div>

                        <div>
                            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none">
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



