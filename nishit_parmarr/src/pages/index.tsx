import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Signup from "./signup";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import HomePage from "@/components/homepage/homepage";

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
    <>
    
    <Header/>
    <HomePage/>
   <Footer/>
    </>
  );
}
