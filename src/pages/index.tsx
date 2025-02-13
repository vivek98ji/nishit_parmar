import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Product from "./components/Product/page";
import ProductPage from "./components/ProductDetail/ProductDetail";
import Cart from "./components/Cart";
import Link from "next/link";
import ProductData from '../data/ProductData'
import Header from "./components/signup-page/header/header";
import Footer from "./components/signup-page/footer/footer";
import HomeServices from "./components/homepage/homepage";
import Signup from "./components/signup-page/signuppage/signup";
import React from "react";
import About from "./components/About/about";
import Blog from "./components/blog/blog";
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
    <div className="flex flex-col min-h-screen">
     
      <main className="flex-grow">
        <HomeServices />
      </main>
      
    </div>
  );
}
