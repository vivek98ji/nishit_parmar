import React from "react";
import Header from "./signup-page/header/header"
import Footer from "./signup-page/footer/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="pt-16 pb-16">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
