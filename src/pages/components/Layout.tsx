import React from "react";
import Header from "./signup-page/header/header"
import Footer from "./signup-page/footer/footer";
import { useRouter } from 'next/router';
import AdminLayout from "./admin/AdminLayout";
import { CartProvider } from '@/context/CartContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const isServicePage = router.pathname === '/service-page';
    const isAdminPage = router.pathname.startsWith('/admin');

    if (isServicePage) {
        return <>{children}</>;
    }

    if (isAdminPage) {
        return <AdminLayout>{children}</AdminLayout>;
    }

    return (
        <>
            <Header />
            <main className="pt-0 pb-0 mb-0">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
