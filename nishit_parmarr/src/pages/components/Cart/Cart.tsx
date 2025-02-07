import React from 'react'
import CartItem from './CartItem'
import { Divider, Button } from '@mui/material'
import { useRouter } from "next/navigation";
// import {  } from '@headlessui/react'

function Cart() {
    // const navigate = useNavigate();
    // const handleCheckout = () => {
    //     navigate("/checkout?step=2");
    // }
    const router = useRouter();

    const handleCheckout = () => {
        router.push("/checkout");
    };

    return (

        <div>
            <div className='lg:grid grid-cols-3 lg:px-10 relative' >
                <div className='col-span-2'>
                    {[1, 1, 1].map((item) => < CartItem />)}
                </div>
                <div className='px-5 sticky top-0 h-[100vh] lg:mt-0 '>
                    <div className=' p-5 border shadow-lg rounded-md  mt-[30px]' >
                        <p className='uppercase font-bold opacity-60 pb-4'>Price details </p>
                        <Divider />
                        <div className='space-y-1 font-semibold mb-10'>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Price</span>
                                <span>4697</span>
                            </div>
                            <div className='flex justify-between pt-3 '>
                                <span>Discount</span>
                                < span className='text-red-900'>-3457</span>
                            </div>
                            {/* <div className='flex justify-between pt-3 '>
                                <span>Delivery Charges</span>
                                <span className='text-green-600'>Free</span>
                            </div> */}
                            <div className='flex justify-between pt-3 font-bold'>
                                <span>Total Amount</span>
                                < span className='text-green-600'>1278</span>
                            </div>
                        </div>
                        <Button variant="contained" className='w-full' sx={{ px: "2rem", py: "0.7rem", bgcolor: "#000" }} onClick={handleCheckout}>
                            Check Out
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Cart



// import React, { useState } from 'react';
// import CartItem from './CartItem';

// interface CartItemType {
//     id: number;
//     name: string;
//     price: number;
//     imageUrl: string;
// }

// const Cart: React.FC = () => {
//         const handleCheckout = () => {
//         router.push("/checkout");
//     };
//     const [cartItems, setCartItems] = useState<CartItemType[]>([
//         { id: 1, name: 'Washing Machine', price: 7199, imageUrl: 'https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734719510714-Washing-machine-repair-costs-explained-Featured-image-scaled1.webp' },
//         {
//             id: 2,
//             name: "Plumbing Repair Service",
//             imageUrl: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2H,S3ZXYAX2G1%2Fassets%2F1734717017311-store_01JCYZKF09EKDA2HS3ZXYAX2G1_assets_1734642265270-1701178669199-3d201d.webp",
//             price: 3214
//         }
//     ]);

//     const handleRemoveItem = (id: number) => {
//         setCartItems(cartItems.filter(item => item.id !== id));
//     };

//     return (
//         <div>
//             {cartItems.length > 0 ? (
//                 cartItems.map(item => (
//                     <CartItem
//                         key={item.id}
//                         item={item}
//                         onRemove={() => handleRemoveItem(item.id)}
//                     />
//                 ))
//             ) : (
//                 <p className="text-center mt-10">Your cart is empty.</p>
//             )}
//                                      <Divider />
// //                         <div className='space-y-1 font-semibold mb-10'>
// //                             <div className='flex justify-between pt-3 text-black'>
// //                                 <span>Price</span>
// //                                 <span>4697</span>
// //                             </div>
// //                             <div className='flex justify-between pt-3 '>
// //                                 <span>Discount</span>
// //                                 < span className='text-red-900'>-3457</span>
// //                             </div>
// //                             {/* <div className='flex justify-between pt-3 '>
// //                                 <span>Delivery Charges</span>
// //                                 <span className='text-green-600'>Free</span>
// //                             </div> */}
// //                             <div className='flex justify-between pt-3 font-bold'>
// //                                 <span>Total Amount</span>
// //                                 < span className='text-green-600'>1278</span>
// //                             </div>
// //                         </div>
// //                         <Button variant="contained" className='w-full' sx={{ px: "2rem", py: "0.7rem", bgcolor: "#000" }} onClick={handleCheckout}>
// //                             Check Out
// //                         </Button>
// //                     </div>
//         </div>
//     );
// };

// export default Cart;
