"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import * as jose from 'jose'
import Cookies from 'js-cookie';
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let id: any;

  const token = Cookies.get('token');
  // let clientId : BigInteger;

  if (token) {
    const decodedToken = jose.decodeJwt(token)
    id = decodedToken.userId
  }

  return (
    <html suppressHydrationWarning lang="fr">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header />
          <ToastContainer />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
