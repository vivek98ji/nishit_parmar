import React from "react";
import Header from "./signup-page/header/header"
import Footer from "./signup-page/footer/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>    
            <main>{children}</main>
        </>
    );
};

export default Layout;
