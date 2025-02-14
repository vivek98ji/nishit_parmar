// import { useState } from "react";

// export default function Checkout() {
//     const [loading, setLoading] = useState<boolean>(false);

//     const handlePayment = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch("/api/razorpay", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ amount: 500, currency: "INR" }),
//             });

//             const order = await response.json();

//             if (!order.id) throw new Error("Order creation failed");

//             const options = {
//                 key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//                 amount: order.amount,
//                 currency: order.currency,
//                 name: "Helper Buddy",
//                 description: "Service Payment",
//                 order_id: order.id,
//                 handler: function (response: any) {
//                     alert("Payment Successful!");
//                     console.log(response);
//                 },
//                 prefill: {
//                     name: "Manisha",
//                     email: "manisha@example.com",
//                     contact: "9876543210",
//                 },
//                 theme: { color: "#3399cc" },
//             };

//             const rzp = new (window as any).Razorpay(options);
//             rzp.open();
//         } catch (error) {
//             console.error("Payment error:", error);
//             alert("Payment failed!");
//         }
//         setLoading(false);
//     };

//     return (
//         <div className="flex flex-col items-center mt-10">
//             <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//             <button
//                 className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
//                 onClick={handlePayment}
//                 disabled={loading}
//             >
//                 {loading ? "Processing..." : "Pay ₹500"}
//             </button>
//         </div>
//     );
// }






import { useEffect, useState } from "react";

export default function Checkout() {
    const [loading, setLoading] = useState<boolean>(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);

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

    const handlePayment = async () => {
        if (!razorpayLoaded) {
            alert("Razorpay SDK is still loading. Please wait.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 500, currency: "INR" }),
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

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <button
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={handlePayment}
                disabled={loading || !razorpayLoaded}
            >
                {loading ? "Processing..." : "Pay ₹500"}
            </button>
        </div>
    );
}

