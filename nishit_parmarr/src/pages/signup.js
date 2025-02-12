import { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");

    const sendOtp = async () => {
        setMessage("");
        const res = await fetch("/api/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (data.success) setOtpSent(true);
        setMessage(data.message);
    };

    const verifyOtp = async () => {
        setMessage("");
        const res = await fetch("/api/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp })
        });
        const data = await res.json();
        setMessage(data.message);
    };

    return (
        <div>
            <h2>Sign In</h2>
            {!otpSent ? (
                <>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                    <button onClick={sendOtp}>Send OTP</button>
                </>
            ) : (
                <>
                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
                    <button onClick={verifyOtp}>Verify OTP</button>
                </>
            )}
            <p>{message}</p>
        </div>
    );
}

