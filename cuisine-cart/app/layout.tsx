import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "./Navbar";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
    title: 'Cuisine Cart',
    description: 'Find tasty recipes!'
}


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <main className="max-width-6xl mx-auto px-6">
            {children}
        </main>
      </body>
    </html>
  );
}
