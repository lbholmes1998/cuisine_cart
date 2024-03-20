import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
            <div className="w-full h-20 bg-slate-200 sticky top-0 z-10">
                <div className="container flex items-center px-4 h-full m-auto">
                    <div className="flex justify-between items-center m-auto h-full">
                        <ul className="hidden md:flex gap-x-6 text-black">
                            <li>
                                <Link href="/">
                                    <p>Home</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/recipe/recipeSearch">
                                    <p>Search Recipes</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about">
                                    <p>about</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
