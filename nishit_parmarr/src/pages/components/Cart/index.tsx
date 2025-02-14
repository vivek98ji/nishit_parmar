import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { Divider, Button } from "@mui/material";
import { useRouter } from "next/router"; // Corrected import

const Cart: React.FC = () => {
  interface CartItemData {
    id: number;
    name: string;
    price: number;
  }

  const [cartItems, setCartItems] = useState<CartItemData[]>([]);



  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);



  // Handle Checkout and Razorpay Payment
  const handleCheckout = async () => {
    if (!razorpayLoaded) {
      alert("Razorpay SDK is still loading. Please wait.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 20, currency: "INR" }),
      });

      const order = await response.json();
      if (!order.id) throw new Error("Order creation failed");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Helper Buddy",
        description: "Service Payment",
        order_id: order.id,
        handler: function (response: any) {
          alert("Payment Successful!");
          console.log(response);
          router.push("/success"); // Redirect on success
        },
        prefill: {
          name: "Manisha",
          email: "manisha@example.com",
          contact: "9876543210",
        },
        theme: { color: "#3399cc" },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed!");
    }
    setLoading(false);
  };




  const handleRemoveItem = (itemId: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
  };

  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-10 relative">
        <div className="col-span-2">
          {[1, 2, 3].map((item, index) => (
            <CartItem key={index} productId={item} onRemove={handleRemoveItem} />
          ))}
        </div>

        <div className="px-5 sticky top-0 h-[100vh] lg:mt-0">
          <div className="p-5 border shadow-lg rounded-[20px] mt-[30px]">
            <p className="uppercase font-bold opacity-60 pb-4">Summary</p>
            <Divider />
            <div className="space-y-1 font-semibold mb-10">
              <div className="flex justify-between pt-3 text-black">
                <span>Price</span>
                <span>4697</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Discount</span>
                <span className="text-red-900">-3457</span>
              </div>

              <div className="flex justify-between pt-3 font-bold">
                <span>Total Amount</span>
                <span className="text-green-600">1</span>
              </div>
            </div>
            {/* <Button
              variant="contained"
              sx={{ width: "100%", px: "2rem", py: "0.7rem", bgcolor: "#000" }}
            >
              Check Out
            </Button> */}

            <Button
              variant="contained"
              sx={{ width: "100%", px: "2rem", py: "0.7rem", bgcolor: "#000" }}
              onClick={handleCheckout}
              disabled={loading || !razorpayLoaded}
            >
              {loading ? "Processing..." : "Check Out"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
