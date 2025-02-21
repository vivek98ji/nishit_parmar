// @ts-ignore
import Image from "next/image";
import Product from "./components/Product/page";
import Cart from "./components/Cart/Cart";
import ProductData from '../data/ProductData'
import Header from "./components/signup-page/header/header";
import Footer from "./components/signup-page/footer/footer";
import HomeServices from "./components/homepage/homepage";
import Signup from "./components/signup-page/signuppage/signup";
import React from "react";
import About from "./components/About/about";
import Blog from "./components/blog/blog";
import { NextSeo } from 'next-seo';

export default function Home() {
  return (
    <>
      <NextSeo
        title="Home Services & Repairs | Your Brand Name"
        description="Find reliable home services and repairs. Book trusted professionals for cleaning, maintenance, repairs, and more."
        canonical="https://your-domain.com/"
        openGraph={{
          url: 'https://your-domain.com/',
          title: 'Home Services & Repairs | Your Brand Name',
          description: 'Find reliable home services and repairs. Book trusted professionals for cleaning, maintenance, repairs, and more.',
          images: [
            {
              url: 'https://your-domain.com/home-og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'Home Services',
            },
          ],
        }}
      />
      <div className="flex flex-col min-h-screen">

        <main className="flex-grow">

           <HomeServices />
        </main>

      </div>
    </>
  );
}
