import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Product from "./components/Product/page";
import ProductPage from "./components/Product/[productId]/page";
import Cart from "./components/Cart/Cart";
import Link from "next/link";
import ProductData from "./components/Product/ProductData";
import Header from "./components/signup-page/header/header";
import Footer from "./components/signup-page/footer/footer";
import HomeServices from "./components/homepage/homepage";
import Signup from "./components/signup-page/signuppage/signup";
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
      {/* <ProductData/> */}
      <Product/>
      <ProductPage />
      <Cart />
      <Signup/>
      {/* { <Link href="/components/product/5" >Productdetail</Link> } */}

      {/* { <Link href="/ProductDetail">Go to Product Details</Link> } */}
      <Footer/>
    </>
  );
}
