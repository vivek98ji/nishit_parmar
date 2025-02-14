import React from "react";
import Header from "./signup-page/header/header"
import Footer from "./signup-page/footer/footer";
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const isServicePage = router.pathname === '/service-page';

    if (isServicePage) {
        return <>{children}</>;
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
