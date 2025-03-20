import React from "react";
import type { Metadata } from "next";

//External Libraries
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//Styles
import localFont from "next/font/local";
import "./globals.css";
import { Rubik, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react"

//Components
import { ReactQueryClientProvider } from "@/features/react-query/components/ReactQueryClientProvider";

// import "@/styles/globals.scss";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Load all weights
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className}`}
        >
          {children}
          <ToastContainer />
        </body>
        <SpeedInsights/>
        <Analytics/>
      </html>
    </ReactQueryClientProvider>
  );
}
