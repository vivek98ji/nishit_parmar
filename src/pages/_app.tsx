import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./components/Layout";
import LoadingBar from "./components/LoadingBar";
import React from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <LoadingBar />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}