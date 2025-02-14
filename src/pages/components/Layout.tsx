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
            <main className="pt-2 pb-2 mb-0">{children}</main>
        </>
    );
};

export default Layout;
