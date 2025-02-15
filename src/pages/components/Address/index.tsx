import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Corrected import
import { Button } from "@mui/material";
// import { Button } from "@/components/ui/button";
const AddressPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        email: " "
    });
    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
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

    const handlepayment = async () => {
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


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Address submitted:", formData);
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="bg-white shadow-xl rounded-[20px] w-full max-w-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Enter Address Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="JohnDoe@gmailcom"
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            placeholder="123 Main St"
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="State"
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                            <input
                                type="text"
                                id="zip"
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                placeholder="12345"
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="9876543210"
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                required
                            />
                        </div>
                    </div>

                    <button className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded mt-[10px]">
                        Save Address
                    </button>
                    <br />
                    {/* <button className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded mt-[10px]"
                        onClick={handlepayment}
                        disabled={loading || !razorpayLoaded}
                    > */}
                    {/* {loading ? "Processing..." : "Proceed for payment"} */}
                    {/* Proceed for payment */}
                    {/* </button> */}
                    <Button
                        variant="contained"
                        sx={{ width: "100%", px: "2rem", py: "0.7rem", bgcolor: "#000" }}
                        onClick={handlepayment}
                    // disabled={loading || !razorpayLoaded}
                    >
                        {loading ? "Processing..." : "Proceed for Payment"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddressPage;