import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./components/Layout";
import LoadingBar from "./components/LoadingBar";
import React from "react";
import { DefaultSeo } from 'next-seo';
import { defaultSEO } from '../config/seo.config';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <LoadingBar />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}