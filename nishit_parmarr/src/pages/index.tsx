import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Product from "./components/Product/page";
import ProductPage from "./components/Product/[productId]/page";
import Cart from "./components/Cart/Cart";
import Link from "next/link";
import { Header } from "./components/service-provider/header/header";
import ProductData from "./components/Product/ProductData";
// import Signup from "@/components/signup-page/signuppage/signup";
// import Header from "@/components/signup-page/header/header";
// import Footer from "@/components/signup-page/footer/footer";
// import Header from "@/components/header/header";
// import HomePage from "@/components/homepage/homepage";
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
    
      {/* <ProductData/> */}
      <Product/>
      
      <ProductPage />
      <Cart />
      {/* { <AddressCard /> } */}
      {/* { <Link href="/components/product/5" >Productdetail</Link> } */}

      {/* { <Link href="/ProductDetail">Go to Product Details</Link> } */}

    </>
  );
}
