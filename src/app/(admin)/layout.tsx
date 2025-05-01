import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/layout/sidebar";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Modern admin dashboard interface",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar - Fixed width on desktop */}
        <div className="w-full md:w-64 lg:w-72 md:fixed md:left-0 md:top-0 md:h-screen">
          <Sidebar />
        </div>
        {/* Main Content - Responsive spacing */}
        <main className="flex-1 md:ml-64 lg:ml-72 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </>
  );
}
