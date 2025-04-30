import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from 'next-auth/next'
import {SessionProvider} from './components/SessionProvider'
export const metadata: Metadata = {
  title: "My App",
  description: "My Cool App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const session = await getServerSession()
  return (
    <html lang="en">
      <body>
      <SessionProvider session={session}>
          {children}
          </SessionProvider>
      </body>
    </html>
  );
}
