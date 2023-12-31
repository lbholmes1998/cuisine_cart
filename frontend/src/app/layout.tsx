import Navbar from '@/app/Navbar'
import './globals.css';
import { SessionProvider } from "next-auth/react"
 
export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <>
        <Navbar/>
        <main>{children}</main>
    </>
  );
}
