import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "../globals.css";
import { getServerSession } from 'next-auth/next'
import {SessionProvider} from '../components/SessionProvider'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My shop",
  description: "Welcome to my shop",
};

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`} suppressHydrationWarning={true}
      >
        <Header />
        <main className="max-w-7xl my-8 mx-auto px-4 flex-grow w-full">
        <SessionProvider session={session}>
          {children}
          </SessionProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
