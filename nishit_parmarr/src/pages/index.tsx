import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Signup from "@/components/signup-page/signuppage/signup";
import Header from "@/components/signup-page/header/header";
import Footer from "@/components/signup-page/footer/footer";

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
    <Signup/>
    <Footer/>
    </>
  );
}
