import "../globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";

import { SessionProvider } from "@/components/SessionProvider";


export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication layout for the application",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <>
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
}
