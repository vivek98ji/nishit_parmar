import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Product from "./components/Product/page";
import ProductPage from "./components/Product/[productId]/page";
import Cart from "./components/Cart/Cart";
import ProductData from "./components/Product/ProductData";
import AddressCard from "./components/Address";
import Link from "next/link";
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
      {/* <Product /> */}
      <ProductPage />
      <Cart />
      {/* manisha v=choudhary?\ */}
      {/* <AddressCard /> */}
      {/* <Link href="/components/product/5" >Productdetail</Link> */}

      {/* <Link href="/ProductDetail">Go to Product Details</Link> */}

    </>
  );
}
