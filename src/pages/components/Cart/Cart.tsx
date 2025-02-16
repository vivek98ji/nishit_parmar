import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { Divider, Button } from "@mui/material";
import { useRouter } from "next/router";

interface CartItemData {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Get cart items from localStorage
        const cartData = localStorage.getItem('cart');
        const localCartItems = cartData ? JSON.parse(cartData) : [];
        
        // Fetch additional product details if needed
        const response = await fetch("/api/cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        
        setCartItems(localCartItems);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        // If API fails, still show localStorage items
        const cartData = localStorage.getItem('cart');
        const localCartItems = cartData ? JSON.parse(cartData) : [];
        setCartItems(localCartItems);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (_id: string) => {
    try {
      // Update localStorage first
      const cartData = localStorage.getItem('cart');
      const localCartItems = cartData ? JSON.parse(cartData) : [];
      const updatedCart = localCartItems.filter((item: CartItemData) => item._id !== _id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // Then try to update server
      const response = await fetch(`/api/cart?id=${_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      setCartItems(updatedCart);
      // Dispatch custom event to update cart count
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      console.error("Error removing item:", err);
      // If API fails, still update local state
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== _id));
    }
  };

  const handleCheckout = () => {
    router.push("/components/Address");
  };

  // Calculate totals
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = totalPrice * 0.1; // 10% discount
  const finalAmount = totalPrice - discount;

  if (loading) {
    return <div className="text-center py-10">Loading cart...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-10 relative">
        <div className="col-span-2">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">Your cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item._id}
                productId={item._id}
                item={item}
                onRemove={handleRemoveItem}
              />
            ))
          )}
        </div>

        <div className="px-5 sticky top-0 h-[100vh] lg:mt-0">
          <div className="p-5 border shadow-lg rounded-[20px] mt-[30px]">
            <p className="uppercase font-bold opacity-60 pb-4">Summary</p>
            <Divider />
            <div className="space-y-1 font-semibold mb-10">
              <div className="flex justify-between pt-3 text-black">
                <span>Price</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Discount</span>
                <span className="text-red-900">-₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 font-bold">
                <span>Total Amount</span>
                <span className="text-green-600">₹{finalAmount.toFixed(2)}</span>
              </div>
            </div>
            <Button
              variant="contained"
              sx={{ width: "100%", px: "2rem", py: "0.7rem", bgcolor: "#000" }}
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;