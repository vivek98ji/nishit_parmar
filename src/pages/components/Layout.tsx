import React from "react";
import Header from "./signup-page/header/header"
import Footer from "./signup-page/footer/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <main className="pt-2 pb-2 mb-0">{children}</main>
        </>
    );
};

export default Layout;
