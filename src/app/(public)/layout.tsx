import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "../globals.css";
import { getServerSession } from "next-auth/next";
import { SessionProvider } from "@/components/SessionProvider";
import { getConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My shop",
  description: "Welcome to my shop",
};

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  const siteName = await getConfig("siteName");

  metadata.title = siteName || metadata.title;

  return (
    <>
      <Header siteName={siteName || null} />
      <main className="max-w-7xl my-8 mx-auto px-4 flex-grow w-full">
        <SessionProvider session={session}>{children}</SessionProvider>
      </main>
      <Footer siteName={siteName || null} />
    </>
  );
}
