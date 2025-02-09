import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Product from "./components/Product/page";
import ProductPage from "./components/Product/[productId]/page";
import Cart from "./components/Cart/Cart";
import ProductData from "./components/Product/ProductData";
import AddressCard from "./components/Address";
import Link from "next/link";
import ManageServices from "./admin/manage-services/page";
import ReferralWallet from "./admin/referall-wallet/page";
import AdminServiceRequests from "./admin/service-partners/page";
// import AdminBlogManagement from "./admin/blogs/page";
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

      <AdminServiceRequests />


    </>
  );
}
