import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Signup from "@/components/signuppage/signup";
import header from "@/components/header/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <header/>
    <Signup/>
  );
}
